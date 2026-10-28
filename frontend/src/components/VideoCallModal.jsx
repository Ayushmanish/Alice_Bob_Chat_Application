import { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ShieldCheck,
  Maximize2,
  Minimize2,
  MonitorUp,
  Volume2,
  VolumeX,
  Lock
} from 'lucide-react';

export default function VideoCallModal({
  currentUser, // 'Alice' or 'Bob'
  peerUser,    // 'Bob' or 'Alice'
  onEndCall
}) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const isPeerVideoOff = false;
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Call duration counter
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const handleHangup = () => {
    onEndCall?.(formatDuration(duration));
  };

  return (
    <div className={`video-modal-backdrop ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="video-modal-card">
        {/* Top Header Bar */}
        <div className="video-header">
          <div className="video-header-left">
            <div className="pqc-call-badge">
              <ShieldCheck size={14} className="badge-icon-shield" />
              <span>ML-KEM-768 End-to-End Quantum Encrypted</span>
            </div>
            <div className="call-timer-chip">
              <span className="live-dot"></span>
              <span>{formatDuration(duration)}</span>
            </div>
          </div>
          <div className="video-header-right">
            <button
              type="button"
              className="video-action-btn"
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              title={isAudioMuted ? 'Unmute Audio Output' : 'Mute Audio Output'}
            >
              {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              type="button"
              className="video-action-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {/* Video Feeds Container */}
        <div className="video-feeds-grid">
          {/* Main Peer Feed (Remote: peerUser) */}
          <div className="main-video-feed">
            {!isPeerVideoOff ? (
              <div className="simulated-stream peer-stream">
                <div className="stream-overlay-info">
                  <div className="stream-user-tag">
                    <span className="status-indicator online"></span>
                    <strong>{peerUser}</strong>
                    <span className="pqc-tag">Kyber-768</span>
                  </div>
                  <div className="signal-bars">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </div>

                {/* Animated video graphics representation */}
                <div className="video-avatar-pulse">
                  <div className={`avatar-ring ${peerUser.toLowerCase()}`}>
                    <div className="avatar-initials">
                      {peerUser === 'Alice' ? '👩‍💻' : '👨‍💻'}
                    </div>
                  </div>
                  <div className="stream-waves">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                  </div>
                  <div className="video-quality-chip">1080p 60fps • Quantum Secure Stream</div>
                </div>
              </div>
            ) : (
              <div className="video-off-placeholder">
                <div className="off-avatar">{peerUser[0]}</div>
                <p>{peerUser}'s camera is turned off</p>
              </div>
            )}

            {/* PiP Self Feed (Local: currentUser) */}
            <div className="pip-video-feed">
              {!isVideoOff ? (
                <div className="pip-stream">
                  <div className="pip-user-tag">
                    <span>You ({currentUser})</span>
                    {isMuted && <MicOff size={11} className="pip-mic-off" />}
                  </div>
                  <div className="pip-avatar-graphic">
                    <span>{currentUser === 'Alice' ? '👩‍💻' : '👨‍💻'}</span>
                  </div>
                </div>
              ) : (
                <div className="pip-off-placeholder">
                  <VideoOff size={18} />
                  <span>Camera Off</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Status Banner */}
        <div className="video-status-banner">
          <Lock size={12} />
          <span>Post-Quantum Key Exchange active • Zero knowledge server relay</span>
        </div>

        {/* Control Action Dock */}
        <div className="video-controls-dock">
          <button
            type="button"
            className={`control-circle-btn ${isMuted ? 'active-warning' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            type="button"
            className={`control-circle-btn ${isVideoOff ? 'active-warning' : ''}`}
            onClick={() => setIsVideoOff(!isVideoOff)}
            title={isVideoOff ? 'Turn On Camera' : 'Turn Off Camera'}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>

          <button
            type="button"
            className={`control-circle-btn ${isScreenSharing ? 'active-info' : ''}`}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            title="Screen Share"
          >
            <MonitorUp size={20} />
          </button>

          <button
            type="button"
            className="control-circle-btn end-call-btn"
            onClick={handleHangup}
            title="End Call"
          >
            <PhoneOff size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
