import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { QUESTIONNAIRE_VERSION, feedbackCategories } from "../src/data/dgtiResearch.js";
import { summarizeResults } from "../src/lib/dgtiStatistics.js";

export function openStore(filename) {
  if (filename !== ":memory:") mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(filename);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS results (
      participant TEXT NOT NULL, version TEXT NOT NULL, role TEXT NOT NULL,
      axes TEXT NOT NULL, answer_hash TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
      PRIMARY KEY (participant, version)
    );
    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY, participant TEXT NOT NULL, version TEXT NOT NULL,
      category TEXT NOT NULL, rating INTEGER NOT NULL, question INTEGER,
      message TEXT NOT NULL, created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS feedback_participant ON feedback(participant, created_at);
  `);
  if (!db.prepare("PRAGMA table_info(feedback)").all().some((column) => column.name === "status")) {
    db.exec("ALTER TABLE feedback ADD COLUMN status TEXT NOT NULL DEFAULT 'new'");
  }
  return {
    close: () => db.close(),
    saveResult(participant, score, role, hash) {
      const now = new Date().toISOString();
      db.prepare(`INSERT INTO results VALUES (?, ?, ?, ?, ?, 1, ?, ?)
        ON CONFLICT(participant, version) DO UPDATE SET role=excluded.role, axes=excluded.axes,
        attempts=results.attempts + CASE WHEN results.answer_hash=excluded.answer_hash THEN 0 ELSE 1 END,
        updated_at=CASE WHEN results.answer_hash=excluded.answer_hash THEN results.updated_at ELSE excluded.updated_at END,
        answer_hash=excluded.answer_hash`).run(participant, QUESTIONNAIRE_VERSION, role, JSON.stringify(score.axes), hash, now, now);
    },
    saveFeedback(participant, data) {
      const existing = db.prepare("SELECT participant FROM feedback WHERE id=?").get(data.id);
      if (existing) return existing.participant === participant ? "saved" : "conflict";
      const recent = db.prepare("SELECT COUNT(*) AS n FROM feedback WHERE participant=? AND created_at>=?").get(participant, new Date(Date.now() - 86400000).toISOString());
      if (recent.n >= 5) return "limited";
      db.prepare("INSERT INTO feedback (id, participant, version, category, rating, question, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(data.id, participant, QUESTIONNAIRE_VERSION, data.category, data.rating, data.question ?? null, data.message, new Date().toISOString());
      return "saved";
    },
    removeParticipant(participant) {
      db.exec("BEGIN");
      try {
        db.prepare("DELETE FROM results WHERE participant=?").run(participant);
        db.prepare("DELETE FROM feedback WHERE participant=?").run(participant);
        db.exec("COMMIT");
      } catch (error) { db.exec("ROLLBACK"); throw error; }
    },
    statistics() {
      const rows = db.prepare("SELECT role, axes, attempts FROM results WHERE version=?").all(QUESTIONNAIRE_VERSION).map((row) => ({ ...row, axes: JSON.parse(row.axes) }));
      const rating = db.prepare("SELECT COUNT(*) AS count, AVG(rating) AS averageRating FROM feedback WHERE version=?").get(QUESTIONNAIRE_VERSION);
      const categories = db.prepare("SELECT category, COUNT(*) AS count FROM feedback WHERE version=? GROUP BY category").all(QUESTIONNAIRE_VERSION);
      return { ...summarizeResults(rows), version: QUESTIONNAIRE_VERSION, kind: "real", updatedAt: new Date().toISOString(), feedback: { count: rating.count, averageRating: rating.count ? Math.round(rating.averageRating * 10) / 10 : null, categories: feedbackCategories.map(([key]) => ({ key, count: categories.find((r) => r.category === key)?.count || 0 })) } };
    },
    exportFeedback() {
      return db.prepare("SELECT version, category, rating, question, message, status, created_at FROM feedback ORDER BY created_at DESC").all();
    },
    listFeedback({ category, status, page }) {
      const clauses = [], args = [];
      if (category) { clauses.push("category=?"); args.push(category); }
      if (status) { clauses.push("status=?"); args.push(status); }
      const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";
      const total = db.prepare(`SELECT COUNT(*) AS n FROM feedback${where}`).get(...args).n;
      const unread = db.prepare("SELECT COUNT(*) AS n FROM feedback WHERE status='new'").get().n;
      const items = db.prepare(`SELECT id, version, category, rating, question, message, status, created_at FROM feedback${where} ORDER BY created_at DESC, id DESC LIMIT 25 OFFSET ?`).all(...args, (page - 1) * 25);
      return { items, total, unread, page, pages: Math.max(1, Math.ceil(total / 25)) };
    },
    markFeedback(id, status) {
      return db.prepare("UPDATE feedback SET status=? WHERE id=?").run(status, id).changes > 0;
    }
  };
}
