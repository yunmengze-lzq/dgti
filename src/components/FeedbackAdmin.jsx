import React, { useEffect, useRef, useState } from "react";
import { feedbackCategories } from "../data/dgtiResearch.js";
import { callCommunityApi } from "../lib/dgtiApi.js";

export function FeedbackAdmin({ setPhase }) {
  const insecure = window.location.protocol !== "https:" && !["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
  const [keyInput, setKeyInput] = useState("");
  const [key, setKey] = useState("");
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const requestId = useRef(0);
  useEffect(() => {
    if (!key) return;
    const id = ++requestId.current;
    setBusy(true); setError("");
    const params = new URLSearchParams({ category, status, page: String(page) });
    callCommunityApi(`admin/feedback?${params}`, { adminKey: key }).then((value) => {
      if (id === requestId.current) {
        if (page > value.pages) { setPage(value.pages); return; }
        setData(value);
      }
    }).catch((failure) => { if (id === requestId.current) { setError(failure.message); if (failure.status === 401 || failure.status === 503) { setKey(""); setData(null); } } }).finally(() => { if (id === requestId.current) setBusy(false); });
    return () => { requestId.current += 1; };
  }, [key, category, status, page, revision]);
  async function mark(item) {
    setBusy(true); setError("");
    try { await callCommunityApi("admin/feedback", { method: "POST", adminKey: key, data: { id: item.id, status: item.status === "new" ? "read" : "new" } }); setRevision((v) => v + 1); }
    catch (failure) { setError(failure.message); if (failure.status === 401) { setKey(""); setData(null); } }
    finally { setBusy(false); }
  }
  function logout() { requestId.current += 1; setKey(""); setKeyInput(""); setData(null); setError(""); }
  return <main className="community-view admin-view page-enter"><section className="dgti-section">
    <button className="text-action" type="button" onClick={() => setPhase("community")}>返回统计</button>
    <div className="admin-heading"><div><p className="eyebrow">作者后台</p><h1>意见收件箱</h1></div>{key && <button className="secondary-action" type="button" onClick={logout}>退出管理</button>}</div>
    {insecure && <p role="alert">请使用 HTTPS 网址或本机 SSH 隧道访问后台，避免管理密钥被明文传输。</p>}
    {!key && !insecure && <form className="admin-login" onSubmit={(e) => { e.preventDefault(); setKey(keyInput.trim()); setKeyInput(""); }}><label className="field-control"><span>管理密钥</span><input required type="password" autoComplete="off" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} /></label><button type="submit" className="primary-action" disabled={busy}>进入收件箱</button><p>仅作者可查看意见正文。密钥仅用于本次页面会话，不保存在浏览器。</p></form>}
    {error && <p role="alert">{error}</p>}
    {key && <><div className="community-toolbar admin-filters"><label className="field-control"><span>类型</span><select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>{[["", "全部类型"], ...feedbackCategories].map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label><label className="field-control"><span>状态</span><select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}><option value="">全部状态</option><option value="new">未读</option><option value="read">已读</option></select></label><button className="secondary-action" type="button" disabled={busy} onClick={() => setRevision((v) => v + 1)}>刷新</button><span role="status">{busy ? "加载中…" : `筛选结果 ${data?.total ?? 0} 条 · 全部未读 ${data?.unread ?? 0} 条`}</span></div>
    <div className="admin-messages">{data?.items.map((item) => <article key={item.id} className="admin-message"><div className="admin-message-meta"><strong>{feedbackCategories.find(([id]) => id === item.category)?.[1]}</strong><span>{item.status === "new" ? "未读" : "已读"}</span><span>体验 {item.rating} / 5</span><time>{new Date(item.created_at).toLocaleString("zh-CN")}</time></div><p>{item.message}</p><div className="admin-message-meta"><span>{item.question ? `第 ${item.question} 题` : "整体意见"} · 题库 {item.version}</span><button type="button" className="text-action" disabled={busy} onClick={() => mark(item)}>{item.status === "new" ? "标为已读" : "标为未读"}</button></div></article>)}{data?.total === 0 && <p className="admin-empty">暂时没有符合条件的意见。收到新反馈后，会出现在这里。</p>}</div>
    <div className="admin-pagination"><button type="button" className="secondary-action" disabled={page <= 1 || busy} onClick={() => setPage(page - 1)}>上一页</button><span>{page} / {data?.pages || 1}</span><button type="button" className="secondary-action" disabled={page >= (data?.pages || 1) || busy} onClick={() => setPage(page + 1)}>下一页</button></div></>}
  </section></main>;
}
