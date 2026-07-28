import styles from './Process.module.css';

const steps = [
  {
    step: '01',
    icon: '📞',
    title: 'Liên hệ tư vấn',
    desc: 'Gọi điện hoặc nhắn Zalo để được tư vấn miễn phí về khóa học phù hợp với bạn.',
    color: '#3b82f6',
  },
  {
    step: '02',
    icon: '📝',
    title: 'Chuẩn bị hồ sơ',
    desc: '2 hình 3×4, 2 CMND photo, 2 bằng tốt nghiệp photo. Không cần công chứng.',
    color: '#f5a623',
  },
  {
    step: '03',
    icon: '💰',
    title: 'Đóng học phí',
    desc: 'Đóng trực tiếp tại văn phòng hoặc chuyển khoản. Nhận phiếu thu xác nhận.',
    color: '#22c55e',
  },
  {
    step: '04',
    icon: '🎓',
    title: 'Bắt đầu học',
    desc: 'Học lý thuyết kết hợp thực hành thực chiến. Giảng viên hướng dẫn 1-1.',
    color: '#a855f7',
  },
  {
    step: '05',
    icon: '📜',
    title: 'Nhận chứng chỉ',
    desc: 'Thi kiểm tra kết thúc khóa học. Cấp chứng chỉ nghề được công nhận toàn quốc.',
    color: '#ef4444',
  },
  {
    step: '06',
    icon: '💼',
    title: 'Giới thiệu việc làm',
    desc: 'Trung tâm hỗ trợ kết nối với doanh nghiệp đối tác. 95% học viên có việc ngay.',
    color: '#f5a623',
  },
];

const documents = [
  '2 hình 3×4 (mới chụp)',
  '2 bản photo CMND/CCCD',
  '2 bản photo bằng tốt nghiệp',
  'Không cần công chứng',
];

const registrationMethods = [
  {
    icon: '📱',
    title: 'Đăng ký qua Zalo/Điện thoại',
    desc: 'Nhắn tin hoặc gọi điện để đăng ký. Nhân viên hỗ trợ 7 ngày/tuần.',
    color: '#f5a623',
  },
];

export default function Process() {
  return (
    <section className="section section-alt" id="quy-trinh">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Quy trình nhập học</span>
          <h2 className="section-title">Từ Đăng Ký Đến Có Việc Làm</h2>
          <div className="gradient-line" />
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Quy trình đơn giản, nhanh chóng – chỉ vài bước là bạn đã bắt đầu hành trình học nghề
          </p>
        </div>

        {/* Steps */}
        <div className={styles.stepsGrid}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepCard} style={{ '--accent': step.color } as React.CSSProperties}>
              <div className={styles.stepNumber}>{step.step}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              {i < steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>

        {/* Documents & Methods */}
        <div className={styles.infoGrid}>
          {/* Documents */}
          <div className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <span className={styles.infoIcon}>📋</span>
              <h3>Hồ Sơ Nhập Học</h3>
            </div>
            <ul className={styles.docList}>
              {documents.map((doc, i) => (
                <li key={i} className={styles.docItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Methods */}
          <div className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <span className={styles.infoIcon}>📌</span>
              <h3>Hình Thức Đăng Ký</h3>
            </div>
            <div className={styles.methods}>
              {registrationMethods.map((method, i) => (
                <div key={i} className={styles.methodItem} style={{ '--accent': method.color } as React.CSSProperties}>
                  <div className={styles.methodIcon}>{method.icon}</div>
                  <div>
                    <div className={styles.methodTitle}>{method.title}</div>
                    <div className={styles.methodDesc}>{method.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
