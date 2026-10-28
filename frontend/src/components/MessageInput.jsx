import { useState, useRef } from 'react';
import {
  Smile,
  Send,
  Paperclip,
  Mic,
  Lock
} from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import { QUICK_EMOJIS } from '../data/emojis';

export default function MessageInput({
  onSendMessage,
  currentUser,
  peerUser
}) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage({
      text: text.trim(),
      sender: currentUser,
      attachment: null
    });
    setText('');
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onSendMessage({
          text: `Shared image: ${file.name}`,
          sender: currentUser,
          attachment: {
            type: 'image',
            url: reader.result,
            name: file.name
          }
        });
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage({
          text: '🎙️ Voice note (0:04) • Quantum-encrypted audio',
          sender: currentUser,
          attachment: null
        });
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="message-input-wrapper">
      {/* Quick Emoji Bar for Rapid Selection */}
      <div className="quick-emoji-strip">
        <span className="quick-strip-label">Quick:</span>
        <div className="quick-emojis-scroll">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className="quick-emoji-item"
              onClick={() => handleSelectEmoji(emoji)}
              title={`Insert ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Control Bar */}
      <div className="input-bar">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Attachment Button */}
        <button
          type="button"
          className="input-icon-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Attach Image"
          aria-label="Attach Image"
        >
          <Paperclip size={20} />
        </button>

        {/* Emoji Trigger Button */}
        <div className="emoji-trigger-container">
          <button
            type="button"
            className={`input-icon-btn ${showEmojiPicker ? 'active' : ''}`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emoji Picker"
            aria-label="Emoji Picker"
          >
            <Smile size={21} />
          </button>

          {/* Floating Emoji Picker Popover */}
          {showEmojiPicker && (
            <div className="emoji-popover-wrapper">
              <EmojiPicker
                onSelectEmoji={handleSelectEmoji}
                onClose={() => setShowEmojiPicker(false)}
              />
            </div>
          )}
        </div>

        {/* Text Input Field */}
        <div className="input-field-container">
          <input
            ref={inputRef}
            type="text"
            className="chat-text-input"
            placeholder={
              isRecording
                ? 'Recording encrypted voice note...'
                : `Message ${peerUser} (Post-Quantum Encrypted)...`
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isRecording}
          />
        </div>

        {/* Voice Note Simulation */}
        <button
          type="button"
          className={`input-icon-btn ${isRecording ? 'recording-active' : ''}`}
          onClick={toggleVoiceRecord}
          title={isRecording ? 'Recording...' : 'Send Voice Note'}
          aria-label="Send Voice Note"
        >
          <Mic size={20} />
        </button>

        {/* Send Button */}
        <button
          type="button"
          className={`send-msg-btn ${text.trim() ? 'can-send' : ''}`}
          onClick={handleSend}
          disabled={!text.trim() && !isRecording}
          title="Send Encrypted Message (Enter)"
          aria-label="Send Encrypted Message"
        >
          <Send size={18} />
        </button>
      </div>

      <div className="input-crypto-hint">
        <Lock size={10} />
        <span>Lattice-based ML-KEM-768 session active • Messages signed with ML-DSA</span>
      </div>
    </div>
  );
}
