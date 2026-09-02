import React from "react";
import { materials, schedule } from "../data/content.js";

export function ParticipantWorkbench({ onNavigate }) {
  return (
    <main className="page-view workbench-page">
      <header className="page-header">
        <span>Status</span>
        <div>
          <h1>参赛者中心</h1>
          <p>查询报名编号、材料完整度、审核节点与退回意见。</p>
        </div>
        <button className="solid-control" type="button" onClick={() => onNavigate("register")}>
          补充材料
        </button>
      </header>

      <section className="status-hero">
        <div>
          <span>报名编号</span>
          <h2>OPC2026001286</h2>
          <p>材料审核中，预计在报名截止后 7 个工作日内反馈结果。</p>
        </div>
        <div className="status-meter" aria-label="材料完整度72%">
          <strong>72%</strong>
          <span><i style={{ width: "72%" }} /></span>
          <small>材料完整度</small>
        </div>
      </section>

      <section className="workbench-layout">
        <div className="panel-line">
          <h3>待补充材料</h3>
          {materials
            .filter((item) => item.state !== "已上传")
            .map((item) => (
              <button type="button" key={item.id}>
                <span>{item.required ? "必填" : "选填"}</span>
                <strong>{item.name}</strong>
                <small>{item.note}</small>
              </button>
            ))}
        </div>

        <div className="panel-line">
          <h3>审核意见</h3>
          <p>
            项目方向符合 AI+产品设计赛道。建议补充智能制样流程的成本估算、竞品对比，以及一段真实演示视频。
          </p>
          <time>2026-06-11 18:20</time>
        </div>
      </section>

      <section className="audit-path">
        {schedule.map((item, index) => (
          <article className={index < 2 ? "active" : ""} key={item.phase}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.phase}</strong>
            <small>{item.date}</small>
          </article>
        ))}
      </section>
    </main>
  );
}
