import { useState } from 'react';
import { ShieldCheck, X, CheckCircle2, Copy } from 'lucide-react';

export default function PqcInspectorModal({ onClose }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="inspector-backdrop" onClick={onClose}>
      <div className="inspector-card" onClick={(e) => e.stopPropagation()}>
        <div className="inspector-header">
          <div className="inspector-title-row">
            <div className="inspector-badge">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3>Post-Quantum Cryptography Status</h3>
              <p>NIST FIPS 203 & 204 Standardized Algorithms</p>
            </div>
          </div>
          <button type="button" className="inspector-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="inspector-body">
          <div className="inspector-stat-grid">
            <div className="stat-card">
              <div className="stat-label">Key Encapsulation (KEM)</div>
              <div className="stat-value highlight-cyan">ML-KEM-768 (Kyber)</div>
              <div className="stat-sub">NIST FIPS 203 • Module-LWE Problem</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Digital Signatures (DSA)</div>
              <div className="stat-value highlight-purple">ML-DSA-65 (Dilithium)</div>
              <div className="stat-sub">NIST FIPS 204 • Lattice-Based</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Symmetric Cipher</div>
              <div className="stat-value">AES-256-GCM</div>
              <div className="stat-sub">Shared secret ratchet per message</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Quantum Security Level</div>
              <div className="stat-value highlight-green">Level 3 (High)</div>
              <div className="stat-sub">Equivalent to AES-192 vs Grover/Shor</div>
            </div>
          </div>

          <div className="key-section">
            <div className="key-item">
              <div className="key-header">
                <span className="key-owner">👩‍💻 Alice's ML-KEM Public Key Fingerprint</span>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() =>
                    copyToClipboard(
                      '8f4c7a1029bd6e35cf8140ab92d31e50',
                      'alice'
                    )
                  }
                >
                  <Copy size={12} />
                  <span>{copied === 'alice' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="key-fingerprint">
                8F4C : 7A10 : 29BD : 6E35 : CF81 : 40AB : 92D3 : 1E50
              </div>
            </div>

            <div className="key-item">
              <div className="key-header">
                <span className="key-owner">👨‍💻 Bob's ML-KEM Public Key Fingerprint</span>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() =>
                    copyToClipboard(
                      '3c1ee842f90117d6b829ac074218eb61',
                      'bob'
                    )
                  }
                >
                  <Copy size={12} />
                  <span>{copied === 'bob' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="key-fingerprint">
                3C1E : E842 : F901 : 17D6 : B829 : AC07 : 4218 : EB61
              </div>
            </div>
          </div>

          <div className="inspector-footer-note">
            <CheckCircle2 size={15} className="note-check" />
            <span>
              All messages exchanged between Alice and Bob are protected against "Harvest Now, Decrypt Later" quantum attacks.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
