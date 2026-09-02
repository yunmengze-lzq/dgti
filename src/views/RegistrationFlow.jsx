import React, { useMemo, useState } from "react";
import { createApplicationNumber } from "../services/mockApi.js";
import { materials, tracks } from "../data/content.js";

const steps = ["账号验证", "主体信息", "项目信息", "材料上传", "确认提交"];

export function RegistrationFlow({ onNavigate }) {
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState(tracks[0].name);
  const [uploaded, setUploaded] = useState(2);
  const applicationNumber = useMemo(() => createApplicationNumber(), []);

  const next = () => {
    if (step === steps.length - 1) {
      onNavigate("workbench");
      return;
    }

    setStep((value) => Math.min(value + 1, steps.length - 1));
  };

  return (
    <main className="page-view registration-page">
      <PageHeader
        label="Apply"
        title="在线报名"
        desc="把资料填写、赛道选择、材料上传和确认提交压缩为一个可追踪流程。"
        action="查看进度"
        onAction={() => onNavigate("workbench")}
      />

      <div className="registration-grid">
        <aside className="step-rail" aria-label="报名步骤">
          {steps.map((item, index) => (
            <button
              key={item}
              className={index === step ? "step-node active" : index < step ? "step-node done" : "step-node"}
              type="button"
              onClick={() => setStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </button>
          ))}
          <div className="draft-panel">
            <span>草稿编号</span>
            <strong>{applicationNumber}</strong>
            <small>后端接入后改为服务端生成并锁定。</small>
          </div>
        </aside>

        <section className="form-surface">
          {step === 0 && <AccountStep />}
          {step === 1 && <EntityStep />}
          {step === 2 && <ProjectStep track={track} onTrackChange={setTrack} />}
          {step === 3 && <MaterialStep uploaded={uploaded} onUpload={() => setUploaded((value) => Math.min(value + 1, materials.length))} />}
          {step === 4 && <ConfirmStep track={track} uploaded={uploaded} applicationNumber={applicationNumber} />}

          <div className="form-footer">
            <button className="text-control" type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(value - 1, 0))}>
              上一步
            </button>
            <button className="ghost-control" type="button">
              保存草稿
            </button>
            <button className="solid-control" type="button" onClick={next}>
              {step === steps.length - 1 ? "提交并查看进度" : "下一步"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function AccountStep() {
  return (
    <FormChapter title="账号验证" desc="手机号作为唯一账号，短信和邮件用于接收报名编号与审核结果。">
      <div className="field-grid">
        <Field label="手机号码" placeholder="请输入报名手机号" />
        <Field label="短信验证码" placeholder="6位验证码" action="获取验证码" />
        <Field label="邮箱" placeholder="用于接收审核通知" />
        <Field label="通讯地址" placeholder="省 / 市 / 区 / 详细地址" />
      </div>
      <label className="consent-line">
        <input type="checkbox" defaultChecked />
        <span>我已阅读并同意报名须知、材料真实性承诺与隐私政策。</span>
      </label>
    </FormChapter>
  );
}

function EntityStep() {
  return (
    <FormChapter title="主体信息" desc="支持个人、三人以内团队、在校学生、应届毕业生、科研团队与拟注册一人公司。">
      <div className="segmented">
        {["个人创业者", "≤3人团队", "在校学生", "科研团队"].map((item, index) => (
          <button className={index === 1 ? "active" : ""} type="button" key={item}>
            {item}
          </button>
        ))}
      </div>
      <div className="field-grid">
        <Field label="负责人姓名" placeholder="请输入真实姓名" />
        <Field label="身份证明" placeholder="身份证 / 学生证 / 单位证明" action="上传" />
        <Field label="团队成员" placeholder="最多填写3名核心成员" />
        <Field label="公开账号" placeholder="抖音、视频号或项目主页" />
      </div>
    </FormChapter>
  );
}

function ProjectStep({ track, onTrackChange }) {
  return (
    <FormChapter title="项目信息" desc="每个项目仅选择一个主赛道，方案需体现AI能力、商业模式和景德镇落地路径。">
      <div className="track-picker">
        {tracks.map((item) => (
          <label className={track === item.name ? "track-choice selected" : "track-choice"} key={item.code}>
            <input type="radio" name="track" checked={track === item.name} onChange={() => onTrackChange(item.name)} />
            <span>{item.code}</span>
            <strong>{item.name}</strong>
          </label>
        ))}
      </div>
      <div className="field-grid">
        <Field label="项目名称" placeholder="例如：青白釉智能制样台" />
        <Field label="一句话介绍" placeholder="30字以内说明核心价值" />
        <Field label="AI应用亮点" placeholder="工具链、模型、自动化流程或智能体设计" wide />
        <Field label="落地计划" placeholder="景德镇本地资源、场景、销售路径与实施节奏" wide />
      </div>
    </FormChapter>
  );
}

function MaterialStep({ uploaded, onUpload }) {
  return (
    <FormChapter title="材料上传" desc="原型使用本地状态模拟上传。后续接入OSS签名、断点续传、文件预览和安全扫描。">
      <button className="upload-field" type="button" onClick={onUpload}>
        <strong>点击模拟上传下一项材料</strong>
        <span>当前完整度 {uploaded}/{materials.length}</span>
      </button>
      <div className="material-stack">
        {materials.map((item, index) => (
          <article className={index < uploaded ? "material-item done" : "material-item"} key={item.id}>
            <span>{index < uploaded ? "已完成" : item.state}</span>
            <strong>{item.name}</strong>
            <small>{item.note}</small>
          </article>
        ))}
      </div>
    </FormChapter>
  );
}

function ConfirmStep({ track, uploaded, applicationNumber }) {
  return (
    <FormChapter title="确认提交" desc="提交后可在参赛者中心查看审核进度；管理员退回后可重新补充材料。">
      <div className="summary-grid">
        <Summary label="报名编号" value={applicationNumber} />
        <Summary label="主体类型" value="≤3人团队" />
        <Summary label="所选赛道" value={track} />
        <Summary label="材料完整度" value={`${uploaded}/${materials.length}`} />
      </div>
      <div className="review-note">
        系统将保留提交版本、生成审核记录，并通过短信和邮件同步后续结果。
      </div>
    </FormChapter>
  );
}

function FormChapter({ title, desc, children }) {
  return (
    <div className="form-chapter">
      <div>
        <span className="chapter-label">Registration</span>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, placeholder, action, wide }) {
  return (
    <label className={wide ? "field wide" : "field"}>
      <span>{label}</span>
      <div>
        <input placeholder={placeholder} />
        {action && <button type="button">{action}</button>}
      </div>
    </label>
  );
}

function Summary({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PageHeader({ label, title, desc, action, onAction }) {
  return (
    <header className="page-header">
      <span>{label}</span>
      <div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <button className="ghost-control" type="button" onClick={onAction}>
        {action}
      </button>
    </header>
  );
}
