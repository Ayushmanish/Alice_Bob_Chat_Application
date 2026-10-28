import { useState } from 'react';
import TopBar from './components/TopBar';
import ChatWindow from './components/ChatWindow';
import VideoCallModal from './components/VideoCallModal';
import PqcInspectorModal from './components/PqcInspectorModal';
import './App.css';

const INITIAL_MESSAGES = [
  {
    id: 'm-sys-1',
    type: 'system',
    subType: 'security',
    text: '🔐 Quantum-Safe session initialized with ML-KEM-768 (Kyber) & ML-DSA-65 (Dilithium)'
  },
  {
    id: 'm-1',
    type: 'chat',
    sender: 'Alice',
    text: 'Hey Bob! 👋 How is the new Post-Quantum Cryptography setup working on your end?',
    timestamp: '11:42 AM',
    ciphertext: '3A7F82C9E4B105D298E7F6A302194B5D8C2E7A0F19B4C83D',
    reactions: { '👍': 1, '🔐': 1 }
  },
  {
    id: 'm-2',
    type: 'chat',
    sender: 'Bob',
    text: 'Hey Alice! 🚀 Everything is running smoothly. Kyber-768 key encapsulation completed in 0.4ms! All our traffic is quantum-safe. 🛡️⚡',
    timestamp: '11:43 AM',
    ciphertext: '9E4B105D298E7F6A302194B5D8C2E7A0F19B4C83D7A0B2C9',
    reactions: { '❤️': 1, '🔥': 1 }
  },
  {
    id: 'm-3',
    type: 'chat',
    sender: 'Alice',
    text: 'Amazing! Even future quantum computers won\'t be able to crack this. Are you free for a quick video check? 📹✨',
    timestamp: '11:44 AM',
    ciphertext: '5C8102F48AC90E35B8D147ACD098F4012A7B8E9012D34567',
    reactions: {}
  },
  {
    id: 'm-4',
    type: 'chat',
    sender: 'Bob',
    text: 'Ready whenever you are! Just tap the video call icon in the header whenever you want to connect. 😊🙌',
    timestamp: '11:45 AM',
    ciphertext: '1F4A790B38C2D5E69A014F8B2C3D4E5F6A7B8C9D0E1F2A3B',
    reactions: { '👀': 1 }
  }
];

const AUTO_REPLIES_FROM_BOB = [
  "Got your message! The shared secret key rotated seamlessly. 🔐",
  "Everything is encrypted with ML-KEM-768 lattice mathematics! 🛡️⚡",
  "Looks great! Quantum-resistant communications running flawlessly. 🚀✨",
  "Received loud and clear! Ready for our encrypted video call anytime. 📹👍",
  "No eavesdropper or quantum algorithm can decrypt this! 💯🔒",
  "Decapsulated your packet in 0.2ms. All signatures verified! 👩‍💻👨‍💻"
];

const AUTO_REPLIES_FROM_ALICE = [
  "Message verified with Dilithium digital signature! ✍️🔐",
  "Perfect, session integrity confirmed by Alice! 👩‍💻✨",
  "Decrypted with local private key. All good on my end! 🚀",
  "Checking the latency on our quantum channel... looking super fast! ⚡",
  "Let's test the video calling stream next! 📹😊"
];

