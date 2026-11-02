import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { createApi } from "./api.js";
import { openStore } from "./store.js";
import { QUESTIONNAIRE_VERSION, questionReferences } from "../src/data/dgtiResearch.js";
import { roleProfiles, questionBank } from "../src/data/dgti.js";
import { buildTargetAnswers, pickType, scoreAnswers } from "../src/lib/dgtiScoring.js";
import { getDemoStatistics, summarizeResults } from "../src/lib/dgtiStatistics.js";

test("anonymous results and feedback persist, deduplicate, and withdraw without exposing records", async () => {
  const dir = await mkdtemp(join(tmpdir(), "dgti-api-"));
  const filename = join(dir, "test.sqlite");
  const adminKey = "test-admin-key-".repeat(4);
  const api = createApi({ filename, adminKey });
  const server = createServer(api.handler);
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  const base = `http://127.0.0.1:${server.address().port}/dgti/api/`;
  const token = "a".repeat(64);
  const answers = Object.values(buildTargetAnswers(roleProfiles[0]));
  const payload = { token, version: QUESTIONNAIRE_VERSION, consent: true, answers, role: "FISH" };
  async function request(path, data, method = "POST", headers = {}) {
    const result = await fetch(base + path, { method, headers: { "Content-Type": "application/json", ...headers }, ...(method !== "GET" ? { body: JSON.stringify(data) } : {}) });
    return { status: result.status, body: await result.json() };
  }
  try {
    assert.equal((await request("stats", null, "GET")).body.count, 0);
    assert.equal((await request("results", { ...payload, consent: false })).status, 400);
    assert.equal((await request("results", { ...payload, version: "old" })).status, 409);
    assert.equal((await request("results", { ...payload, answers: answers.slice(1) })).status, 400);
    assert.equal((await request("results", { ...payload, answers: answers.map(() => 99) })).status, 400);
    assert.equal((await request("results", payload, "POST", { Origin: "https://not-this-site.example" })).status, 403);
    assert.equal((await request("results", payload, "POST", { "Content-Type": "text/plain" })).status, 415);
    assert.equal((await request("results", payload)).status, 200);
    assert.equal((await request("results", payload)).status, 200);
    let stats = (await request("stats", null, "GET")).body;
    assert.equal(stats.count, 1);
    assert.equal(stats.attempts, 1);
    assert.equal(stats.roles[0].code, roleProfiles[0].code, "server computes role instead of trusting submitted role");
    assert.equal(JSON.stringify(stats).includes(token), false);
    assert.equal("results" in stats, false);
    assert.equal((await request("results", { ...payload, answers: Object.values(buildTargetAnswers(roleProfiles[2])) })).status, 200);
    stats = (await request("stats", null, "GET")).body;
    assert.equal(stats.count, 1); assert.equal(stats.attempts, 2);
    assert.equal((await request("results", { ...payload, token: "b".repeat(64) })).status, 200);
    assert.equal((await request("stats", null, "GET")).body.count, 2);
    const feedback = { token, version: QUESTIONNAIRE_VERSION, consent: true, id: randomUUID(), category: "question", rating: 3, question: 2, message: "这题的选择可以更具体。" };
    assert.equal((await request("feedback", { ...feedback, message: " " })).status, 400);
    assert.equal((await request("feedback", { ...feedback, question: 26 })).status, 400);
    assert.equal((await request("feedback", feedback)).status, 200);
    assert.equal((await request("feedback", feedback)).status, 200);
    stats = (await request("stats", null, "GET")).body;
    assert.equal(stats.feedback.count, 1);
    assert.equal(stats.feedback.averageRating, 3);
    assert.equal(JSON.stringify(stats).includes(feedback.message), false);
    assert.equal((await request("admin/feedback", null, "GET")).status, 401);
    assert.equal((await request("admin/feedback", null, "GET", { Authorization: "Bearer wrong" })).status, 401);
    const auth = { Authorization: `Bearer ${adminKey}` };
    let inbox = await request("admin/feedback?category=question&status=new&page=1", null, "GET", auth);
    assert.equal(inbox.body.total, 1);
    assert.equal(inbox.body.items[0].message, feedback.message);
    assert.equal("participant" in inbox.body.items[0], false);
    assert.equal((await request("admin/feedback", { id: feedback.id, status: "read" }, "POST", auth)).status, 200);
    inbox = await request("admin/feedback?status=new", null, "GET", auth);
    assert.equal(inbox.body.total, 0);
    assert.equal(inbox.body.unread, 0);
    assert.equal((await request("admin/feedback?page=-1", null, "GET", auth)).status, 400);
    assert.equal((await request("admin/feedback", { id: feedback.id, status: "bad" }, "POST", auth)).status, 400);
    for (let i = 0; i < 4; i++) assert.equal((await request("feedback", { ...feedback, id: randomUUID() })).status, 200);
    assert.equal((await request("feedback", { ...feedback, id: randomUUID() })).status, 429);
    const reopened = openStore(filename);
    assert.equal(reopened.statistics().count, 2);
    assert.equal(reopened.exportFeedback().length, 5);
    reopened.close();
    assert.equal((await request("me", { token }, "DELETE")).status, 200);
    stats = (await request("stats", null, "GET")).body;
    assert.equal(stats.count, 1); assert.equal(stats.feedback.count, 0);
    assert.equal((await request("feedback/export", null, "GET")).status, 405);
    assert.equal((await request("feedback", { ...feedback, message: "x".repeat(9000) })).status, 413);
  } finally {
    await new Promise((done) => server.close(done)); api.close(); await rm(dir, { recursive: true, force: true });
  }
});

