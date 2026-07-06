/**
 * Bifrost Wallet – pixel-perfect React clone
 * All CSS values lifted directly from the original styled-components source.
 * Base font-size: 22px (matches original html { font-size: 22px })
 * Layout: max-width 1400px, padding 0 6rem
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const B = "https://bifrostwallet.com";
const A = {
  logo: `${B}/static/a3e6e713e0a3afd8fd9c53e2f306beb0/80408/Logo.png`,
  screenshot: `${B}/static/81bf4e4737262ce9bcd544ae0e8e3e03/b65b9/MobileAppScreenshot.png`,
  apple: `${B}/static/c330ea0457c4f833af791a4fc9797908/90bbc/Apple.png`,
  appleH: `${B}/static/f88db11cfe111968c74b8fa5cdb2a8f8/90bbc/AppleHover.png`,
  google: `${B}/static/79c8a797d8ce2414fc8f686afbef7393/3994c/Google.png`,
  googleH: `${B}/static/17a9130ed89c5e97a2aebc98081ba334/3994c/GoogleHover.png`,
  ctrlCrypto: `${B}/static/c9758fc0ccc16c468b41a22273f186ce/8ad21/ControlYourCrypto.png`,
  dapp: `${B}/static/a87be36fcbb1ce21d11280c5bed08074/0ecf9/DappBrowser.png`,
  nfts: `${B}/static/f5be4778464820d1d55fff9f477b494c/c9f5d/StoreYourNFTs.png`,
  safe: `${B}/static/d02e632a830d05591e01a006ecd1dc4c/0c9c7/Safe.png`,
  ytPoster: `${B}/static/09261aba5d281644f6c154540a896603/9ef85/YoutubePoster.png`,
  ytHover: `${B}/static/a8d392047a638b3783420ca3c56e9769/9ef85/YoutubePosterHover.png`,
  dlApp: `${B}/static/44d6918af095cb083a9c8e1a6dc41acf/560ae/DownloadApp.png`,
  starBlue: `${B}/static/e4f1155fadf86a34547e4a261fe648de/f41d4/StarBlue.png`,
  starWhite: `${B}/static/5ae5a88f89ceebfb43bfb93218f245c3/d6284/StarWhite.png`,
  starPurple: `${B}/static/319179c3cedcd231b13767bf552fc09f/58f33/StarPurple.png`,
  ratingStar: `${B}/static/75441ba6daea4b9bf0115fbf28c3b371/52383/RatingStar.png`,
  linkIcon: `${B}/static/21c7a056a74ce640e659c3e14c5ec209/1e33b/LinkIcon.png`,
  iconX: `${B}/static/ab9e1d57723be8c09efd53ceddf666c9/5861f/X.png`,
  iconYT: `${B}/static/dd25e940fa29e5038b03d3af451a42db/5861f/Youtube.png`,
  iconReddit: `${B}/static/ed56638d1ef2e6de20a1e403476a41eb/5861f/Reddit.png`,
  iconTG: `${B}/static/9b894baf93d520ea4556eb0534846028/5861f/Telegram.png`,
  FLR: `${B}/static/64161cb3531348b131172350fd2345e3/a7be2/FLR.png`,
  SGB: `${B}/static/ac338bda208c6f30649799f7652fa158/a7be2/SGB.png`,
  BNB: `${B}/static/6bf0b2da180ff13c6748efc3ed58f7c8/a7be2/BNB.png`,
  XRP: `${B}/static/950038a227bbcfa096229d7dbae33cbe/a7be2/XRP.png`,
  MATIC: `${B}/static/0ea644df4bbd971d0b23e590c9b18012/a7be2/Matic.png`,
  LTC: `${B}/static/d847d9512d59fdcb2a4d6efc81ddc9c9/a7be2/LTC.png`,
  DOGE: `${B}/static/0b9d1ac55b40afbefd99a5992f86fa37/a7be2/Doge.png`,
  ETH: `${B}/static/9f92a2c000cc83e0ba5e9abf7ac44d01/a7be2/ETH.png`,
  XDC: `${B}/static/f0785efc8ae4a3a521714b37b70f58e9/a7be2/XDC.png`,
  BTC: `${B}/static/abf743faa6fa8c8bbcd0117ae2bc5b47/a7be2/BTC.png`,
};

const reviews = [
  {
    title: "One of the best apps",
    body: "Arguably one of the best user focused wallets out there, works great with the Songbird network",
    name: "Joshed1991",
    date: "5 Nov",
  },
  {
    title: "Best products in this space",
    body: "So thankful for all of the efforts of you and the team. By far the best product experience in this space. Would happily pay for your apps. Would give 20 stars if I could!!!",
    name: "R.Meredith",
    date: "2 Dec",
  },
  {
    title: "Bifrost. User friendly.",
    body: "Top notch wallet, I consider myself a grandad in this space and found this wallet very easy to user. A very well done!",
    name: "Bryall22",
    date: "5 Jan",
  },
  {
    title: "Great app with user friendly interface",
    body: "The app is brilliant, very easy to use and easy to explain to someone who has little experience. Very easy to delegate too.",
    name: "Darren Pallatina",
    date: "31 Oct",
  },
  {
    title: "Proper Job!",
    body: "Well what else can I say. Well done Bifrost Wallet, easy to use. Top marks.",
    name: "Forrest Fenn",
    date: "10 Oct",
  },
  {
    title: "The Future is Here",
    body: "Putting the money system back in the hands of the people! Bifrost is doing a superb job advancing the goals of Web 3.0!",
    name: "ByThePeopleForThePeople",
    date: "23 Sep",
  },
];

/* Hover image swap helper */
function HImg({ src, hover, alt, style, className }) {
  const [h, setH] = useState(false);
  return (
    <img
      src={h && hover ? hover : src}
      alt={alt}
      style={style}
      className={className}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    />
  );
}