export default function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [viewMode, setViewMode] = useState('split'); // 'alice', 'bob', or 'split'
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [showInspector, setShowInspector] = useState(false);

  // Generate randomized ciphertext hex preview
  const generateCiphertext = () => {
    const chars = '0123456789ABCDEF';
    let res = '';
    for (let i = 0; i < 48; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  };

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = ({ text, sender, attachment }) => {
    const newMsg = {
      id: `m-${Date.now()}`,
      type: 'chat',
      sender,
      text,
      attachment,
      timestamp: getTimestamp(),
      ciphertext: generateCiphertext(),
      reactions: {}
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulated Auto-Reply if enabled
    if (autoReplyEnabled) {
      const isSenderAlice = sender === 'Alice';
      const replier = isSenderAlice ? 'Bob' : 'Alice';
      const repliesList = isSenderAlice ? AUTO_REPLIES_FROM_BOB : AUTO_REPLIES_FROM_ALICE;
      const chosenReply = repliesList[Math.floor(Math.random() * repliesList.length)];

      setTimeout(() => {
        const replyMsg = {
          id: `m-${Date.now() + 1}`,
          type: 'chat',
          sender: replier,
          text: chosenReply,
          timestamp: getTimestamp(),
          ciphertext: generateCiphertext(),
          reactions: {}
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 1000);
    }
  };

  const handleAddReaction = (messageId, emoji) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const currentReactions = { ...(msg.reactions || {}) };
        if (currentReactions[emoji]) {
          currentReactions[emoji] += 1;
        } else {
          currentReactions[emoji] = 1;
        }
        return { ...msg, reactions: currentReactions };
      })
    );
  };

  const handleStartVideoCall = () => {
    setVideoCallActive(true);
  };

  const handleEndVideoCall = (durationStr) => {
    setVideoCallActive(false);
    // Add call log entry
    const callLog = {
      id: `m-call-${Date.now()}`,
      type: 'system',
      subType: 'call',
      text: `📹 Encrypted Video Call ended • Duration: ${durationStr}`
    };
    setMessages((prev) => [...prev, callLog]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `m-reset-${Date.now()}`,
        type: 'system',
        subType: 'security',
        text: '🔄 Chat history reset. New Quantum Handshake (ML-KEM-768) initialized.'
      }
    ]);
  };

  return (
    <div className="app-main-layout">
      {/* Top Application Bar */}
      <TopBar
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        autoReplyEnabled={autoReplyEnabled}
        onToggleAutoReply={() => setAutoReplyEnabled(!autoReplyEnabled)}
        onOpenInspector={() => setShowInspector(true)}
      />

      {/* Main Workspace Area */}
      <main className="chat-workspace-area">
        {viewMode === 'split' ? (
          /* Dual Split-Screen Mode */
          <div className="split-view-container">
            {/* Alice Window (Left) */}
            <div className="split-pane">
              <div className="pane-banner alice-banner">
                <span className="pane-avatar">👩‍💻</span>
                <span className="pane-title">Alice's Perspective (Sender: Alice → Bob)</span>
              </div>
              <ChatWindow
                currentUser="Alice"
                peerUser="Bob"
                messages={messages}
                onSendMessage={handleSendMessage}
                onAddReaction={handleAddReaction}
                onStartVideoCall={handleStartVideoCall}
                onStartAudioCall={handleStartVideoCall}
                onOpenInspector={() => setShowInspector(true)}
                onClearChat={handleClearChat}
                isSplitView={true}
              />
            </div>

            {/* Bob Window (Right) */}
            <div className="split-pane">
              <div className="pane-banner bob-banner">
                <span className="pane-avatar">👨‍💻</span>
                <span className="pane-title">Bob's Perspective (Sender: Bob → Alice)</span>
              </div>
              <ChatWindow
                currentUser="Bob"
                peerUser="Alice"
                messages={messages}
                onSendMessage={handleSendMessage}
                onAddReaction={handleAddReaction}
                onStartVideoCall={handleStartVideoCall}
                onStartAudioCall={handleStartVideoCall}
                onOpenInspector={() => setShowInspector(true)}
                onClearChat={handleClearChat}
                isSplitView={true}
              />
            </div>
          </div>
        ) : viewMode === 'alice' ? (
          /* Alice Focused View */
          <div className="single-view-container">
            <ChatWindow
              currentUser="Alice"
              peerUser="Bob"
              messages={messages}
              onSendMessage={handleSendMessage}
              onAddReaction={handleAddReaction}
              onStartVideoCall={handleStartVideoCall}
              onStartAudioCall={handleStartVideoCall}
              onOpenInspector={() => setShowInspector(true)}
              onClearChat={handleClearChat}
              isSplitView={false}
            />
          </div>
        ) : (
          /* Bob Focused View */
          <div className="single-view-container">
            <ChatWindow
              currentUser="Bob"
              peerUser="Alice"
              messages={messages}
              onSendMessage={handleSendMessage}
              onAddReaction={handleAddReaction}
              onStartVideoCall={handleStartVideoCall}
              onStartAudioCall={handleStartVideoCall}
              onOpenInspector={() => setShowInspector(true)}
              onClearChat={handleClearChat}
              isSplitView={false}
            />
          </div>
        )}
      </main>

      {/* Video Call Modal */}
      {videoCallActive && (
        <VideoCallModal
          currentUser={viewMode === 'bob' ? 'Bob' : 'Alice'}
          peerUser={viewMode === 'bob' ? 'Alice' : 'Bob'}
          onEndCall={handleEndVideoCall}
        />
      )}

      {/* PQC Inspector Modal */}
      {showInspector && (
        <PqcInspectorModal onClose={() => setShowInspector(false)} />
      )}
    </div>
  );
}
