import { createHash, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { questionBank } from "../src/data/dgti.js";
import { QUESTIONNAIRE_VERSION, feedbackCategories } from "../src/data/dgtiResearch.js";
import { pickType, scoreAnswers } from "../src/lib/dgtiScoring.js";
import { openStore } from "./store.js";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const categories = new Set(feedbackCategories.map(([key]) => key));
export function createApi({ filename = process.env.DGTI_DB_PATH || resolve("var/dgti.sqlite"), allowedOrigin = process.env.DGTI_PUBLIC_ORIGIN, rateLimit = 120, adminKey = process.env.DGTI_ADMIN_KEY } = {}) {
  const store = openStore(filename);
  const clients = new Map();
  const reply = (res, status, body) => {
    res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    res.end(JSON.stringify(body));
  };
  async function handler(req, res, next) {
    const url = new URL(req.url || "/", "http://localhost");
    const path = url.pathname;
    const endpoint = path.replace(/^\/(?:dgti\/)?api\//, "");
    if (endpoint === path) { if (next) next(); else reply(res, 404, { error: "接口不存在" }); return; }
    try {
      const now = Date.now();
      for (const [key, entry] of clients) if (entry.until <= now) clients.delete(key);
      // Trust proxy IP headers only when explicitly configured for a loopback reverse proxy.
      const ip = process.env.DGTI_TRUST_PROXY === "1" ? req.headers["x-real-ip"] || req.socket.remoteAddress : req.socket.remoteAddress;
      const client = clients.get(ip) || { count: 0, until: now + 60000 };
      client.count += 1;
      clients.set(ip, client);
      if (client.count > rateLimit) { reply(res, 429, { error: "操作太频繁，请稍后再试" }); return; }
      const isAdmin = endpoint === "admin/feedback";
      if (isAdmin) {
        let key = adminKey;
        if (!key && filename !== ":memory:") {
          try { key = readFileSync(join(dirname(filename), "admin-key.txt"), "utf8").trim(); } catch { /* No admin access until configured. */ }
        }
        if (!key || key.length < 32) { reply(res, 503, { error: "尚未配置管理密钥，请在服务器运行 npm run setup:admin" }); return; }
        const supplied = (req.headers.authorization || "").replace(/^Bearer /, "");
        if (!timingSafeEqual(Buffer.from(hash(supplied), "hex"), Buffer.from(hash(key), "hex"))) { reply(res, 401, { error: "管理密钥不正确" }); return; }
        if (req.method === "GET") {
          const category = url.searchParams.get("category") || "";
          const status = url.searchParams.get("status") || "";
          const page = Number(url.searchParams.get("page") || 1);
          if ((category && !categories.has(category)) || (status && !["new", "read"].includes(status)) || !Number.isInteger(page) || page < 1 || page > 100000) { reply(res, 400, { error: "筛选条件不正确" }); return; }
          reply(res, 200, store.listFeedback({ category, status, page })); return;
        }
      }
      if (req.method === "GET" && endpoint === "stats") { reply(res, 200, store.statistics()); return; }
      if (!["POST", "DELETE"].includes(req.method)) { reply(res, 405, { error: "不支持的请求方式" }); return; }
      const origin = req.headers.origin;
      const expectedOrigin = allowedOrigin || `http://${req.headers.host}`;
      if ((origin && origin !== expectedOrigin) || req.headers["sec-fetch-site"] === "cross-site") { reply(res, 403, { error: "请从本站提交" }); return; }
      if (req.headers["content-type"]?.split(";")[0] !== "application/json") { reply(res, 415, { error: "请提交 JSON 数据" }); return; }
      let size = 0;
      const chunks = [];
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 8192) { reply(res, 413, { error: "提交内容过长" }); return; }
        chunks.push(chunk);
      }
      let data;
      try { data = JSON.parse(Buffer.concat(chunks).toString()); } catch { reply(res, 400, { error: "数据格式错误" }); return; }
      if (isAdmin && req.method === "POST") {
        if (!data || !/^[a-f0-9-]{36}$/.test(data.id || "") || !["new", "read"].includes(data.status)) { reply(res, 400, { error: "意见状态不正确" }); return; }
        const saved = store.markFeedback(data.id, data.status);
        reply(res, saved ? 200 : 404, saved ? { ok: true } : { error: "该意见已被撤回或不存在" }); return;
      }
      if (!data || typeof data.token !== "string" || !/^[a-f0-9]{64}$/.test(data.token)) { reply(res, 400, { error: "匿名凭证无效，请刷新重试" }); return; }
      const participant = hash(data.token);
      if (req.method === "DELETE" && endpoint === "me") {
        store.removeParticipant(participant);
        reply(res, 200, { ok: true }); return;
      }
      if (req.method !== "POST" || !["results", "feedback"].includes(endpoint)) { reply(res, 404, { error: "接口不存在" }); return; }
      if (data.consent !== true) { reply(res, 400, { error: "尚未确认数据保存提示" }); return; }
      if (data.version !== QUESTIONNAIRE_VERSION) { reply(res, 409, { error: "题库已更新，请刷新后重新测试" }); return; }
      if (endpoint === "results") {
        const answers = data.answers;
        if (!Array.isArray(answers) || answers.length !== questionBank.length || answers.some((a, i) => !Number.isInteger(a) || a < 0 || a >= questionBank[i].answers.length)) { reply(res, 400, { error: "请先完成全部题目" }); return; }
        const score = scoreAnswers(answers);
        store.saveResult(participant, score, pickType(score).profile.code, hash(JSON.stringify(answers)));
      } else {
        if (!/^[a-f0-9-]{36}$/.test(data.id || "") || !categories.has(data.category) || !Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5 || typeof data.message !== "string" || data.message.trim().length < 2 || data.message.length > 500 || (data.question != null && (!Number.isInteger(data.question) || data.question < 1 || data.question > questionBank.length))) {
          reply(res, 400, { error: "请检查意见分类、评分和内容（2–500 字）" }); return;
        }
        const status = store.saveFeedback(participant, { ...data, message: data.message.trim() });
        if (status !== "saved") { reply(res, status === "limited" ? 429 : 409, { error: status === "limited" ? "一天最多提交 5 条意见，明天再来聊聊" : "提交编号已使用，请刷新后重试" }); return; }
      }
      reply(res, 200, { ok: true });
    } catch (error) {
      console.error("DGTI API error:", error.code || error.name);
      if (!res.headersSent) reply(res, 500, { error: "暂时未保存成功，请稍后重试" });
    }
  }
  return { handler, close: () => store.close() };
}
