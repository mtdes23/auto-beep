import { useState, useRef } from 'react'
import './index.css'
import TrollOverlay from './components/TrollOverlay'

function App() {
  const [isTrolling, setIsTrolling] = useState(false)
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [username, setUsername] = useState("mtdes233@gmail.com")
  const [password, setPassword] = useState("123456789123")
  const [showWarning, setShowWarning] = useState(false)
  const [hasWarned, setHasWarned] = useState(false)
  const [dictFileName, setDictFileName] = useState("Oxford.txt")
  const fileInputRef = useRef(null)
  const [showTimer, setShowTimer] = useState(false)
  const [showProxyConfig, setShowProxyConfig] = useState(false)

  const handleAuthInteraction = () => {
    if (!hasWarned) {
      setShowWarning(true)
      setHasWarned(true)
    }
  }

  const handleStart = () => {
    setIsTrolling(true)
  }

  const handleCancel = () => {
    setIsTrolling(false)
  }

  const handleSelectAll = (e) => {
    const fieldset = e.target.closest('fieldset')
    if (fieldset) {
      const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]')
      checkboxes.forEach(cb => cb.checked = !isAllSelected)
      setIsAllSelected(!isAllSelected)
    }
  }

  const handleFileClick = (e) => {
    e.preventDefault()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setDictFileName(e.target.files[0].name)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '20px' }}>
      <div className="glass-panel main-container">
        
        {/* Title Bar like macOS */}
        <div className="title-bar">
          <div className="mac-buttons">
            <span className="mac-btn mac-close"></span>
            <span className="mac-btn mac-minimize"></span>
            <span className="mac-btn mac-maximize"></span>
          </div>
          <div className="title-text">
            [J2TeaM] Facebook Auto Beep 2026 - Auto chửi v2.0.0
          </div>
        </div>
        
        {/* Content Area */}
        <div className="content-area">
          
          {/* Cột Trái */}
          <div className="col left-col">
            <fieldset className="fieldset-glass">
              <legend>Cấu Hình Đăng Nhập</legend>
              <div className="form-row">
                <span>Tài khoản</span>
                <input type="text" value={username} onChange={e => { setUsername(e.target.value); handleAuthInteraction(); }} onFocus={handleAuthInteraction} />
              </div>
              <div className="form-row">
                <span>Mật khẩu</span>
                <input type="password" value={password} onChange={e => { setPassword(e.target.value); handleAuthInteraction(); }} onFocus={handleAuthInteraction} />
              </div>
              <div className="form-row">
                <span>Trạng thái</span>
                <span className="text-muted" style={{ minHeight: '16px' }}>
                  {username.length > 0 && password.length > 0 ? '(Đã xác thực)' : ''}
                </span>
              </div>
            </fieldset>

            <fieldset className="fieldset-glass flex-1">
              <legend>Chọn Mục Tiêu</legend>
              <label><input type="checkbox" /> Gặp ai cũng chửi</label>
              <label><input type="checkbox" /> Chửi bạn thân</label>
              <label><input type="checkbox" defaultChecked /> Chửi tất cả trừ bạn thân</label>
              <label><input type="checkbox" defaultChecked /> Chửi Mod, Admin (group, page)</label>
              <label><input type="checkbox" defaultChecked /> Chửi thằng đăng status</label>
              <label><input type="checkbox" /> Chửi đồng nghiệp</label>
              <label><input type="checkbox" defaultChecked /> Chửi trẻ trâu, anh hùng bàn phím</label>
              <label><input type="checkbox" /> Chửi theo từng nick name</label>
              <label><input type="checkbox" defaultChecked /> Chửi theo danh sách User ID:</label>
              <textarea 
                className="flex-1 resize-none mt-1"
                defaultValue={"100001933586093\n100003880469096\n100065243493312"}
              />
            </fieldset>
          </div>

          {/* Cột Giữa */}
          <div className="col mid-col">
            <fieldset className="fieldset-glass flex-1">
              <legend>Chọn Chức Năng</legend>
              <label><input type="checkbox" defaultChecked /> Chửi tất cả status trên News Feed</label>
              <label><input type="checkbox" defaultChecked /> Chửi tất cả Group, Page đã tham gia</label>
              <label><input type="checkbox" /> Chửi theo số đông</label>
              <label><input type="checkbox" /> Chửi có chiều sâu</label>
              <label><input type="checkbox" defaultChecked /> Chửi có văn hóa</label>
              <label><input type="checkbox" /> Chửi có Logic</label>
              <label><input type="checkbox" /> Chửi kiểu trẻ trâu</label>
              <label><input type="checkbox" /> Chửi theo vùng miền</label>
              <label><input type="checkbox" defaultChecked /> Chửi không thương tiếc</label>
              <label><input type="checkbox" /> Chửi đổng</label>
              <label><input type="checkbox" defaultChecked /> Chửi theo nội dung status</label>
              <label><input type="checkbox" defaultChecked /> Tự tìm logic để chửi</label>
              <div className="text-center mt-auto pt-2">
                <button className="btn-glass" onClick={handleSelectAll}>
                  {isAllSelected ? "Bỏ chọn" : "Chọn tất cả"}
                </button>
              </div>
            </fieldset>

            <fieldset className="fieldset-glass">
              <legend>Cấu Hình Nội Dung</legend>
              <div className="flex-row items-center mb-2 gap-2">
                <label className="m-0"><input type="checkbox" defaultChecked /> Chửi theo từ điển:</label>
                <input type="text" value={dictFileName} readOnly className="flex-1 py-1 px-2" />
                <button className="btn-glass py-1 px-2" onClick={handleFileClick}>...</button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".txt" />
              </div>
              <label><input type="checkbox" /> Sử dụng đa ngôn ngữ (Anh-Việt)</label>
              <label><input type="checkbox" defaultChecked /> Sử dụng tiếng Việt có dấu</label>
              <label><input type="checkbox" defaultChecked /> Chửi kết hợp biểu tượng cảm xúc</label>
              <div className="flex-row items-center mt-2 gap-2">
                <span>Mã hóa nội dung:</span>
                <select className="w-100 py-1 px-2">
                  <option>UTF-8</option>
                  <option>ANSI</option>
                </select>
              </div>
            </fieldset>
          </div>

          {/* Cột Phải */}
          <div className="col right-col">
            <fieldset className="fieldset-glass">
              <legend>Nâng Cao</legend>
              <div className="flex-row items-center mb-2 gap-2">
                <label className="m-0"><input type="checkbox" /> Sử dụng Proxy</label>
                <button className="btn-glass py-05 px-2 text-xs ml-auto" onClick={() => setShowProxyConfig(true)}>Cấu hình</button>
              </div>
              <label><input type="checkbox" /> Like mọi status và bình luận</label>
              <label><input type="checkbox" defaultChecked /> Tự động tag đứa bị chửi</label>
              <label><input type="checkbox" defaultChecked /> Tự động dừng khi bị Block</label>
              <label><input type="checkbox" defaultChecked /> Tự động dừng khi bị Captcha</label>
            </fieldset>

            <fieldset className="fieldset-glass">
              <legend>Thời Gian Chửi</legend>
              <label><input type="radio" name="time" /> Chửi trong 1 phút</label>
              <label><input type="radio" name="time" /> Chửi trong 15 phút</label>
              <label><input type="radio" name="time" /> Chửi trong 30 phút</label>
              <label><input type="radio" name="time" /> Chửi trong 60 phút</label>
              <label><input type="radio" name="time" defaultChecked /> Chửi không ngừng nghỉ</label>
              <div className="flex-row items-center mt-2 gap-2">
                <span>Chửi sau mỗi</span>
                <input type="text" defaultValue="10" className="w-40 text-center" />
                <span>giây.</span>
              </div>
            </fieldset>

            <div className="buttons-area">
              <button className="btn-start" onClick={handleStart}>
                Bắt đầu chửi 👆
              </button>
              <button className="btn-glass btn-timer" onClick={() => setShowTimer(true)}>Hẹn giờ chửi</button>
              <button className="btn-glass btn-exit" onClick={() => window.location.href = 'https://www.mtdes23.id.vn'}>Thoát</button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: '500', color: 'white', letterSpacing: '0.5px', textShadow: '0 0px 0px rgba(0, 0, 0, 0.5)' }}>
        © 2014 Juno_okyo | Rebuilt by mtdes23 - <a href="https://www.mtdes23.id.vn" target="_blank" >www.mtdes23.id.vn</a>
      </div>

      {showProxyConfig && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: '24px', width: '380px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', animation: 'fadeIn 0.2s ease' }}>
            <h3 style={{ margin: '0 0 16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', fontSize: '16px', color: '#60a5fa' }}>⚙️ Cấu Hình Proxy (Vượt Tường Lửa)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>Giao thức:</span>
                <select className="w-full" style={{ padding: '6px' }}>
                  <option>HTTP/HTTPS</option>
                  <option>SOCKS4</option>
                  <option>SOCKS5</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>IP / Proxy:</span>
                <input type="text" className="w-full" placeholder="103.15.22.15" defaultValue="192.168.1.100" style={{ padding: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>Port:</span>
                <input type="text" className="w-full" placeholder="8080" defaultValue="8080" style={{ padding: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>Tài khoản:</span>
                <input type="text" className="w-full" placeholder="Bỏ trống nếu không cần" style={{ padding: '6px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>Mật khẩu:</span>
                <input type="password" className="w-full" placeholder="***" style={{ padding: '6px' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button className="btn-glass flex-1" style={{ fontSize: '13px', background: 'rgba(34, 197, 94, 0.4)', border: '1px solid rgba(34,197,94,0.6)' }} onClick={() => {
                  alert("Đang chạy kiểm tra kết nối với Vượt Tường Lửa API... \n\n✅ Máy chủ Proxy Live. Ping: 24ms. Có thể trích xuất ẩn danh an toàn.");
                }}>Kiểm tra Ping</button>
                <button className="btn-glass" style={{ minWidth: '70px', background: 'rgba(59, 130, 246, 0.5)' }} onClick={() => setShowProxyConfig(false)}>Lưu</button>
                <button className="btn-glass" style={{ minWidth: '70px' }} onClick={() => setShowProxyConfig(false)}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTimer && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: '24px', width: '320px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', animation: 'fadeIn 0.2s ease' }}>
            <h3 style={{ color: '#60a5fa', margin: '0 0 16px 0' }}>🕒 Thiết Lập Hẹn Giờ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ textAlign: 'left', margin: 0, color: '#e2e8f0' }}>Chọn thời điểm bắt đầu:</label>
              <input type="datetime-local" className="w-full" style={{ padding: '8px', fontSize: '14px' }} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button className="btn-glass flex-1" onClick={() => setShowTimer(false)}>Hủy</button>
                <button className="btn-glass flex-1" style={{ background: 'rgba(59, 130, 246, 0.5)', border: '1px solid rgba(96, 165, 250, 0.5)' }} onClick={() => {
                  setShowTimer(false);
                  alert('Đã thiết lập hẹn giờ thành công! Hệ thống sẽ tự động kích hoạt ngầm.');
                  setTimeout(() => {
                    handleStart();
                  }, 4000);
                }}>Lưu Hẹn Giờ</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showWarning && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: '24px', width: '380px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.5)', boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>⚠️</div>
            <h3 style={{ color: '#fca5a5', marginTop: 0, marginBottom: '12px' }}>CẢNH BÁO AN TOÀN</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              Vui lòng <strong>KHÔNG</strong> nhập tài khoản và mật khẩu <strong>THẬT</strong> của bạn tại đây để tránh các rủi ro đáng tiếc!
            </p>
            <button className="btn-glass" style={{ padding: '8px 24px', fontSize: '14px', background: 'rgba(239, 68, 68, 0.6)' }} onClick={() => setShowWarning(false)}>
              Đã Rõ
            </button>
          </div>
        </div>
      )}

      {isTrolling && <TrollOverlay onCancel={handleCancel} />}
    </div>
  )
}

export default App
