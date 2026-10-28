import {
  ShieldCheck,
  Columns2,
  Bot,
  Lock,
  Cpu
} from 'lucide-react';

export default function TopBar({
  viewMode, // 'alice', 'bob', or 'split'
  onChangeViewMode,
  autoReplyEnabled,
  onToggleAutoReply,
  onOpenInspector
}) {
  return (
    <header className="app-top-nav">
      {/* Brand & Quantum Tag */}
      <div className="nav-brand-section">
        <div className="brand-logo-icon">
          <ShieldCheck size={22} className="shield-quantum" />
        </div>
        <div className="brand-text">
          <div className="brand-title">
            <span className="alice-text">Alice</span>
            <span className="exchange-arrow">⇄</span>
            <span className="bob-text">Bob</span>
          </div>
          <span className="brand-subtitle">
            <Cpu size={10} />
            Post-Quantum Cryptography Chat
          </span>
        </div>
      </div>

      {/* View Perspective Switcher & Controls */}
      <div className="nav-controls-section">
        {/* View Mode Selector */}
        <div className="view-mode-tabs">
          <button
            type="button"
            className={`view-tab-btn ${viewMode === 'alice' ? 'active-tab' : ''}`}
            onClick={() => onChangeViewMode('alice')}
            title="Chat as Alice"
          >
            <span className="tab-avatar">👩‍💻</span>
            <span className="tab-label">Alice's View</span>
          </button>

          <button
            type="button"
            className={`view-tab-btn ${viewMode === 'bob' ? 'active-tab' : ''}`}
            onClick={() => onChangeViewMode('bob')}
            title="Chat as Bob"
          >
            <span className="tab-avatar">👨‍💻</span>
            <span className="tab-label">Bob's View</span>
          </button>

          <button
            type="button"
            className={`view-tab-btn split-tab ${viewMode === 'split' ? 'active-tab' : ''}`}
            onClick={() => onChangeViewMode('split')}
            title="Side-by-side split screen showing both Alice and Bob"
          >
            <Columns2 size={15} />
            <span className="tab-label">Dual Split View</span>
          </button>
        </div>

        {/* Auto Reply Toggle */}
        <button
          type="button"
          className={`toggle-chip ${autoReplyEnabled ? 'chip-on' : 'chip-off'}`}
          onClick={onToggleAutoReply}
          title={
            autoReplyEnabled
              ? 'Automatic reply from peer is ON'
              : 'Automatic reply is OFF (manual dual typing)'
          }
        >
          <Bot size={14} />
          <span>Auto-Reply: <strong>{autoReplyEnabled ? 'ON' : 'OFF'}</strong></span>
        </button>

        {/* PQC Inspector Button */}
        <button
          type="button"
          className="quantum-status-btn"
          onClick={onOpenInspector}
          title="Inspect Quantum Keys & Encryption Specs"
        >
          <Lock size={13} />
          <span>Kyber-768 Active</span>
        </button>
      </div>
    </header>
  );
}
