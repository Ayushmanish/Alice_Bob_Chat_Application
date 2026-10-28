import { useState, useRef, useEffect } from 'react';
import { EMOJI_CATEGORIES } from '../data/emojis';
import { Search, X } from 'lucide-react';

export default function EmojiPicker({ onSelectEmoji, onClose }) {
  const [activeCategory, setActiveCategory] = useState('smileys');
  const [searchTerm, setSearchTerm] = useState('');
  const pickerRef = useRef(null);

  // Close on Escape or click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Filter emojis based on search term (if typed, search all categories)
  const filteredEmojis = searchTerm.trim()
    ? EMOJI_CATEGORIES.flatMap((cat) => cat.emojis)
    : EMOJI_CATEGORIES.find((cat) => cat.id === activeCategory)?.emojis || [];

  return (
    <div
      ref={pickerRef}
      className="emoji-picker-container"
      role="dialog"
      aria-label="Emoji Picker"
    >
      <div className="emoji-picker-header">
        <div className="emoji-search-wrapper">
          <Search size={14} className="emoji-search-icon" />
          <input
            type="text"
            className="emoji-search-input"
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button
              type="button"
              className="emoji-search-clear"
              onClick={() => setSearchTerm('')}
            >
              <X size={12} />
            </button>
          )}
        </div>
        <button
          type="button"
          className="emoji-close-btn"
          onClick={onClose}
          aria-label="Close emoji picker"
        >
          <X size={14} />
        </button>
      </div>

      {!searchTerm && (
        <div className="emoji-category-tabs">
          {EMOJI_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`emoji-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              title={cat.name}
            >
              <span>{cat.icon}</span>
            </button>
          ))}
        </div>
      )}

      <div className="emoji-grid">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={index}
            type="button"
            className="emoji-btn"
            onClick={() => {
              onSelectEmoji(emoji);
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