test("rarity ranks only observed roles, with shared ranks for ties", () => {
  const codes = roleProfiles.slice(0, 3).map((p) => p.code);
  const rows = [codes[0], codes[1], codes[2], codes[2]].map((role) => ({ role, axes: {} }));
  const stats = summarizeResults(rows);
  assert.equal(stats.observedTypes, 3);
  assert.equal(stats.roles.find((r) => r.code === codes[0]).rarityRank, 1);
  assert.equal(stats.roles.find((r) => r.code === codes[0]).tied, true);
  assert.equal(stats.roles.find((r) => r.code === codes[2]).rarityRank, 3);
  assert.equal(stats.roles.find((r) => r.count === 0).rarityRank, null);
  assert.equal(summarizeResults([]).observedTypes, 0);
});

test("100 demonstration cases stay separate and every question has a reference mapping", () => {
  const demo = getDemoStatistics();
  assert.equal(demo.kind, "demo"); assert.equal(demo.count, 100);
  assert.equal(demo.roles.reduce((n, r) => n + r.count, 0), 100);
  assert.equal(demo.feedback.count, 0);
  assert.equal(questionReferences.length, questionBank.length);
  assert.equal(demo.roles.filter((r) => r.count > 0).length, 20);
});

test("options lead with one complete action and every role remains reachable after the genie revision", () => {
  for (const question of questionBank) {
    assert.equal(new Set(question.answers.map((answer) => answer.text)).size, 5);
    for (const answer of question.answers) {
      assert.match(answer.text, /^【[^【】]+[。？][”"]?】[^【】]+$/);
      assert.equal(answer.text.endsWith(answer.note), true);
    }
  }
  for (const profile of roleProfiles) {
    assert.equal(pickType(scoreAnswers(buildTargetAnswers(profile))).profile.code, profile.code);
  }
  const genie = roleProfiles.find((profile) => profile.code === "WISHPOOL");
  assert.equal(genie.name, "职场神灯");
  assert.equal(genie.group, "support");
  for (const [i, j] of [[6, 2], [14, 4], [15, 4]]) assert.equal(questionBank[i].answers[j].roles[0], genie.code);
});

test("request rate limit returns an explicit retryable error", async () => {
  const api = createApi({ filename: ":memory:", rateLimit: 1 });
  const server = createServer(api.handler);
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  const url = `http://127.0.0.1:${server.address().port}/api/stats`;
  try { assert.equal((await fetch(url)).status, 200); assert.equal((await fetch(url)).status, 429); }
  finally { await new Promise((done) => server.close(done)); api.close(); }
});
