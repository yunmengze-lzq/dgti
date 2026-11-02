import React, { useRef, useState } from "react";
import { axisMeta, groupMeta, questionBank, roleProfiles } from "../data/dgti.js";
import { QUESTIONNAIRE_VERSION, feedbackCategories, questionReferences, researchSources } from "../data/dgtiResearch.js";
import { callCommunityApi, createSubmissionId } from "../lib/dgtiApi.js";
import { useDgtiStatistics } from "../lib/useDgtiStatistics.js";

export function ResearchNotes() {
  return <details className="research-notes" id="research-notes">
    <summary>题目参考了什么？</summary>
    <p>请按最近一个月通常会怎么做来选；没遇到过，就选最接近自己的反应。工作环境会影响答案，结果适合用来反思和讨论，不是能力评分。</p>
    <p>25 道题为原创职场情境题，20 个角色和四维计分由本项目设计，未经过信效度验证。参考研究提供观察角度，不代表研究机构认可本测试，也不能用于招聘或诊断。</p>
    {researchSources.map((source) => <p key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>：{source.note}</p>)}
    <details><summary>逐题参考 · {QUESTIONNAIRE_VERSION}</summary><ol>{questionReferences.map(([theme, ...ids], i) => <li key={i}><strong>{questionBank[i].chapter}</strong>：{theme} <span>（{ids.map((id) => id === "ipip" ? "IPIP" : "COPSOQ III").join("、")}，概念参考）</span></li>)}</ol></details>
  </details>;
}

