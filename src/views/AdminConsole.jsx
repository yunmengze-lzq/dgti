import React, { useMemo, useState } from "react";
import { adminStats } from "../data/content.js";
import { filterApplications } from "../services/mockApi.js";

const statuses = ["全部状态", "材料审核中", "待提交", "初审通过", "已退回"];

export function AdminConsole() {
  const [status, setStatus] = useState("全部状态");
  const rows = useMemo(() => filterApplications(status), [status]);

  return (
    <main className="admin-view">
      <aside className="admin-nav">
        <strong>OPC Admin</strong>
        {["报名管理", "材料下载", "公告维护", "评审账号", "系统日志"].map((item, index) => (
          <button className={index === 0 ? "active" : ""} type="button" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item}
          </button>
        ))}
      </aside>

      <section className="admin-content">
        <header className="page-header admin-header">
          <span>Admin</span>
          <div>
            <h1>报名管理</h1>
            <p>筛选、审核、退回、下载材料和导出报名数据。</p>
          </div>
          <button className="solid-control" type="button">
            导出 Excel
          </button>
        </header>

        <div className="stat-row">
          {adminStats.map((stat) => (
            <article key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.delta} 今日新增</small>
            </article>
          ))}
        </div>

        <div className="admin-table-panel">
          <div className="admin-toolbar">
            <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="筛选状态">
              {statuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input placeholder="搜索报名编号 / 项目名称 / 负责人" />
            <button className="ghost-control" type="button">
              批量下载
            </button>
          </div>

          <div className="data-table" role="table" aria-label="报名列表">
            <div className="table-head" role="row">
              <span>报名编号</span>
              <span>项目名称</span>
              <span>负责人</span>
              <span>赛道</span>
              <span>完整度</span>
              <span>状态</span>
              <span>操作</span>
            </div>
            {rows.map((row) => (
              <div className="table-row" role="row" key={row.id}>
                <strong>{row.id}</strong>
                <span>{row.project}</span>
                <span>{row.owner}</span>
                <span>{row.track}</span>
                <span>{row.completeness}%</span>
                <span className={`status-pill ${statusClass(row.status)}`}>{row.status}</span>
                <button type="button">查看</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function statusClass(status) {
  if (status === "初审通过") return "approved";
  if (status === "已退回") return "returned";
  if (status === "待提交") return "draft";
  return "reviewing";
}
