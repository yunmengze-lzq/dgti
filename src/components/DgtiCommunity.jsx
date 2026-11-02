import React, { useEffect, useRef, useState } from "react";
import { axisMeta, groupMeta, questionBank, roleProfiles } from "../data/dgti.js";
import { QUESTIONNAIRE_VERSION, feedbackCategories, questionReferences, researchSources } from "../data/dgtiResearch.js";
import { callCommunityApi, createSubmissionId } from "../lib/dgtiApi.js";
import { getDemoStatistics } from "../lib/dgtiStatistics.js";

export function ResearchNotes() {
  return <details className="research-notes" id="research-notes">
    <summary>题目参考了什么？</summary>
    <p>请按最近一个月通常会怎么做来选；没遇到过，就选最接近自己的反应。工作环境会影响答案，结果适合用来反思和讨论，不是能力评分。</p>
    <p>25 道题为原创职场情境题，20 个角色和四维计分由本项目设计，未经过信效度验证。参考研究提供观察角度，不代表研究机构认可本测试，也不能用于招聘或诊断。</p>
    {researchSources.map((source) => <p key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>：{source.note}</p>)}
    <details><summary>逐题参考 · {QUESTIONNAIRE_VERSION}</summary><ol>{questionReferences.map(([theme, ...ids], i) => <li key={i}><strong>{questionBank[i].chapter}</strong>：{theme} <span>（{ids.map((id) => id === "ipip" ? "IPIP" : "COPSOQ III").join("、")}，概念参考）</span></li>)}</ol></details>
  </details>;
}

export function ResultContribution({ answers, onViewCommunity }) {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const guard = useRef(false);
  async function submit() {
    if (!consent || guard.current) return;
    guard.current = true; setBusy(true);
    try {
      await callCommunityApi("results", { method: "POST", data: { consent, answers: questionBank.map((_, i) => answers[i]) } });
      setStatus("已加入真实样本。感谢参与，同一浏览器再次提交会更新结果。");
    } catch (error) { setStatus(error.message); }
    finally { guard.current = false; setBusy(false); }
  }
  return <section className="dgti-section contribution-section">
    <div><p className="eyebrow">把你的这一票留下</p><h2>看看其他打工人怎么选</h2><p>自愿提交后，服务端计算并保存角色、四维分数和匿名凭证摘要。答题选项不落库，昵称与羁绊不会上传。</p></div>
    <div className="contribution-actions">
      <label className="checkbox-control"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>同意匿名加入整体统计，可在统计页撤回</span></label>
      <div className="hero-actions"><button className="primary-action" type="button" disabled={!consent || busy} onClick={submit}>{busy ? "提交中…" : "提交匿名结果"}</button><button className="secondary-action" type="button" onClick={onViewCommunity}>看统计 / 提意见</button></div>
      <p role="status">{status}</p>
    </div>
  </section>;
}

