import React, { useState } from "react";
import { tracks } from "../data/content.js";

const trackImages = [
  "/assets/tracks/track-product.jpg",
  "/assets/tracks/track-stage.jpg",
  "/assets/tracks/track-media.jpg",
  "/assets/tracks/track-retail.jpg",
  "/assets/tracks/track-tour.jpg",
  "/assets/tracks/track-tech.jpg"
];

const notices = [
  {
    title: "江西省第二届高层次人才创新创业大赛报名公告",
    text: "OPC大赛报名通道已开放，参赛团队可在线提交主体信息、项目方案、路演材料与承诺文件。报名截止前，平台将持续同步材料规范、审核节奏与服务安排。",
    date: "2026.06.11",
    image: "/assets/jingdezhen-porcelain-dishes.jpg",
    tag: "赛事公告"
  }
];

const showcaseItems = [
  {
    title: "景德镇城市场景",
    text: "以御窑文化、文旅空间与产业服务为背景，为项目展示提供真实语境。",
    image: "/assets/jingdezhen-imperial-kiln.jpg",
    tag: "城市舞台"
  },
  {
    title: "路演与内容表达",
    text: "面向AI内容、文旅演艺、新媒体传播等项目，形成可展示、可传播的成果。",
    image: "/assets/tracks/track-stage.jpg",
    tag: "路演展示"
  },
  {
    title: "产业资源对接",
    text: "围绕产品设计、零售场景、数字科技服务，帮助优秀项目获得后续资源。",
    image: "/assets/tracks/track-retail.jpg",
    tag: "产业连接"
  }
];

const scheduleItems = [
  {
    date: "05.20",
    title: "报名启动",
    text: "统一入口开放，生成项目报名编号",
    detail: "参赛者可创建报名草稿，先完成账号验证和基础信息，再逐步补齐项目材料。",
    status: "已开放"
  },
  {
    date: "06.11",
    title: "公告发布",
    text: "材料规范、赛程节点与服务方式同步",
    detail: "平台将持续发布材料模板、常见问题、审核规则和系统服务时间。",
    status: "进行中"
  },
  {
    date: "08.15",
    title: "报名截止",
    text: "材料锁定，进入资格审核",
    detail: "截止后报名材料进入锁定状态，项目负责人可继续查看进度和通知。",
    status: "关键节点"
  },
  {
    date: "08.16",
    title: "资格审核",
    text: "审核结果通过系统、短信与邮件反馈",
    detail: "审核团队将围绕报名主体、项目方向、材料完整度进行集中确认。",
    status: "待开始"
  },
  {
    date: "09.10",
    title: "项目路演",
    text: "入围项目进行展示答辩与资源对接",
    detail: "入围项目进入展示环节，围绕项目价值、落地计划和资源需求进行路演。",
    status: "待开始"
  }
];

const newsItems = [
  {
    title: "景德镇将以瓷都产业场景承接AI创业项目路演",
    text: "赛事将结合景德镇城市文旅、内容生产和产业服务场景，开放项目展示窗口。",
    date: "2026.06.10",
    image: "/assets/jingdezhen-imperial-kiln.jpg"
  },
  {
    title: "大赛服务窗口上线，支持报名咨询与材料预审",
    text: "参赛者可通过报名通道查看材料要求、审核状态和退回意见。",
    date: "2026.06.08",
    image: "/assets/jingdezhen-porcelain-workshop.jpg"
  },
  {
    title: "六大赛道聚焦AI应用、文旅体验与数字科技",
    text: "赛道覆盖AI产品、文旅演艺、新媒体、新零售、文旅体验和数字科技。",
    date: "2026.06.02",
    image: "/assets/tracks/track-tour.jpg"
  },
  {
    title: "赛事报名系统支持草稿保存和审核进度查询",
    text: "系统支持分步填写、材料上传、草稿保存和站内通知。",
    date: "2026.05.28",
    image: "/assets/tracks/track-media.jpg"
  }
];

const faqItems = [
  {
    question: "报名需要准备哪些材料？",
    answer: "主体信息、项目方案、承诺书、路演或演示材料为基础材料，部分赛道可补充作品链接、商业计划书或演示视频。"
  },
  {
    question: "报名后还能修改材料吗？",
    answer: "报名截止前可保存草稿并补充材料；提交审核后如被退回，可按审核意见重新上传对应文件。"
  },
  {
    question: "可以同时报名多个赛道吗？",
    answer: "同一项目建议选择一个主赛道，组委会可根据项目实际方向进行复核与调整。"
  },
  {
    question: "如何查询审核进度？",
    answer: "提交后可通过报名编号进入参赛者中心，查看材料完整度、审核节点和退回意见。"
  }
];

const organizerGroups = [
  ["主办单位", ["江西省人力资源和社会保障厅", "江西省工业和信息化厅", "江西省商务厅"]],
  ["承办单位", ["景德镇市人力资源和社会保障局", "景德镇市工业和信息化局", "景德镇市商务局", "景德镇市高层次人才创新创业大赛组委会"]]
];

