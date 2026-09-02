import React, { useEffect, useState } from "react";
import { navItems } from "../data/content.js";

export function Shell({ activeView, onNavigate, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 36);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [activeView]);

  const navigate = (view) => {
    onNavigate(view);
    setMenuOpen(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <div className={activeView === "portal" ? "prototype-shell web-shell-fixed" : "prototype-shell"}>
      <header className={activeView === "portal" && !scrolled && !menuOpen ? "topbar topbar-transparent" : "topbar topbar-solid"}>
        <button className="brand-lockup" type="button" onClick={() => navigate("portal")} aria-label="返回OPC首页">
          <span className="brand-symbol wordmark-symbol" aria-hidden="true">
            <span>OPC</span>
            <i />
          </span>
          <span className="brand-copy">
            <strong>OPC大赛报名通道</strong>
            <small>AI一人公司 · 综艺创业赛</small>
          </span>
        </button>

        <nav className={menuOpen ? "nav-list open" : "nav-list"} aria-label="主导航">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeView === item.id ? "nav-link active" : "nav-link"}
              type="button"
              onClick={() => navigate(item.id)}
            >
              <span>{item.label}</span>
              <small>{item.meta}</small>
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <button className="text-control" type="button" onClick={() => navigate("workbench")}>
            查询进度
          </button>
          <button className="solid-control" type="button" onClick={() => navigate("register")}>
            立即报名
          </button>
          <button
            className={menuOpen ? "menu-button active" : "menu-button"}
            type="button"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}