function FeedbackForm({ onSaved }) {
  const [category, setCategory] = useState("question");
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const pending = useRef(null);
  const guard = useRef(false);
  async function submit(e) {
    e.preventDefault();
    if (guard.current) return;
    guard.current = true; setBusy(true); setStatus("");
    const data = { category, question: category === "question" && question ? Number(question) : null, rating: Number(rating), message: message.trim(), consent };
    const signature = JSON.stringify(data);
    if (pending.current?.signature !== signature) pending.current = { signature, id: createSubmissionId() };
    try {
      await callCommunityApi("feedback", { method: "POST", data: { ...data, id: pending.current.id } });
      setStatus("意见已送达，谢谢你帮这份测试更像真实职场。");
      setMessage(""); setRating(""); setConsent(false); pending.current = null; onSaved();
    } catch (error) { setStatus(error.message); }
    finally { guard.current = false; setBusy(false); }
  }
  return <section className="dgti-section community-feedback" id="community-feedback">
    <div className="section-heading"><p className="eyebrow">欢迎说实话</p><h2>哪儿不对，直接告诉我</h2><p>意见正文只给作者看。不要填写姓名、电话、公司名等个人信息。</p></div>
    <form className="community-form" onSubmit={submit}>
      <div className="community-form-row">
        <label className="field-control"><span>反馈类型</span><select value={category} onChange={(e) => setCategory(e.target.value)}>{feedbackCategories.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        {category === "question" && <label className="field-control"><span>哪一道（选填）</span><select value={question} onChange={(e) => setQuestion(e.target.value)}><option value="">整体题库</option>{questionBank.map((q, i) => <option key={i} value={i + 1}>{i + 1}. {q.chapter}</option>)}</select></label>}
        <label className="field-control"><span>整体体验</span><select required value={rating} onChange={(e) => setRating(e.target.value)}><option value="">请选择评分</option>{["很不满意", "不太满意", "一般", "比较满意", "很满意"].map((label, i) => <option key={i} value={i + 1}>{i + 1} 分 · {label}</option>)}</select></label>
      </div>
      <label className="field-control"><span>你的意见</span><textarea required minLength={2} maxLength={500} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="比如：第 3 题我会直接帮忙，但没有合适的选项。" /><small>{message.length} / 500</small></label>
      <label className="checkbox-control"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required /><span>同意保存这条匿名意见，并把分类和评分加入汇总</span></label>
      <button className="primary-action" type="submit" disabled={busy || !consent}>{busy ? "提交中…" : "提交意见"}</button><p role="status">{status}</p>
    </form>
  </section>;
}

export function CommunityView({ setPhase }) {
  const [mode, setMode] = useState("real");
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");
  const [expanded, setExpanded] = useState(false);
  async function refresh() {
    setBusy(true); setError("");
    try { setStatistics(await callCommunityApi("stats")); }
    catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  useEffect(() => { refresh(); }, []);
  const data = mode === "demo" ? getDemoStatistics() : statistics;
  const leader = data?.count ? data.roles[0] : null;
  const leaderProfile = roleProfiles.find((p) => p.code === leader?.code);
  async function withdraw() {
    if (!window.confirm("撤回本浏览器提交的匿名结果和意见？本机测试结果、羁绊和打赏记录会保留。")) return;
    setDeleting(true);
    try { await callCommunityApi("me", { method: "DELETE" }); setDeleteStatus("本浏览器的提交已撤回。"); await refresh(); }
    catch (failure) { setDeleteStatus(failure.message); }
    finally { setDeleting(false); }
  }
  return <main className="community-view page-enter">
    <section className="dgti-section community-heading">
      <button type="button" className="text-action" onClick={() => setPhase("home")}>返回首页</button>
      <p className="eyebrow">打工人观察站</p><h1>原来不止我一个</h1><p>看看参与者的打工模式，也欢迎指出这份测试哪里还不够像你。</p>
      <div className="community-toolbar"><div className="community-switch" role="group" aria-label="数据来源"><button type="button" aria-pressed={mode === "real"} onClick={() => setMode("real")}>真实样本</button><button type="button" aria-pressed={mode === "demo"} onClick={() => setMode("demo")}>演示案例 · 100 份</button></div><button className="text-action" type="button" disabled={busy} onClick={refresh}>{busy ? "更新中…" : "刷新统计"}</button><a href="#community-feedback">提个意见</a></div>
      <p className="sample-note">{mode === "demo" ? "当前为 100 份程序生成的虚拟案例，仅演示分布，不计入真实人数、满意度或收入。" : "仅统计自愿提交的本版结果。同一浏览器保留最新结果；清除浏览器数据或换设备可能重复计数，不代表独立自然人。"}</p>
      {error && <p role="alert">{error}{statistics ? " 当前保留上次加载的统计。" : " 可切换查看演示案例。"}</p>}
      {data && <>
        <dl className="community-metrics"><div><dt>{mode === "demo" ? "虚拟案例" : "参与设备"}</dt><dd>{data.count}<small>{mode === "demo" ? "份" : "个"}</small></dd></div><div><dt>{mode === "demo" ? "模拟答卷" : "有效提交"}</dt><dd>{data.attempts}<small>份</small></dd></div><div><dt>真实意见</dt><dd>{mode === "demo" ? "—" : data.feedback.count}<small>条</small></dd></div><div><dt>体验评分 · 满分 5</dt><dd>{mode === "demo" ? "—" : data.feedback.averageRating ?? "—"}</dd></div></dl>
        <p className="community-insight">{leaderProfile ? `这批${mode === "demo" ? "虚拟案例" : "参与者"}里，${leaderProfile.name}最多，占 ${leader.percent}%。` : "还没有收到本版的真实结果。测完后可以自愿把你这一票留下。"} {data.count > 0 && "这是本站样本，不代表全体打工人的比例。"}</p>
        {mode === "real" && <p className="sample-note">有效提交包含答案变更后的重测；相同答案重复提交不增加计数。体验评分来自愿意反馈的用户，不是测量准确率。</p>}
      </>}
    </section>
    {data && data.count > 0 && <section className="dgti-section distribution-section"><div className="section-heading"><p className="eyebrow">{mode === "demo" ? "虚拟案例分布" : "参与者角色分布"}</p><h2>大家都坐在哪个工位</h2></div><div className="distribution-grid">{data.roles.slice(0, expanded ? 20 : 6).map((row) => {
      const profile = roleProfiles.find((p) => p.code === row.code);
      return <article className="distribution-row" key={row.code} style={{ "--role-color": groupMeta[profile.group].color }}><img src={profile.art.mbti} alt="" loading="lazy" /><div><div className="distribution-label"><strong>{profile.name}</strong><span>{row.count} 份 · {row.percent}%</span></div><div className="distribution-track" aria-hidden="true"><i style={{ width: `${row.percent}%` }} /></div></div></article>;
    })}</div><button type="button" className="text-action" onClick={() => setExpanded(!expanded)}>{expanded ? "收起分布" : "看全部 20 种角色"}</button><details className="community-axis"><summary>四维平均倾向</summary>{axisMeta.map(([key, , , left, right, , label]) => <p key={key}><strong>{label}</strong><span>{left} {100 - data.axes[key]}% / {right} {data.axes[key]}%</span></p>)}<p className="sample-note">数值是本站自定义分数的平均值，不是选择某一侧的人数占比。</p></details></section>}
    {statistics?.feedback.count > 0 && mode === "real" && <section className="dgti-section feedback-summary"><h2>大家主要在反馈什么</h2>{statistics.feedback.categories.map(({ key, count }) => <p key={key}><span>{feedbackCategories.find(([id]) => id === key)?.[1]}</span><strong>{count} 条</strong></p>)}</section>}
    <FeedbackForm onSaved={refresh} />
    <section className="dgti-section community-privacy"><ResearchNotes /><details><summary>数据保存与撤回</summary><p>结果与意见存入服务器数据库，公开页仅显示汇总。不会上传昵称、手机号、地址或羁绊。匿名凭证保存在当前浏览器，用于更新和撤回；清除浏览器数据后无法找回该凭证。</p><button type="button" className="text-action danger-action" disabled={deleting} onClick={withdraw}>{deleting ? "撤回中…" : "撤回本浏览器的提交"}</button><p role="status">{deleteStatus}</p></details></section>
  </main>;
}
