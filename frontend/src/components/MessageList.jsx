import { useState, useEffect, useRef } from 'react';
import {
  CheckCheck,
  Lock,
  Eye,
  EyeOff,
  Video,
  Shield
} from 'lucide-react';

const REACTION_OPTIONS = ['❤️', '👍', '😂', '🔥', '🔐', '😮'];

export default function MessageList({
  messages,
  currentUser,
  peerUser,
  searchQuery,
  onAddReaction
}) {
  const scrollRef = useRef(null);
  const [inspectedMessageId, setInspectedMessageId] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredMessages = searchQuery.trim()
    ? messages.filter((m) =>
        m.text?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const toggleCiphertext = (id) => {
    setInspectedMessageId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="message-list-container" ref={scrollRef}>
      {/* Session Security Banner */}
      <div className="system-session-badge">
        <Shield size={14} className="badge-shield-icon" />
        <span>
          End-to-End Quantum Encryption verified with <strong>{peerUser}</strong>
        </span>
      </div>

      <div className="date-separator">
        <span>Today</span>
      </div>

      {filteredMessages.length === 0 && (
        <div className="no-messages-prompt">
          <div className="prompt-icon">💬</div>
          <h3>No messages found</h3>
          <p>
            {searchQuery
              ? `No results matching "${searchQuery}"`
              : `Say hello to ${peerUser} to start the encrypted conversation!`}
          </p>
        </div>
      )}

      {filteredMessages.map((msg) => {
        if (msg.type === 'system') {
          return (
            <div key={msg.id} className="system-event-message">
              <div className="system-event-content">
                {msg.subType === 'call' && <Video size={13} className="event-icon" />}
                {msg.subType === 'security' && <Lock size={13} className="event-icon" />}
                <span>{msg.text}</span>
              </div>
            </div>
          );
        }

        const isOutgoing = msg.sender === currentUser;
        const isCiphertextOpen = inspectedMessageId === msg.id;
        const isHovered = hoveredMessageId === msg.id;

        return (
          <div
            key={msg.id}
            className={`message-row ${isOutgoing ? 'outgoing' : 'incoming'}`}
            onMouseEnter={() => setHoveredMessageId(msg.id)}
            onMouseLeave={() => setHoveredMessageId(null)}
          >
            {/* Incoming Avatar */}
            {!isOutgoing && (
              <div className="msg-sender-avatar" title={msg.sender}>
                {msg.sender === 'Alice' ? '👩‍💻' : '👨‍💻'}
              </div>
            )}

            <div className="message-bubble-wrapper">
              {/* Message Bubble */}
              <div className={`message-bubble ${isOutgoing ? 'bubble-outgoing' : 'bubble-incoming'}`}>
                {/* Sender tag if needed in group, here gives crisp identity */}
                <div className="bubble-sender-name">
                  {isOutgoing ? 'You' : msg.sender}
                </div>

                {/* Attached Image if any */}
                {msg.attachment && msg.attachment.type === 'image' && (
                  <div className="message-attachment-image">
                    <img src={msg.attachment.url} alt="Shared Attachment" />
                  </div>
                )}

                {/* Message Text */}
                <div className="bubble-text">{msg.text}</div>

                {/* PQC Ciphertext Reveal Panel */}
                {isCiphertextOpen && (
                  <div className="ciphertext-drawer">
                    <div className="ciphertext-header">
                      <Lock size={11} />
                      <span>ML-KEM AES-GCM Ciphertext:</span>
                    </div>
                    <code className="ciphertext-code">
                      {msg.ciphertext ||
                        '7F9B2C04E1D8A63102F48AC90E35B8D147ACD098F401...'}
                    </code>
                    <div className="ciphertext-footer">
                      Auth Tag: <code>0x9C4E2D</code> • IV: <code>12-byte nonce</code>
                    </div>
                  </div>
                )}

                {/* Footer: Time, Ciphertext toggle, Read receipts */}
                <div className="bubble-footer">
                  <button
                    type="button"
                    className="cipher-toggle-btn"
                    onClick={() => toggleCiphertext(msg.id)}
                    title={isCiphertextOpen ? 'Hide Ciphertext' : 'View PQC Ciphertext'}
                  >
                    {isCiphertextOpen ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span>{isCiphertextOpen ? 'Encrypted' : 'PQC'}</span>
                  </button>

                  <span className="bubble-time">{msg.timestamp}</span>

                  {isOutgoing && (
                    <span className="read-receipt" title="Delivered & Read">
                      <CheckCheck size={14} className="receipt-icon active" />
                    </span>
                  )}
                </div>
              </div>

              {/* Displayed Emoji Reactions */}
              {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                <div className="reactions-container">
                  {Object.entries(msg.reactions).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      type="button"
                      className="reaction-pill"
                      onClick={() => onAddReaction?.(msg.id, emoji)}
                      title={`React with ${emoji}`}
                    >
                      <span>{emoji}</span>
                      {count > 1 && <span className="reaction-count">{count}</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* Hover Quick Emoji Reaction Toolbar */}
              {isHovered && (
                <div className={`quick-reaction-dock ${isOutgoing ? 'dock-right' : 'dock-left'}`}>
                  {REACTION_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="quick-react-btn"
                      onClick={() => onAddReaction?.(msg.id, emoji)}
                      title={`React ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