export function ResultSync({ sync, onViewCommunity }) {
  return <section className="dgti-section result-sync">
    <p role="status">{sync.message}</p>
    <div><button className="text-action" type="button" onClick={onViewCommunity}>看整体分布 / 提意见</button>{sync.kind === "error" && <button className="secondary-action" type="button" onClick={sync.retry}>重试保存</button>}</div>
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

function RoleDistributionChart({ data }) {
  const maximum = Math.max(4, ...data.roles.map((r) => r.count));
  const step = Math.max(1, Math.ceil(maximum / 4));
  const ceiling = step * 4;
  const height = 240, left = 52, top = 24, width = 1200, slot = 56;
  return <div className="role-chart">
    <div className="chart-legend">{Object.entries(groupMeta).map(([key, group]) => <span key={key}><i style={{ background: group.color }} />{group.name}</span>)}</div>
    <div className="chart-scroll" tabIndex={0} role="region" aria-label="参与者角色柱状图，可横向滚动">
      <svg viewBox="0 0 1200 390" role="img" aria-labelledby="role-chart-title role-chart-description">
        <title id="role-chart-title">参与者角色分布</title><desc id="role-chart-description">横轴是 20 种角色，纵轴是当前题库真实作答设备数。详细数据在图后的表格中。</desc>
        {[0,1,2,3,4].map((i) => <g key={i}><line x1={left} x2={width - 20} y1={top + height - i * height / 4} y2={top + height - i * height / 4} stroke="#dce1e7" /><text x={left - 12} y={top + height - i * height / 4 + 4} textAnchor="end">{i * step}</text></g>)}
        <text x={left} y={14}>人数（设备）</text>
        {data.roles.map((row, i) => {
          const profile = roleProfiles.find((p) => p.code === row.code);
          const x = left + 8 + i * slot;
          const barHeight = row.count / ceiling * height;
          return <g key={row.code}><title>{profile.name}：{row.count} 份，占 {row.percent}%</title><rect x={x + 9} y={top + height - barHeight} width={30} height={barHeight} rx={3} fill={groupMeta[profile.group].color} /><text x={x + 24} y={top + height - barHeight - 7} textAnchor="middle">{row.count}</text><text transform={`translate(${x + 28}, ${top + height + 24}) rotate(-48)`} textAnchor="end">{profile.name}</text></g>;
        })}
        <text x={width - 24} y={383} textAnchor="end">角色</text>
      </svg>
    </div>
    {data.count === 0 && <p className="sample-note">还没有本版作答，图中暂时为 0。有人完成测试后会自动更新。</p>}
    <details className="chart-table"><summary>查看人数、占比与稀有排名</summary><div className="chart-table-scroll"><table><thead><tr><th>角色</th><th>人数</th><th>占比</th><th>稀有排名</th></tr></thead><tbody>{data.roles.map((row) => <tr key={row.code}><th scope="row">{roleProfiles.find((p) => p.code === row.code).name}</th><td>{row.count}</td><td>{row.percent}%</td><td>{row.rarityRank ? `${row.tied ? "并列 " : ""}${row.rarityRank} / ${data.observedTypes}` : "暂无样本"}</td></tr>)}</tbody></table></div></details>
  </div>;
}

export function CommunityView({ setPhase, autoUpload, onAutoUploadChange }) {
  const { statistics, error, busy, refresh } = useDgtiStatistics();
  const [deleting, setDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("");
  const data = statistics;
  const leader = data?.count ? data.roles[0] : null;
  const leaderProfile = roleProfiles.find((p) => p.code === leader?.code);
  async function withdraw() {
    if (!window.confirm("撤回本浏览器上传的结果和意见，并关闭自动上传？本机结果与羁绊会保留。")) return;
    onAutoUploadChange(false);
    setDeleting(true);
    try { await callCommunityApi("me", { method: "DELETE" }); setDeleteStatus("已撤回，并关闭自动上传。"); refresh(); }
    catch (failure) { setDeleteStatus(failure.message); }
    finally { setDeleting(false); }
  }
  return <main className="community-view page-enter">
    <section className="dgti-section community-heading">
      <button type="button" className="text-action" onClick={() => setPhase("home")}>返回首页</button>
      <div className="community-title-row"><div><p className="eyebrow">打工人观察站</p><h1>原来不止我一个</h1></div><div className="community-live"><span />每 15 秒更新<button className="text-action" type="button" disabled={busy} onClick={refresh}>刷新</button></div></div>
      <p>谁最能扛，谁最会躲，看看大家都是什么班味。</p>
      {error && <p role="alert">{error}{statistics ? " 当前为上次加载的数据。" : ""}</p>}
      {data && <>
        <dl className="community-metrics"><div><dt>参与设备</dt><dd>{data.count}<small>个</small></dd></div><div><dt>已记录作答</dt><dd>{data.attempts}<small>份</small></dd></div><div><dt>收到意见</dt><dd>{data.feedback.count}<small>条</small></dd></div><div><dt>体验评分 · 满分 5</dt><dd>{data.feedback.averageRating ?? "—"}</dd></div></dl>
        <p className="community-insight">{leaderProfile ? `${leaderProfile.name}暂时最多，占本版样本的 ${leader.percent}%。` : "这张工位地图，等你来点亮。"} <a href="#community-feedback">说说你的体验</a></p>
        <p className="sample-note">按本版、同一浏览器的最新结果计数；不等于实名人数或全体打工人比例。重复相同答案不增加作答次数。</p>
      </>}
    </section>
    {data && <section className="dgti-section distribution-section"><div className="section-heading"><p className="eyebrow">参与者角色分布</p><h2>看看谁的工位最挤</h2></div><RoleDistributionChart data={data} />{data.count > 0 && <details className="community-axis"><summary>四维平均倾向</summary>{axisMeta.map(([key, , , left, right, , label]) => <p key={key}><strong>{label}</strong><span>{left} {100 - data.axes[key]}% / {right} {data.axes[key]}%</span></p>)}<p className="sample-note">自定义分数的平均值，不是人数占比。</p></details>}</section>}
    {data?.feedback.count > 0 && <section className="dgti-section feedback-summary"><h2>大家主要在反馈什么</h2>{data.feedback.categories.map(({ key, count }) => <p key={key}><span>{feedbackCategories.find(([id]) => id === key)?.[1]}</span><strong>{count} 条</strong></p>)}</section>}
    <FeedbackForm onSaved={refresh} />
    <section className="dgti-section community-privacy"><ResearchNotes /><details><summary>保存设置与撤回</summary><p>答完默认保存角色和四维摘要到服务器。公开页只显示统计，不上传昵称、手机号、地址或羁绊。当前浏览器的随机凭证用于更新和撤回，清理浏览器数据后无法找回。</p><label className="checkbox-control"><input type="checkbox" checked={autoUpload} onChange={(e) => onAutoUploadChange(e.target.checked)} /><span>完成测试后自动保存到服务器</span></label><button type="button" className="text-action danger-action" disabled={deleting} onClick={withdraw}>{deleting ? "撤回中…" : "撤回本浏览器的结果与意见"}</button><p role="status">{deleteStatus}</p></details><button type="button" className="text-action" onClick={() => setPhase("admin")}>作者入口 · 意见管理</button></section>
  </main>;
}
