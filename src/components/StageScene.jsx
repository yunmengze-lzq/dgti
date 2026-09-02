import React from "react";

const reviewRows = [
  ["身份信息", "已核验"],
  ["项目方案", "审核中"],
  ["视频材料", "待补充"],
  ["赛道确认", "已保存"]
];

export function StageScene() {
  return (
    <div className="stage-scene editorial-gateway" aria-hidden="true">
      <div className="gateway-orbit" />
      <div className="registration-pass">
        <div className="pass-header">
          <span>OPC 2026</span>
          <strong>报名凭证</strong>
          <em>APPLICATION PASS</em>
        </div>
        <div className="pass-number">OPC-2026-001286</div>
        <dl className="pass-fields">
          <div>
            <dt>参赛主体</dt>
            <dd>一人公司创新项目</dd>
          </div>
          <div>
            <dt>报名赛道</dt>
            <dd>AI+产品设计</dd>
          </div>
          <div>
            <dt>材料状态</dt>
            <dd>72% 完成</dd>
          </div>
          <div>
            <dt>审核流转</dt>
            <dd>资格初审</dd>
          </div>
        </dl>
        <div className="pass-progress">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="review-sheet">
        <div className="sheet-title">
          <span>材料核验</span>
          <strong>实时状态</strong>
        </div>
        {reviewRows.map(([label, value], index) => (
          <div className="review-row" key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <em>{value}</em>
          </div>
        ))}
      </div>

      <div className="deadline-card">
        <span>报名截止</span>
        <strong>2026.08.15</strong>
        <small>18:00 前完成提交</small>
      </div>
    </div>
  );
}
