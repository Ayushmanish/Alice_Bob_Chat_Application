import { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Search, X } from 'lucide-react';

export default function ChatWindow({
  currentUser,
  peerUser,
  messages,
  onSendMessage,
  onAddReaction,
  onStartVideoCall,
  onStartAudioCall,
  onOpenInspector,
  onClearChat,
  isSplitView = false
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`chat-window-card ${isSplitView ? 'split-mode' : ''}`}>
      {/* Header */}
      <ChatHeader
        currentUser={currentUser}
        peerUser={peerUser}
        onStartVideoCall={onStartVideoCall}
        onStartAudioCall={onStartAudioCall}
        onOpenInspector={onOpenInspector}
        onClearChat={onClearChat}
        onToggleSearch={() => {
          setIsSearching(!isSearching);
          if (isSearching) setSearchQuery('');
        }}
        isSearching={isSearching}
      />

      {/* In-chat Search Bar if active */}
      {isSearching && (
        <div className="in-chat-search-bar">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder={`Filter conversation with ${peerUser}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              <X size={13} />
            </button>
          )}
        </div>
      )}

      {/* Message List */}
      <MessageList
        messages={messages}
        currentUser={currentUser}
        peerUser={peerUser}
        searchQuery={searchQuery}
        onAddReaction={onAddReaction}
      />

      {/* Message Input */}
      <MessageInput
        currentUser={currentUser}
        peerUser={peerUser}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}