const supportUnits = ["各相关厅局、工信园区、商务服务机构", "江西省中小企业发展促进中心", "产业投资机构与创新服务平台"];

const trackCards = tracks.map((track, index) => ({ ...track, image: trackImages[index] }));

export function PublicPortal({ onNavigate }) {
  const [activeMediaTab, setActiveMediaTab] = useState("showcase");
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [activeSchedule, setActiveSchedule] = useState(2);
  const [activeNews, setActiveNews] = useState(0);

  const notice = notices[0];
  const schedule = scheduleItems[activeSchedule];
  return (
    <main className="portal-view jingdezhen-portal premium-portal web-fixed-layout">
      <section className="hero-section city-hero">
        <div className="city-hero-shade" />
        <div className="city-hero-inner">
          <div className="city-hero-copy">
            <span className="city-label">江西景德镇 · 千年瓷都</span>
            <h1>在景德镇，看见AI创业新可能</h1>
            <p>
              面向AI产品、文旅内容、数字科技等创新项目开放报名，
              提供赛事了解、材料提交、审核查询与移动传播的一站式入口。
            </p>
          </div>

          <aside className="city-hero-panel" aria-label="报名时间">
            <span>报名开放中</span>
            <strong>2026.05.20 - 2026.08.15</strong>
            <p>线上提交材料，审核状态实时更新。</p>
            <dl>
              <div>
                <dt>倒计时</dt>
                <dd>142 天</dd>
              </div>
              <div>
                <dt>当前阶段</dt>
                <dd>材料提交</dd>
              </div>
            </dl>
            <div className="hero-panel-actions">
              <button className="solid-control large" type="button" onClick={() => onNavigate("register")}>
                立即报名
              </button>
              <button className="ghost-control large" type="button" onClick={() => onNavigate("workbench")}>
                查询进度
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-block feature-pair-section" aria-label="赛事公告与大赛动态">
        <AnnouncementFeature notice={notice} onNavigate={onNavigate} />

        <MediaTabsFeature
          activeTab={activeMediaTab}
          onTabChange={setActiveMediaTab}
          showcaseItems={showcaseItems}
          newsItems={newsItems}
          activeShowcase={activeShowcase}
          activeNews={activeNews}
          onShowcaseSelect={setActiveShowcase}
          onNewsSelect={setActiveNews}
          onNavigate={onNavigate}
        />
      </section>

      <section className="section-block premium-schedule-section" aria-label="赛程安排">
        <SectionTitle eyebrow="Timeline" title="赛程安排" text="节点可点击查看详情，从报名启动到项目路演，关键进度清晰可查。" />
        <div className="schedule-shell">
          <div className="premium-schedule" role="list">
            {scheduleItems.map((item, index) => (
              <button
                className={activeSchedule === index ? "is-active" : ""}
                type="button"
                key={item.title}
                onClick={() => setActiveSchedule(index)}
                role="listitem"
                aria-pressed={activeSchedule === index}
              >
                <time>{item.date}</time>
                <span>{item.status}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </button>
            ))}
          </div>

          <aside className="schedule-detail-card" aria-live="polite">
            <span>{schedule.status}</span>
            <strong>{schedule.date} · {schedule.title}</strong>
            <p>{schedule.detail}</p>
            <button type="button" onClick={() => onNavigate("register")}>查看报名要求</button>
          </aside>
        </div>

        <div className="schedule-axis" aria-hidden="true">
          {scheduleItems.map((item, index) => (
            <span className={activeSchedule === index ? "is-active" : ""} key={item.date}>
              <i />
              <time>{item.date}</time>
            </span>
          ))}
        </div>
      </section>

      <section className="section-block premium-tracks-section" aria-label="赛道设置">
        <SectionTitle eyebrow="Tracks" title="赛道设置" text="六大方向聚焦真实应用场景，参赛团队可按项目特点选择报名。" />
        <div className="premium-track-grid overlay-track-grid">
          {trackCards.map((track) => (
            <button type="button" key={track.code} onClick={() => onNavigate("register")}>
              <img src={track.image} alt="" loading="eager" />
              <span>{track.code}</span>
              <strong>{track.name}</strong>
              <small>{track.summary}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block faq-wide-section" aria-label="常见问题">
        <FaqFeature onNavigate={onNavigate} />
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>OPC大赛报名通道</strong>
            <p>江西景德镇 AI一人公司 · 综艺创业赛报名服务平台</p>
          </div>

          <div className="footer-units">
            {organizerGroups.map(([title, units]) => (
              <div key={title}>
                <h3>{title}</h3>
                {units.map((unit) => (
                  <p key={unit}>{unit}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="footer-support">
            <h3>支持我们</h3>
            {supportUnits.map((unit) => (
              <p key={unit}>{unit}</p>
            ))}
            <button type="button" onClick={() => onNavigate("portal")}>合作联系</button>
          </div>

          <div className="footer-follow">
            <h3>关注我们</h3>
            <div className="qr-row">
              <div>
                <QrPattern />
                <span>公众号</span>
              </div>
              <div>
                <QrPattern />
                <span>视频号</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">江西省第二届高层次人才创新创业大赛 © 2026　赣ICP备10005259号-1</div>
      </footer>
    </main>
  );
}

function AnnouncementFeature({ notice, onNavigate }) {
  return (
    <EditorialFeature
      className="notice-panel"
      heading="赛事公告"
      eyebrow="ANNOUNCEMENT"
      item={notice}
      metaLabel="发布时间"
      metaValue={notice.date}
      buttonLabel="查看更多"
      onClick={() => onNavigate("register")}
    />
  );
}

function EditorialFeature({ heading, eyebrow, item, metaLabel, metaValue, buttonLabel, onClick, className = "" }) {
  return (
    <article className={`announcement-feature editorial-feature ${className}`.trim()}>
      <header className="announcement-heading">
        <h2>{heading}</h2>
        <span>{eyebrow}</span>
      </header>
      <figure>
        <img src={item.image} alt="" />
      </figure>
      <div className="announcement-body">
        <p className="announcement-time">
          {metaLabel}：<span className="announcement-meta-value">{metaValue}</span>
        </p>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <button type="button" onClick={onClick}>{buttonLabel}</button>
      </div>
    </article>
  );
}

function MediaTabsFeature({
  activeTab,
  onTabChange,
  showcaseItems,
  newsItems,
  activeShowcase,
  activeNews,
  onShowcaseSelect,
  onNewsSelect,
  onNavigate
}) {
  const tabConfig = {
    showcase: {
      label: "大赛展示",
      meta: "SHOWCASE",
      items: showcaseItems,
      activeIndex: activeShowcase,
      onSelect: onShowcaseSelect,
      moreLabel: "查看展示",
      target: "register"
    },
    news: {
      label: "赛事新闻",
      meta: "NEWS",
      items: newsItems,
      activeIndex: activeNews,
      onSelect: onNewsSelect,
      moreLabel: "查看更多",
      target: "portal"
    }
  };
  const current = tabConfig[activeTab];
  const activeItem = current.items[current.activeIndex] || current.items[0];
  const itemMeta = activeTab === "showcase" ? activeItem.tag : activeItem.date;

  return (
    <article className="media-tabs-feature">
      <header className="media-tabs-header">
        <div className="announcement-heading media-title-switch" role="tablist" aria-label="切换大赛动态">
          {Object.entries(tabConfig).map(([key, tab]) => (
            <button
              className={activeTab === key ? "is-active" : ""}
              type="button"
              key={key}
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => onTabChange(key)}
            >
              <h2>{tab.label}</h2>
            </button>
          ))}
          <em aria-hidden="true" key={current.meta}>{current.meta}</em>
        </div>
      </header>

      <div className="media-tabs-panel" role="tabpanel" aria-label={current.label}>
        <figure className="media-tabs-cover" key={`${activeTab}-${current.activeIndex}`}>
          <img src={activeItem.image} alt="" />
          <figcaption>
            <time>{itemMeta}</time>
            <strong>{activeItem.title}</strong>
            <p>{activeItem.text}</p>
          </figcaption>
        </figure>

        <div className="media-tabs-list" aria-label={`${current.label}列表`}>
          {current.items.map((item, index) => (
            <button
              className={current.activeIndex === index ? "is-active" : ""}
              type="button"
              key={item.title}
              aria-pressed={current.activeIndex === index}
              onMouseEnter={() => current.onSelect(index)}
              onFocus={() => current.onSelect(index)}
              onClick={() => current.onSelect(index)}
            >
              <time>{activeTab === "showcase" ? String(index + 1).padStart(2, "0") : item.date}</time>
              <span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      <button className="news-more-button media-tabs-more" type="button" onClick={() => onNavigate(current.target)}>
        {current.moreLabel}
      </button>
    </article>
  );
}

function FaqFeature({ onNavigate }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <article className="announcement-feature faq-feature">
      <header className="announcement-heading">
        <h2>常见问题</h2>
        <span>FAQ</span>
      </header>
      <div className="faq-editorial-panel">
        {faqItems.map((item, index) => (
          <div className={openIndex === index ? "faq-item is-open" : "faq-item"} key={item.question}>
            <button
              type="button"
              aria-expanded={openIndex === index}
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <i aria-hidden="true" />
            </button>
            <div className="faq-answer" aria-hidden={openIndex !== index}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => onNavigate("register")}>查看报名指南</button>
      </div>
    </article>
  );
}

function SectionTitle({ eyebrow, title, text, compact = false }) {
  return (
    <header className={compact ? "section-editorial-title compact" : "section-editorial-title"}>
      <div className="announcement-heading">
        <h2>{title}</h2>
        <span>{eyebrow}</span>
      </div>
      <p>{text}</p>
    </header>
  );
}

function QrPattern() {
  return (
    <div className="qr-pattern" aria-hidden="true">
      {Array.from({ length: 49 }, (_, index) => (
        <i key={index} className={index % 3 === 0 || index % 7 === 0 || [5, 8, 19, 23, 31, 38, 45].includes(index) ? "dark" : ""} />
      ))}
    </div>
  );
}
