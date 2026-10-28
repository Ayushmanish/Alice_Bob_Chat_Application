import {
  Video,
  Phone,
  ShieldCheck,
  Search,
  RotateCcw,
  Lock
} from 'lucide-react';

export default function ChatHeader({
  peerUser,
  onStartVideoCall,
  onStartAudioCall,
  onOpenInspector,
  onClearChat,
  onToggleSearch,
  isSearching
}) {
  const isPeerAlice = peerUser === 'Alice';

  return (
    <header className="chat-header">
      {/* Peer Profile Info */}
      <div className="header-user-info">
        <div className="avatar-wrapper">
          <div className={`user-avatar ${isPeerAlice ? 'alice-avatar' : 'bob-avatar'}`}>
            <span className="avatar-emoji">{isPeerAlice ? '👩‍💻' : '👨‍💻'}</span>
          </div>
          <span className="online-badge-dot" title="Online"></span>
        </div>

        <div className="user-details">
          <div className="user-name-row">
            <h2 className="user-name">{peerUser}</h2>
            <button
              type="button"
              className="pqc-security-pill"
              onClick={onOpenInspector}
              title="Click to view Quantum-Safe security details"
            >
              <ShieldCheck size={13} className="shield-icon" />
              <span>ML-KEM-768</span>
            </button>
          </div>
          <p className="user-status-text">
            <span className="status-dot"></span>
            Online • Quantum channel established
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Search in chat */}
        <button
          type="button"
          className={`header-icon-btn ${isSearching ? 'active' : ''}`}
          onClick={onToggleSearch}
          title="Search messages"
          aria-label="Search messages"
        >
          <Search size={19} />
        </button>

        {/* Voice Call */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onStartAudioCall}
          title="Start Audio Call"
          aria-label="Start Audio Call"
        >
          <Phone size={19} />
        </button>

        {/* Video Calling Icon (Requested) */}
        <button
          type="button"
          className="header-icon-btn video-call-trigger"
          onClick={onStartVideoCall}
          title="Start Encrypted Video Call"
          aria-label="Start Encrypted Video Call"
        >
          <Video size={20} />
          <span className="call-ping"></span>
        </button>

        {/* Quantum Inspector */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onOpenInspector}
          title="View Post-Quantum Cryptography details"
          aria-label="View Post-Quantum Cryptography details"
        >
          <Lock size={18} />
        </button>

        {/* Clear Chat */}
        <button
          type="button"
          className="header-icon-btn"
          onClick={onClearChat}
          title="Reset conversation"
          aria-label="Reset conversation"
        >
          <RotateCcw size={17} />
        </button>
      </div>
    </header>
  );
}
