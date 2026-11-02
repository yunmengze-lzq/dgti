import { useCallback, useEffect, useState } from "react";
import { callCommunityApi } from "./dgtiApi.js";

export function useDgtiStatistics(active = true) {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision((v) => v + 1), []);
  useEffect(() => {
    if (!active) return;
    let cancelled = false, pending = false;
    async function load() {
      if (pending || document.hidden) return;
      pending = true; setBusy(true);
      try { const next = await callCommunityApi("stats"); if (!cancelled) { setStatistics(next); setError(""); } }
      catch (failure) { if (!cancelled) setError(failure.message); }
      finally { pending = false; if (!cancelled) setBusy(false); }
    }
    load();
    const timer = window.setInterval(load, 15000);
    window.addEventListener("dgti:statistics-updated", load);
    document.addEventListener("visibilitychange", load);
    return () => { cancelled = true; window.clearInterval(timer); window.removeEventListener("dgti:statistics-updated", load); document.removeEventListener("visibilitychange", load); };
  }, [active, revision]);
  return { statistics, error, busy, refresh };
}

export function useAutomaticResultSave({ answers, enabled, complete }) {
  const [status, setStatus] = useState({ kind: "idle", message: "" });
  const [attempt, setAttempt] = useState(0);
  const answerKey = JSON.stringify(answers);
  useEffect(() => {
    if (!enabled || !complete) { setStatus({ kind: "idle", message: "结果保存在本机" }); return; }
    let cancelled = false;
    const controller = new AbortController();
    setStatus({ kind: "saving", message: "结果已在本机保存，正在同步…" });
    callCommunityApi("results", { method: "POST", signal: controller.signal, data: { consent: true, answers: Object.entries(JSON.parse(answerKey)).sort((a, b) => Number(a[0]) - Number(b[0])).map(([, value]) => value) } })
      .then(() => { if (!cancelled) { setStatus({ kind: "saved", message: "已自动保存到服务器" }); window.dispatchEvent(new Event("dgti:statistics-updated")); } })
      .catch((failure) => { if (!cancelled) setStatus({ kind: "error", message: `本机结果已保留。${failure.message}` }); });
    return () => { cancelled = true; controller.abort(); };
  }, [answerKey, enabled, complete, attempt]);
  useEffect(() => {
    const retry = () => setAttempt((v) => v + 1);
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, []);
  return { ...status, retry: () => setAttempt((v) => v + 1) };
}
