import React from "react";
import { materials, tracks } from "../data/content.js";

export function H5Preview({ onNavigate }) {
  return (
    <main className="page-view h5-page">
      <header className="page-header">
        <span>Mobile</span>
        <div>
          <h1>H5 报名入口</h1>
          <p>为微信、短信、海报二维码预留的移动端体验，保持与网页同一套内容和状态。</p>
        </div>
        <button className="ghost-control" type="button" onClick={() => onNavigate("register")}>
          打开网页报名
        </button>
      </header>

      <section className="phone-stage">
        <div className="phone-shell">
          <div className="phone-status" />
          <div className="phone-screen">
            <span className="mobile-label">OPC 2026</span>
            <h2>一人公司报名入口</h2>
            <p>验证手机号后保存草稿，材料可分次补充。</p>
            <button type="button">立即报名</button>

            <div className="mobile-track-list">
              {tracks.slice(0, 4).map((track) => (
                <article key={track.code}>
                  <span>{track.code}</span>
                  <strong>{track.name}</strong>
                </article>
              ))}
            </div>

            <div className="mobile-materials">
              {materials.slice(0, 3).map((item) => (
                <div key={item.id}>
                  <span>{item.state}</span>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h5-notes">
          <h2>移动端重点</h2>
          <p>H5 保留高质感，但去掉重型 3D；首屏信息更短，操作更集中，适合微信内打开和海报二维码转化。</p>
          <ul>
            <li>手机号验证与草稿自动保存。</li>
            <li>材料上传状态同步网页端。</li>
            <li>报名编号可一键复制、截图分享。</li>
            <li>后续可封装为小程序 WebView。</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
