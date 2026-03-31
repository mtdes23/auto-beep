import React, { useState, useEffect, useRef } from 'react';
import './TrollOverlay.css';

const TrollOverlay = ({ onCancel }) => {
  const [step, setStep] = useState(0); // 0: loading, 1: error
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("Đang kết nối đến Facebook Graph API...");
  const btnRef = useRef(null);

  useEffect(() => {
    if (step === 0) {
      const logs = [
        "Đang trích xuất Token của bạn...",
        "Truy cập lấy danh sách bạn bè...",
        "Đang thiết lập thông số tự động hóa...",
        "Truy cập danh sách toàn bộ danh sách bạn bè của bạn...",
        "Hoàn tất. Đang chuẩn bị kịch bản gửi tin nhắn."
      ];
      let p = 0;
      const interval = setInterval(() => {
        p += Math.floor(Math.random() * 8) + 2;
        if (p > 100) p = 100;
        setProgress(p);
        
        if (p > 10 && p <= 30) setLog(logs[0]);
        if (p > 30 && p <= 50) setLog(logs[1]);
        if (p > 50 && p <= 70) setLog(logs[2]);
        if (p > 70 && p < 99) setLog(logs[3]);
        if (p === 100) {
          setLog(logs[4]);
          clearInterval(interval);
          setTimeout(() => {
            setStep(1); // Jump to error
          }, 1200);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Nút Hủy chạy trốn (Nảy tới chỗ ngẫu nhiên)
  const handleMouseEnter = () => {
    if (btnRef.current) {
      const x = (Math.random() - 0.5) * 400; // X position nhảy
      const y = (Math.random() - 0.5) * 300; // Y position nhảy
      btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  return (
    <div className={`troll-overlay ${step === 1 ? 'glitch-bg' : ''}`}>
      {step === 0 && (
        <div className="glass-panel troll-box">
          <h2 style={{ color: '#60a5fa', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
            <span className="spinner"></span> Đang khởi chạy hệ thống...
          </h2>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="troll-log">{log}</p>
        </div>
      )}
      
      {step === 1 && (
        <div className="glass-panel alert-box">
          <div className="alert-header">
            <span className="alert-icon">⚠️</span>
            CẢNH BÁO BẢO MẬT NGHIÊM TRỌNG!
          </div>
          <div className="alert-content">
            <p><strong>Thông báo:</strong> Quá trình trích xuất thông tin của bạn đang bị lỗi.</p>
            <p style={{ color: '#fca5a5', marginTop: '8px' }}>
              Hệ thống đang tiến hành dùng tài khoản này để gửi tin nhắn tới tất cả bạn bè trên Messenger. Nếu đây là một sai sót, vui lòng Hủy Tiến Trình.
            </p>
            <div className="progress-bar-bg" style={{ marginTop: '16px', height: '12px' }}>
              <div className="progress-bar-fill error-fill" style={{ width: '85%', animation: 'pulse 1s infinite' }}></div>
            </div>
            <p className="troll-log" style={{ color: '#fca5a5' }}>Tiến độ gửi tin nhắn: 85%...</p>
          </div>
          <div className="alert-actions">
            <button className="btn-glass" onClick={() => setStep(2)}>Phó mặc cho số phận 🤣</button>
            <div style={{ position: 'relative', width: '200px' }}>
              <button 
                ref={btnRef} 
                className="btn-danger troll-btn" 
                onMouseEnter={handleMouseEnter}
                onClick={() => alert('Úi! Cao thủ nhanh tay quá rồi! 🤣')}
              >
                HỦY TIẾN TRÌNH
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="glass-panel" style={{ padding: '40px', width: '450px', textAlign: 'center', background: 'rgba(20, 20, 50, 0.9)', border: '1px solid rgba(96, 165, 250, 0.6)', animation: 'fadeIn 0.5s ease', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', animation: 'pulse 2s infinite' }}>🤡</div>
          <h2 style={{ color: '#60a5fa', marginBottom: '16px', fontSize: '24px' }}>CHÚC MỪNG CÁ THÁNG TƯ!</h2>
          <p style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: '1.6' }}>
            Bạn đã bị lừa rồi nhé! Tài khoản của bạn vẫn an toàn tuyệt đối và sẽ không có ai bị chửi cả. <br/><br/>
            Chúc bạn một ngày 1/4 thật nhiều niềm vui ^^
          </p>
          <button className="btn-glass" style={{ marginTop: '32px', padding: '12px 40px', fontSize: '16px', background: 'rgba(96, 165, 250, 0.2)' }} onClick={() => window.location.reload()}>
            Trở Về Thực Tại
          </button>
        </div>
      )}
    </div>
  );
};

export default TrollOverlay;