/* The purple gradient pill button */
function Btn({ href, children, style }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="button"
      style={style}
    >
      <span>{children}</span>
      <div className="overlay" />
    </a>
  );
}

/* Five rating stars */
function Stars() {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <img key={i} src={A.ratingStar} alt="★" width={22} height={21} />
      ))}
    </div>
  );
}

/* Review card */
function ReviewBox({ r }) {
  return (
    <div className="review-box">
      <Stars />
      <span className="h3 heading">{r.title}</span>
      <p>{r.body}</p>
      <div className="meta">
        <span className="name small">{r.name}</span>
        <span className="date small">{r.date}</span>
      </div>
    </div>
  );
}

/* Radial gradient helper */
function Grad({ color, pos, style }) {
  const colors = {
    purple: "rgba(118,86,238,.4)",
    blue: "rgba(73,97,234,.3)",
  };
  const positions = {
    tl: { top: 0, left: 0, transform: "translate(-60%,-60%)" },
    br: { top: 0, left: 0, transform: "translate(-30%,-60%)" },
    bl: { top: 0, left: 0, transform: "translate(-60%,-60%)" },
    tr: { top: 0, left: 0, transform: "translate(-30%,-60%)" },
  };
  return (
    <div
      style={{
        position: "absolute",
        height: 1,
        width: 1,
        opacity: 0.7,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          opacity: 0.7,
          background: `radial-gradient(circle closest-side,${colors[color]},rgba(0,0,0,0) 100%)`,
          backgroundRepeat: "no-repeat",
          width: 1500,
          height: 1500,
          ...positions[pos],
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────── */
export default function BifrostWallet() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [vidHover, setVidHover] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
      {/* ── GLOBAL CSS (matches original styled-components exactly) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&display=swap');

        /* Reset */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── GLOBALS from original <style data-styled> ── */
        html, body { max-width: 100%; overflow-x: hidden; }

        .bifrost-page {
          font-size: 22px;          /* original: html { font-size: 22px } */
          font-family: 'DM Sans', sans-serif;
          font-display: fallback;
          overflow-x: hidden;
          color: #F8F8F8;
          line-height: 1.4;
          font-weight: 400;
          background: #161420;      /* original: body { background: #161420 } */
        }

        .bifrost-page h1, .bifrost-page h2, .bifrost-page h3,
        .bifrost-page h4, .bifrost-page .heading {
          margin-top: 0;
          line-height: 1.2;
          margin-bottom: 1rem;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          display: block;
        }
        .bifrost-page h1           { font-size: 2.66rem; }
        .bifrost-page h1.page-title{ font-size: 3.5rem; }
        .bifrost-page h2           { font-size: 1.66rem; }
        .bifrost-page h3, .bifrost-page .h3 { font-size: 1.25rem; }
        .bifrost-page h4           { font-size: 1.167rem; }
        .bifrost-page p            { margin: 0 0 1.6rem 0; opacity: .7; }
        .bifrost-page p.small      { font-size: .9167rem; }
        .bifrost-page span.small   { font-size: .9167rem; }
        .bifrost-page a            { color: #F8F8F8; text-decoration: none; }
        .bifrost-page ul           { list-style: none; }

        /* ── BUTTON ── */
        .button {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          border: none; outline: none;
          font-size: .825rem;
          color: white;
          padding: .5rem 1.1rem;
          border-radius: 100px;
          background: transparent linear-gradient(88deg,#7656EE 0%,#4961EA 100%) 0% 0% no-repeat padding-box;
          cursor: pointer;
          line-height: 1;
          overflow: hidden;
          text-decoration: none;
        }
        .button span { position: relative; z-index: 100; }
        .button .overlay {
          border-radius: 100px; z-index: 50;
          background: transparent linear-gradient(88deg,#614ac5 0%,#3f52c2 100%) 0% 0% no-repeat padding-box;
          transition: opacity 0.2s ease-in-out 0s;
          opacity: 0;
          position: absolute; top: 0; left: 0; height: 100%; width: 100%;
        }
        .button:hover .overlay { opacity: 1; }
        .button .external-arrow {
          position: relative; top: -2px; left: 10px; z-index: 100;
        }

        /* ── HEADER ── */
        .header-container {
          width: 100%; height: 3.2rem;
          background: #161420e0;
          position: fixed; top: 0; left: 0; z-index: 10;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .header-container > div {
          display: flex; justify-content: space-between; align-items: center;
        }

        /* ── CONTENT WRAPPER ── */
        .cw-left, .cw-center {
          max-width: 1400px; width: 100%;
          margin: 0 auto; padding: 0 6rem; padding-top: 0;
          display: flex; min-height: 100%;
          z-index: 2; position: relative; box-sizing: border-box;
        }
        .cw-left   { justify-content: left; }
        .cw-center { justify-content: center; }

        /* ── MOBILE MENU TOGGLE ── */
        #mobile-menu-toggle {
          width: 20px; display: none; cursor: pointer;
        }
        #mobile-menu-toggle > div {
          height: 2px; width: 100%; margin-bottom: 5px;
          border-radius: 3px; background: white;
        }
        #mobile-menu-toggle > div:last-child { margin-bottom: 0; }

        /* ── LOGO CONTAINER ── */
        .logo-container { display: flex; align-items: center; }

        /* ── NAV MENU ── */
        #menu { display: flex; align-items: center; }
        .menu-item { font-size: 0.9167rem; margin: 0 0 0 1.8rem; }
        .menu-item span.text a { opacity: 0.7; transition: opacity 0.2s ease-in-out; }
        .menu-item span.text a:hover { opacity: 1; }
        .menu-item a { display: flex; margin: 0; }

        /* ── MOBILE DROPDOWN ── */
        .mobile-nav {
          display: none; flex-direction: column; gap: 1.2rem;
          position: fixed; top: 3.2rem; left: 0; right: 0;
          background: rgba(22,20,32,.97); backdrop-filter: blur(10px);
          padding: 1.5rem 2rem; z-index: 9;
        }
        .mobile-nav.open { display: flex; }
        .mobile-nav a { font-size: 1rem; opacity: .8; }

        /* ── BLOCK CONTAINERS ── */
        .block-container {
          position: relative; z-index: 1;
          display: flex; width: 100%;
          justify-content: space-between;
          box-sizing: border-box; align-items: center;
        }
        .block-container.full-vh   { min-height: calc(100vh); padding: 3.6rem 0 3.6rem; }
        .block-container.auto      { min-height: auto; padding: 0; }
        .block-container.padded    { min-height: auto; padding: 3.6rem 0 3.6rem; }

        /* ── BLOCK CONTENT ── */
        .block-content {
          display: flex; flex-grow: 1; text-align: left;
          justify-content: center; padding: 0; box-sizing: border-box;
          overflow: initial; border-top: none; border-bottom: none;
        }

        /* ── HOVER IMAGE LINK ── */
        .hover-img-link { margin: 1.4rem 0; display: inline-block; position: relative; }
        .hover-img-link .default-logo { transition: opacity 0.2s ease-in-out; }
        .hover-img-link .hover-logo {
          opacity: 0; position: absolute; top: 0; left: 0;
          transition: opacity 0.2s ease-in-out;
        }
        .hover-img-link:hover .default-logo { opacity: 0; }
        .hover-img-link:hover .hover-logo   { opacity: 1; }

        /* ── GRADIENT WAPPER ── */
        .grad-wrapper { position: relative; }

        /* ── SPLIT FLEX BOX ── */
        .split-flex {
          display: flex; justify-content: space-between;
          flex-grow: 1; align-items: center;
        }
        .split-flex > * { width: 50%; }

        .split-flex-auto {
          display: flex; justify-content: space-between;
          flex-grow: 1; align-items: auto;
        }
        .split-flex-auto > * { width: 50%; }

        /* ── SMALL CONTENT BOX ── */
        .small-content-box {
          max-width: 42rem; align-items: center;
        }
        .small-content-box h3, .small-content-box .h3 { margin: 0; }
        .small-content-box p   { margin: 1.8rem 0; }
        .small-content-box .image-container { width: 42%; }

        /* ── DECOR STARS ── */
        .decor-container { position: relative; }
        .decor-container .anchor {
          width: 1px; height: 1px;
          position: absolute; top: 50%; left: 50%;
        }
        .decor-container .star { position: absolute; }

        /* ── APP BUTTONS ── */
        .app-buttons { }
        .app-buttons a { margin-right: 1rem; margin-bottom: .5rem; }

        /* ── REVIEW BOX ── */
        .review-box {
          border-radius: 12px; padding: 1rem;
          box-sizing: border-box; text-align: left !important;
          background: rgb(43 44 54 / 40%);
          margin-bottom: 1rem;
        }
        .review-box .stars       { margin-bottom: .4rem; }
        .review-box .stars > img { margin-right: .2rem; }
        .review-box p            { opacity: 1; }
        .review-box .meta {
          display: flex; justify-content: space-between; opacity: .7;
        }

        /* ── SAFE SECTION ── */
        .safe-container {
          position: relative; display: flex; text-align: right;
          border-radius: 10px; padding: 2.2rem 2rem;
          box-sizing: border-box; width: 100%;
          background: rgb(32 30 42 / 60%); overflow: hidden;
        }
        .safe-container div.vertical {
          position: relative; z-index: 10; width: 70%;
          display: inline-flex; flex-direction: column;
          align-items: flex-start; text-align: left; flex: 1;
        }
        .safe-container div.desktop-image-container {
          width: 40%; display: flex; align-items: center;
        }
        .safe-container div.desktop-image-container img {
          transform: scale(1.4) translate(-6%, 1%);
        }
        .safe-gradient-bl {
          position: absolute; width: 500px; height: 500px;
          bottom: -43%; left: -13%;
          background: radial-gradient(circle closest-side,rgba(73,97,234,0.3),rgba(0,0,0,0) 100%);
        }
        .safe-gradient-tr {
          position: absolute; width: 650px; height: 650px;
          top: -80%; right: -15%;
          background: radial-gradient(circle closest-side,rgba(118,86,238,0.4),rgba(0,0,0,0) 100%);
          opacity: 0.7;
        }

        /* ── DOWNLOAD APP SECTION ── */
        .dl-container {
          position: relative; display: flex; text-align: right;
          border-radius: 10px; padding: 3rem 2rem;
          box-sizing: border-box; width: 100%;
          background: rgb(32 30 42 / 60%); overflow: hidden;
        }
        .dl-container div.vertical {
          position: relative; z-index: 10; width: 70%;
          display: inline-flex; flex-direction: column;
          align-items: flex-start; text-align: left; flex: 1;
          padding-left: 4rem;
        }
        .dl-container div.vertical h1 { margin-bottom: 0.3rem; }
        .dl-container div.image-container {
          position: absolute; top: -18%; width: 34%; right: 14%; z-index: 20;
        }
        .dl-gradient-bl {
          position: absolute; width: 500px; height: 500px;
          bottom: -43%; left: -13%;
          background: radial-gradient(circle closest-side,rgba(73,97,234,0.3),rgba(0,0,0,0) 100%);
        }
        .dl-gradient-tr {
          position: absolute; width: 650px; height: 650px;
          top: -58%; right: -2%;
          background: radial-gradient(circle closest-side,rgba(118,86,238,0.4),rgba(0,0,0,0) 100%);
          opacity: 0.7;
        }

        /* ── VIDEO CONTAINER ── */
        .video-container {
          width: 100%; margin-top: 2rem;
          border-radius: 30px; overflow: hidden;
          aspect-ratio: 16 / 9;
        }
        .video-target {
          position: relative; cursor: pointer;
          width: 100%; height: 100%;
        }
        .video-target .video-thumbnail { z-index: 10; transition: opacity 0.2s ease-in-out; }
        .video-target:hover .video-thumbnail { opacity: 0; }
        .video-target .video-thumbnail-hover { position: absolute; top: 0; left: 0; }
        .video-target iframe {
          aspect-ratio: 16 / 9; outline: none; border-radius: 16px;
          position: absolute; top: 0; left: 0;
          display: block; border: none; z-index: 1; width: 100%; height: 100%;
        }
        .video-play-btn {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20; width: 70px; height: 70px;
          background: rgba(118,86,238,0.85); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }

        /* ── PAGES: HERO ── */
        .page-header .screenshot {
          text-align: right; padding: 4rem; padding-right: 0;
          flex: 0.8; box-sizing: border-box;
        }
        .page-header .vertical {
          max-width: 25rem; margin-right: 3rem; padding-right: 1rem; flex: 1;
        }

        /* ── PAGES: STATISTICS ── */
        .statistics-container {
          flex: 1; display: flex; justify-content: center; align-items: center;
        }
        .statistics-container .border {
          border-left: 1px solid; border-right: 1px solid;
          border-color: #333e8d; height: 60%;
        }
        .statistic { padding: 2rem; margin: 0.8rem; text-align: center; }
        .statistic .count { font-size: 3.75rem; line-height: 3.5rem; font-weight: 400; }
        .statistic .name  { margin-top: 1rem; opacity: 0.7; }

        /* ── PAGES: REVIEWS ── */
        .reviews-container {
          display: flex; flex-direction: column; align-items: center;
        }
        .reviews-container > h1, .reviews-container > p { text-align: center; }
        .reviews-container h1 { margin-bottom: 0; }
        .review-list {
          display: flex; flex-wrap: wrap; align-items: flex-start; margin-top: 3rem;
        }
        .review-column { width: 50%; padding: 0 0.5rem; box-sizing: border-box; }

        /* ── PAGES: CRYPTO COLLECTION ── */
        .crypto-collection { text-align: center; }
        .asset-icon-container > div { margin-bottom: 1.6rem; }
        .asset-icon-container > div > div,
        .asset-icon-container > div > span { margin: 0 0.8rem; }

        /* ── FOOTER ── */
        .footer-container { background-color: #201e2a; font-size: 0.834rem; }
        .footer-container > div > div > div { display: block; }
        .footer-grid {
          display: flex; flex-grow: 1;
        }
        .footer-grid > div { padding: 2rem 0 0.5rem; min-width: 9rem; }
        .footer-grid > div:first-child { flex: 1; padding-right: 3rem; }
        .footer-grid > div:first-child p { max-width: 514px; margin-bottom: 1.5rem; }
        .footer-grid > div:last-child > a { margin: 0 0.8rem 0.3rem 0; }
        .footer-grid ul { list-style: none; margin: 0; padding: 0; }
        .footer-grid ul li { margin-bottom: 0.5rem; }
        .footer-grid p  { opacity: 0.7; }
        .footer-grid p.tag { opacity: 0.2; }
        .footer-grid a  { opacity: 0.7; }
        .footer-grid a:hover { opacity: 1 !important; }

        /* ── RESPONSIVE 1300px ── */
        @media screen and (max-width: 1300px) {
          .bifrost-page { font-size: 20px; }
          #menu { display: none; }
          #mobile-menu-toggle { display: block; }
          .button { font-size: 1.1rem; }
          .footer-grid > div { padding-left: 0.5rem; padding-right: 0.5rem; }
        }

        /* ── RESPONSIVE 1100px ── */
        @media screen and (max-width: 1100px) {
          .bifrost-page { font-size: 18.5px; }
          #menu { display: none; }
          #mobile-menu-toggle { display: block; }
          .button { font-size: 1rem; }
          .bifrost-page h1 { font-size: 1.7rem; }
          .bifrost-page h1.page-title { font-size: 1.7rem; }
          .bifrost-page h2 { font-size: 1.3rem; }
          .bifrost-page h3, .bifrost-page .h3 { font-size: 1.1rem; }
          .cw-left, .cw-center { padding: 0 1.4rem; padding-top: 0; }
          .split-flex, .split-flex-auto {
            flex-direction: column; justify-content: center;
          }
          .split-flex > *, .split-flex-auto > * { width: 100%; }
          .small-content-box { text-align: center; }
          .small-content-box .image-container { order: 1; width: 84%; margin: 0 0 3rem 0; }
          .small-content-box .text-container  { order: 2; }
          .page-header .vertical {
            text-align: center; padding: 3rem 0 0 0 !important; margin: 0;
          }
          .page-header .screenshot { padding: 2.4rem 1.3rem; flex: 1; }
          .statistics-container { margin: 1rem 0; }
          .statistic { font-size: 0.8rem; padding: 0.5rem; margin: 0.2rem; flex: 1; }
          .statistic:first-child { margin-left: 0; padding-left: 0; }
          .statistic:last-child  { margin-right: 0; padding-right: 0; }
          .statistic .count { font-size: 1.7rem; line-height: 1.8rem; }
          .statistic .name  { font-size: 0.75rem; }
          .review-list { margin-top: 1rem; }
          .review-column { width: 100%; padding: 0; }
          .asset-icon-container { margin-bottom: 3rem; }
          .asset-icon-container > div { margin-bottom: 1.2rem; }
          .asset-icon-container > div > div { margin: 0 0.6rem; }
          .asset-icon-container > div > div:first-child { margin-left: 0; }
          .asset-icon-container > div > div:last-child  { margin-right: 0; }
          .reviews-container h1 { margin-bottom: 1rem; }
          .safe-container {
            flex-direction: column; text-align: center; padding: 1.8rem 1.5rem;
          }
          .safe-container div.vertical { width: 100%; text-align: center; }
          .safe-container div.vertical > a { margin: 1rem auto 1rem; }
          .safe-container div.desktop-image-container { display: none; }
          .dl-container { padding: 3rem 1rem; }
          .dl-container div.image-container { display: none; }
          .dl-container div.vertical {
            display: block; width: 100%; text-align: center; padding: 0;
          }
          .dl-container div.vertical h1 { margin-bottom: 1.2rem !important; }
          .dl-container div.vertical p  { margin-bottom: 2.2rem !important; }
          .footer-grid { flex-direction: column; }
          .footer-grid > div { margin: 2rem 0 0; padding: 0; }
          .footer-grid > div:first-child { padding-right: 0; }
          .footer-grid > div:last-child  { margin-bottom: 2rem; }
          .app-buttons a { margin: 0; }
          .app-buttons a:nth-child(1) { margin-right: 0.35rem; }
          .app-buttons a:nth-child(2) { margin-left: 0.35rem; }
        }
      `}</style>

      <div className="bifrost-page">
        {/* ─── HEADER ─── */}
       

        {/* Mobile nav */}
      

        {/* ─── HERO (gradient + block) ─── */}
        <div className="grad-wrapper" style={{ paddingTop: "3.2rem" }}>
          {/* top-left purple radial */}
          <div
            style={{
              height: 1,
              width: 1,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.7,
                background:
                  "radial-gradient(circle closest-side,rgba(118,86,238,.4),rgba(0,0,0,0) 100%)",
                backgroundRepeat: "no-repeat",
                width: 1500,
                height: 1500,
                transform: "translate(-60%,-60%)",
              }}
            />
          </div>

          <div className="block-container full-vh content-block">
            <div className="cw-left">
              <div className="block-content">
                <div className="split-flex page-header">
                  {/* Left: text */}
                  <div className="vertical">
                    {/* Decorative stars */}
                    <div className="decor-container">
                      <div
                        className="anchor"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                        }}
                      >
                        <div
                          className="star"
                          style={{
                            height: 25,
                            width: 25,
                            top: -110,
                            left: -300,
                          }}
                        >
                          <img src={A.starBlue} alt="Star" width={25} />
                        </div>
                        <div
                          className="star"
                          style={{
                            height: 15,
                            width: 15,
                            top: -130,
                            left: 190,
                          }}
                        >
                          <img src={A.starWhite} alt="Star" width={15} />
                        </div>
                        <div
                          className="star"
                          style={{ height: 11, width: 11, top: 74, left: -170 }}
                        >
                          <img src={A.starWhite} alt="Star" width={11} />
                        </div>
                        <div
                          className="star"
                          style={{ height: 22, width: 22, top: 90, left: 280 }}
                        >
                          <img src={A.starPurple} alt="Star" width={22} />
                        </div>
                      </div>
                      <h1 style={{ margin: 0 }}>A true multi-chain wallet.</h1>
                    </div>

                    <p style={{ margin: "1.8rem 0" }}>
                      Have full control over your crypto tokens with a self
                      custody wallet, NFT gallery and Web3 browser all in one
                      simple and secure app.
                    </p>

                    <div className="app-buttons">
                      <a
                        href="https://apps.apple.com/gb/app/bifrost-wallet/id1577198351"
                        target="_blank"
                        rel="noreferrer"
                        className="hover-img-link"
                      >
                        <img
                          src={A.apple}
                          alt="Download on App Store"
                          className="default-logo"
                          style={{ display: "block" }}
                        />
                        <img
                          src={A.appleH}
                          alt="Download on App Store"
                          className="hover-logo"
                          style={{ display: "block" }}
                        />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.bifrostwallet.app&hl=en_GB&gl=US"
                        target="_blank"
                        rel="noreferrer"
                        className="hover-img-link"
                      >
                        <img
                          src={A.google}
                          alt="Get it on Google Play"
                          className="default-logo"
                          style={{ display: "block" }}
                        />
                        <img
                          src={A.googleH}
                          alt="Get it on Google Play"
                          className="hover-logo"
                          style={{ display: "block" }}
                        />
                      </a>
                    </div>
                  </div>

                  {/* Right: app screenshot */}
                  <div className="screenshot">
                    <img
                      src={A.screenshot}
                      alt="Screenshot from the Bifrost Wallet mobile application."
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        display: "inline-block",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom-right blue radial */}
          <div
            style={{
              height: 1,
              width: 1,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.7,
                background:
                  "radial-gradient(circle closest-side,rgba(73,97,234,.3),rgba(0,0,0,0) 100%)",
                backgroundRepeat: "no-repeat",
                width: 1500,
                height: 1500,
                transform: "translate(-30%,-60%)",
              }}
            />
          </div>
        </div>

        {/* ─── STATS ─── */}
        <div className="block-container auto content-block">
          <div className="cw-left">
            <div className="block-content">
              <div className="statistics-container">
                <div className="statistic">
                  <div className="count heading">1,000+</div>
                  <div className="name">Assets</div>
                </div>
                <div className="border" />
                <div className="statistic">
                  <div className="count heading">14</div>
                  <div className="name">Blockchains</div>
                </div>
                <div className="border" />
                <div className="statistic">
                  <div className="count heading">250K+</div>
                  <div className="name">Installs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CONTROL YOUR CRYPTO ─── */}
        <div className="grad-wrapper">
          <div
            style={{
              height: 1,
              width: 1,
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.7,
                background:
                  "radial-gradient(circle closest-side,rgba(118,86,238,.4),rgba(0,0,0,0) 100%)",
                backgroundRepeat: "no-repeat",
                width: 1500,
                height: 1500,
                transform: "translate(-60%,-60%)",
              }}
            />
          </div>
          <div className="block-container padded content-block">
            <div className="cw-center">
              <div className="block-content">
                <div className="split-flex-auto small-content-box">
                  <div className="text-container">
                    <h2>Control your Crypto</h2>
                    <p>
                      Bifrost Wallet is a self custody cypto wallet, with you in
                      complete control of your crypto tokens, keys and data.
                    </p>
                    <a
                      href="https://support.bifrostwallet.com/en/articles/6877393-the-importance-of-self-custody"
                      target="_blank"
                      rel="noreferrer"
                      className="button"
                    >
                      <span>More on self custody</span>
                      <img
                        src={A.linkIcon}
                        alt=""
                        className="external-arrow"
                        style={{ width: 18, height: 18 }}
                      />
                      <div className="overlay" />
                    </a>
                  </div>
                  <div className="image-container">
                    <img
                      src={A.ctrlCrypto}
                      alt="Bifrost Wallet supports many crypto-currencies including Bitcoin, Ethereum and Songbird."
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BROWSER FOR DAPPS ─── */}
        <div className="block-container padded content-block">
          <div className="cw-left">
            <div className="block-content">
              <div className="split-flex-auto small-content-box">
                <div className="image-container">
                  <img
                    src={A.dapp}
                    alt="Dapp Browser supported applications"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="text-container">
                  <h2>Browser for Dapps</h2>
                  <p>
                    Access to staking, swaps and more. Discover and use any Web3
                    application such as Uniswap, Compound and Flarefarm.
                  </p>
                  <a
                    href="https://support.bifrostwallet.com/en/articles/6877428-browse-and-access-decentralized-applications-dapps"
                    target="_blank"
                    rel="noreferrer"
                    className="button"
                  >
                    <span>Dapps in Bifrost Wallet</span>
                    <img
                      src={A.linkIcon}
                      alt=""
                      className="external-arrow"
                      style={{ width: 18, height: 18 }}
                    />
                    <div className="overlay" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── STORE YOUR NFTS ─── */}
        <div className="grad-wrapper">
          <div className="block-container padded content-block">
            <div className="cw-left">
              <div className="block-content">
                <div className="split-flex-auto small-content-box">
                  <div className="text-container">
                    <h2>Store your NFTs</h2>
                    <p>
                      Securely store and easily view your rare NFTs from games,
                      artists and beyond within the Bifrost app.
                    </p>
                    <a
                      href="https://support.bifrostwallet.com/en/articles/6872887-manage-your-nfts"
                      target="_blank"
                      rel="noreferrer"
                      className="button"
                    >
                      <span>Wallet for NFTs</span>
                      <img
                        src={A.linkIcon}
                        alt=""
                        className="external-arrow"
                        style={{ width: 18, height: 18 }}
                      />
                      <div className="overlay" />
                    </a>
                  </div>
                  <div className="image-container">
                    <img
                      src={A.nfts}
                      alt="NFT storage within the Bifrost app"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: 1,
              width: 1,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.7,
                background:
                  "radial-gradient(circle closest-side,rgba(118,86,238,.4),rgba(0,0,0,0) 100%)",
                backgroundRepeat: "no-repeat",
                width: 1500,
                height: 1500,
                transform: "translate(-30%,-60%)",
              }}
            />
          </div>
        </div>

        {/* ─── SAFE / SECURITY ─── */}
        <div className="block-container padded content-block">
          <div className="cw-left">
            <div className="block-content">
              <div className="safe-container">
                <div className="safe-gradient-bl" />
                <div className="desktop-image-container">
                  <img
                    src={A.safe}
                    alt="Bifrost Wallet Security"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="vertical">
                  <h2>
                    Find out what we do to make your crypto self custody more
                    secure
                  </h2>
                  <p>
                    From removing personal data tracking to presenting clear
                    transaction details, we take great care in making sure your
                    security and privacy are well protected.
                  </p>
                  <a className="button" href="/security/">
                    <span>More on security</span>
                    <div className="overlay" />
                  </a>
                </div>
                <div className="safe-gradient-tr" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── WHAT IS BIFROST WALLET (VIDEO) ─── */}
        <div className="block-container padded content-block">
          <div className="cw-left">
            <div className="block-content">
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  maxWidth: "42rem",
                }}
              >
                <h1>What is Bifrost Wallet?</h1>
                <div className="video-container">
                  <div
                    className="video-target"
                    onMouseEnter={() => setVidHover(true)}
                    onMouseLeave={() => setVidHover(false)}
                    onClick={() => setPlaying(true)}
                  >
                    {!playing && (
                      <>
                        <img
                          src={vidHover ? A.ytHover : A.ytPoster}
                          className="video-thumbnail"
                          alt=""
                          style={{ width: "100%", display: "block" }}
                        />
                        <div className="video-play-btn">
                          <svg
                            width={28}
                            height={28}
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </>
                    )}
                    {playing && (
                      <iframe
                        title="Video about the Bifrost Wallet"
                        src="https://www.youtube.com/embed/bifrostwallet?autoplay=1"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── MORE CHAINS, MORE TOKENS ─── */}
        <div className="grad-wrapper">
          <div
            style={{
              height: 1,
              width: 1,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.7,
                background:
                  "radial-gradient(circle closest-side,rgba(118,86,238,.4),rgba(0,0,0,0) 100%)",
                backgroundRepeat: "no-repeat",
                width: 1500,
                height: 1500,
                transform: "translate(-60%,-60%)",
              }}
            />
          </div>
          <div className="block-container padded content-block">
            <div className="cw-left">
              <div className="block-content">
                <div className="crypto-collection" style={{ width: "100%" }}>
                  <h1>More chains, more tokens</h1>
                  <p>
                    Store your favourite tokens like Flare, Songbird and
                    Ethereum securely.
                  </p>
                  <div className="asset-icon-container">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {["FLR", "SGB"].map((s) => (
                        <div key={s}>
                          <img src={A[s]} alt={s} width={64} height={64} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {["BNB", "XRP", "MATIC", "LTC", "DOGE"].map((s) =>
                        s === "DOGE" ? (
                          <span key={s}>
                            <img src={A[s]} alt={s} width={64} height={64} />
                          </span>
                        ) : (
                          <div key={s}>
                            <img src={A[s]} alt={s} width={64} height={64} />
                          </div>
                        ),
                      )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {["ETH", "XDC", "BTC"].map((s) => (
                        <div key={s}>
                          <img src={A[s]} alt={s} width={64} height={64} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <a className="button" href="/supported-assets/">
                    <span>See all supported tokens</span>
                    <div className="overlay" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TRUSTED & LOVED ─── */}
        <div className="grad-wrapper">
          <div
            style={{
              height: 1,
              width: 1,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.7,
                background:
                  "radial-gradient(circle closest-side,rgba(73,97,234,.3),rgba(0,0,0,0) 100%)",
                backgroundRepeat: "no-repeat",
                width: 1500,
                height: 1500,
                transform: "translate(-30%,-60%)",
              }}
            />
          </div>
          <div className="block-container padded content-block">
            <div className="cw-left">
              <div className="block-content">
                <div className="reviews-container" style={{ width: "100%" }}>
                  <h1>Trusted &amp; loved</h1>
                  <p>See what people have said about Bifrost Wallet.</p>
                  <div className="review-list" style={{ width: "100%" }}>
                    <div className="review-column">
                      {reviews.slice(0, 3).map((r, i) => (
                        <ReviewBox key={i} r={r} />
                      ))}
                    </div>
                    <div className="review-column">
                      {reviews.slice(3, 6).map((r, i) => (
                        <ReviewBox key={i} r={r} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── DOWNLOAD APP ─── */}
        <div id="download-app" />
        <div className="block-container padded content-block">
          <div className="cw-left">
            <div className="block-content">
              <div className="dl-container">
                <div className="dl-gradient-bl" />
                <div className="image-container">
                  <img
                    src={A.dlApp}
                    alt="Download Bifrost Wallet"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div className="vertical">
                  <h1>Download app</h1>
                  <p style={{ marginBottom: ".2rem" }}>
                    Available on iOS and Android devices.
                  </p>
                  <div className="app-buttons-container">
                    <div className="app-buttons">
                      <a
                        href="https://apps.apple.com/gb/app/bifrost-wallet/id1577198351"
                        target="_blank"
                        rel="noreferrer"
                        className="hover-img-link"
                      >
                        <img
                          src={A.apple}
                          alt="Download on App Store"
                          className="default-logo"
                          style={{ display: "block" }}
                        />
                        <img
                          src={A.appleH}
                          alt="Download on App Store"
                          className="hover-logo"
                          style={{ display: "block" }}
                        />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.bifrostwallet.app&hl=en_GB&gl=US"
                        target="_blank"
                        rel="noreferrer"
                        className="hover-img-link"
                      >
                        <img
                          src={A.google}
                          alt="Get it on Google Play"
                          className="default-logo"
                          style={{ display: "block" }}
                        />
                        <img
                          src={A.googleH}
                          alt="Get it on Google Play"
                          className="hover-logo"
                          style={{ display: "block" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="dl-gradient-tr" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="footer-container">
          <div
            id="company-footer"
            className="block-container auto content-block"
          >
            <div className="cw-left">
              <div className="block-content">
                <div className="footer-grid">
                  <div>
                    <span className="h3 heading">Bifrost Wallet</span>
                    <p>
                      Have full control over your crypto tokens with a self
                      custody wallet, NFT gallery and Web3 browser all in one
                      simple and secure app. Supported blockchains include
                      Flare, Songbird, Ethereum, XRP, Polygon and many more.
                    </p>
                  </div>
                  <div>
                    <span
                      className="h4 heading"
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Company
                    </span>
                    <ul>
                      <li>
                        <a href="/security/">Security</a>
                      </li>
                      <li>
                        <a href="/blog/">Blog</a>
                      </li>
                      <li>
                        <a href="/supported-assets/">Supported Assets</a>
                      </li>
                      <li>
                        <a href="/media-kit/">Media Kit</a>
                      </li>
                      <li>
                        <a
                             onClick={() => navigate("/support")}
                        >
                          Support
                        </a>
                      </li>
                    </ul>
                    <br />
                    <span
                      className="h4 heading"
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Legal
                    </span>
                    <ul>
                      <li>
                        <a href="/legal/terms/">Terms of Use</a>
                      </li>
                      <li>
                        <a href="/legal/privacy/">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span
                      className="h4 heading"
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Assets
                    </span>
                    <ul>
                      {[
                        ["Flare", "flare"],
                        ["Ethereum", "ethereum"],
                        ["XRP", "xrp"],
                        ["Polygon", "polygon"],
                        ["Optimism", "optimism"],
                        ["BNB", "bnb"],
                        ["XDC Network", "xdc"],
                        ["Arbitrum", "arbitrum"],
                        ["Songbird", "songbird"],
                      ].map(([n, s]) => (
                        <li key={s}>
                          <a href={`/assets/${s}/`}>{n}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span
                      className="h4 heading"
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Social
                    </span>
                    <a
                      href="https://x.com/intent/user?screen_name=bifrostwallet"
                      target="_blank"
                      rel="noreferrer"
                      className="hover-img-link"
                      style={{ margin: "0 0.8rem 0.3rem 0" }}
                    >
                      <img
                        src={A.iconX}
                        alt="X"
                        width={50}
                        height={50}
                        className="default-logo"
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/@bifrostwalletcom?sub_confirmation=1"
                      target="_blank"
                      rel="noreferrer"
                      className="hover-img-link"
                      style={{ margin: "0 0.8rem 0.3rem 0" }}
                    >
                      <img
                        src={A.iconYT}
                        alt="YouTube"
                        width={50}
                        height={50}
                        className="default-logo"
                      />
                    </a>
                    <a
                      href="https://www.reddit.com/r/Bifrost/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover-img-link"
                      style={{ margin: "0 0.8rem 0.3rem 0" }}
                    >
                      <img
                        src={A.iconReddit}
                        alt="Reddit"
                        width={50}
                        height={50}
                        className="default-logo"
                      />
                    </a>
                    <a
                      href="https://t.me/bifrostwalletcom"
                      target="_blank"
                      rel="noreferrer"
                      className="hover-img-link"
                      style={{ margin: "0 0.8rem 0.3rem 0" }}
                    >
                      <img
                        src={A.iconTG}
                        alt="Telegram"
                        width={50}
                        height={50}
                        className="default-logo"
                      />
                    </a>
                  </div>
                </div>
                <p className="tag">© 2026 Bifrost Software Ltd</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
