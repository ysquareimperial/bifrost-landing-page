// src/components/Layout.js
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const B = "https://bifrostwallet.com";
const A = {
  logo: `${B}/static/a3e6e713e0a3afd8fd9c53e2f306beb0/80408/Logo.png`,
};

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isSupportPage = location.pathname === "/support";

  return (
    <div className="bifrost-layout">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&display=swap');

        *, *::before, *::after { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }

        .bifrost-layout {
          font-size: 22px;
          font-family: 'DM Sans', sans-serif;
          color: #F8F8F8;
          background: #161420;
          min-height: 100vh;
        }

        /* ── HEADER ── */
        .header-container {
          width: 100%;
          height: 3.2rem;
          background: #161420e0;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .header-container > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 6rem;
          height: 100%;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo-container img {
          height: 32px;
          display: block;
        }

        #menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .menu-item {
          font-size: 0.9167rem;
        }

        .menu-item span.text a {
          opacity: 0.7;
          transition: opacity 0.2s ease-in-out;
          cursor: pointer;
          color: #F8F8F8;
          text-decoration: none;
        }

        .menu-item span.text a:hover {
          opacity: 1;
        }

        .menu-item span.text a.active {
          opacity: 1;
          color: #9d8df5;
        }

        /* ── BUTTON ── */
        .button {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          border: none;
          outline: none;
          font-size: .825rem;
          color: white;
          padding: .5rem 1.4rem;
          border-radius: 100px;
          background: transparent linear-gradient(88deg,#7656EE 0%,#4961EA 100%) 0% 0% no-repeat padding-box;
          cursor: pointer;
          line-height: 1.4;
          overflow: hidden;
          text-decoration: none;
        }

        .button span {
          position: relative;
          z-index: 100;
        }

        .button .overlay {
          border-radius: 100px;
          z-index: 50;
          background: transparent linear-gradient(88deg,#614ac5 0%,#3f52c2 100%) 0% 0% no-repeat padding-box;
          transition: opacity 0.2s ease-in-out 0s;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }

        .button:hover .overlay {
          opacity: 1;
        }

        /* ── MOBILE MENU ── */
        #mobile-menu-toggle {
          width: 24px;
          display: none;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
        }

        #mobile-menu-toggle > div {
          height: 2px;
          width: 100%;
          border-radius: 3px;
          background: white;
        }

        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 1.2rem;
          position: fixed;
          top: 3.2rem;
          left: 0;
          right: 0;
          background: rgba(22, 20, 32, 0.97);
          backdrop-filter: blur(10px);
          padding: 1.5rem 2rem;
          z-index: 999;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .mobile-nav.open {
          display: flex;
        }

        .mobile-nav a {
          font-size: 1rem;
          opacity: 0.8;
          cursor: pointer;
          color: #F8F8F8;
          text-decoration: none;
        }

        .mobile-nav a.active {
          opacity: 1;
          color: #9d8df5;
        }

        /* ── PAGE CONTENT ── */
        .page-content {
          padding-top: 3.2rem;
        }

        /* ── RESPONSIVE ── */
        @media screen and (max-width: 1100px) {
          .bifrost-layout { font-size: 18.5px; }
          #menu { display: none; }
          #mobile-menu-toggle { display: flex; }
          .header-container > div { padding: 0 1.4rem; }
        }
      `}</style>

      {/* ─── HEADER ─── */}
      <div className="header-container">
        <div>
          <div className="logo-container">
            <a href="/">
              <img src={A.logo} alt="Bifrost Wallet logo" />
            </a>
          </div>

          <div id="menu">
            <div className="menu-item">
              <span className="text">
                <a href="/security/">Security</a>
              </span>
            </div>
            <div className="menu-item">
              <span className="text">
                <a href="/blog/">Blog</a>
              </span>
            </div>
            <div className="menu-item">
              <span className="text">
                <a 
                  onClick={() => navigate("/support")}
                  className={isSupportPage ? "active" : ""}
                >
                  Support
                </a>
              </span>
            </div>
            <div className="menu-item">
              <a className="button" href="#download-app">
                <span>Download</span>
                <div className="overlay" />
              </a>
            </div>
          </div>

          <div
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
        <a href="/security/">Security</a>
        <a href="/blog/">Blog</a>
        <a 
          onClick={() => {
            navigate("/support");
            setMobileOpen(false);
          }}
          className={isSupportPage ? "active" : ""}
        >
          Support
        </a>
        <a
          className="button"
          href="#download-app"
          style={{ width: "fit-content" }}
          onClick={() => setMobileOpen(false)}
        >
          <span>Download</span>
          <div className="overlay" />
        </a>
      </div>

      {/* Page Content */}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}