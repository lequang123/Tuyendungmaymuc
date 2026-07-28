import styles from './Footer.module.css';

const quickLinks = [
  { href: '#khoa-hoc', label: 'Khóa Học' },
  { href: '#hoc-phi', label: 'Học Phí' },
  { href: '#quy-trinh', label: 'Quy Trình Nhập Học' },
  { href: '#dia-diem', label: 'Địa Điểm Đào Tạo' },
  { href: '#faq', label: 'Câu Hỏi Thường Gặp' },
  { href: '#lien-he', label: 'Liên Hệ' },
];

const courses = [
  'Vận hành xe nâng hàng',
  'Vận hành máy xúc',
  'Thợ hàn TIG/MIG',
  'Thợ điện dân dụng',
  'Thợ điện công nghiệp',
  'Thợ Nề xây tô',
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="#f5a623" strokeWidth="2"/>
                  <circle cx="14" cy="14" r="5" fill="#f5a623"/>
                </svg>
                <div>
                  <div className={styles.logoMain}>TRUNG TÂM ĐÀO TẠO</div>
                  <div className={styles.logoSub}>Bồi Dưỡng Về Quản Lý</div>
                </div>
              </div>
              <p className={styles.brandDesc}>
                Đào tạo nghề chuyên nghiệp – Học thực chiến – Cấp chứng chỉ toàn quốc. 
                Hỗ trợ tìm việc làm sau đào tạo cho học viên khu vực Thanh Hóa và toàn quốc.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialBtn} aria-label="Facebook" id="footer-facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://zalo.me/0397915136" className={styles.socialBtn} aria-label="Zalo" id="footer-zalo" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.75 14.5c-1.125 1.125-2.75 1.75-4.75 1.75s-3.625-.625-4.75-1.75C6.125 15.375 5.5 13.75 5.5 11.75s.625-3.625 1.75-4.75C8.375 5.875 10 5.25 12 5.25s3.625.625 4.75 1.75C17.875 8.125 18.5 9.75 18.5 11.75s-.625 3.625-1.75 4.75z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={styles.colTitle}>Điều hướng nhanh</h4>
              <ul className={styles.linkList}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.footerLink}>
                      → {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className={styles.colTitle}>Khóa học tiêu biểu</h4>
              <ul className={styles.linkList}>
                {courses.map((c) => (
                  <li key={c}>
                    <a href="#khoa-hoc" className={styles.footerLink}>
                      → {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className={styles.colTitle}>Liên hệ</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactInfoItem}>
                  <span>📍</span>
                  <span>Đào tạo tại Thanh Hóa & Toàn Quốc</span>
                </div>
                <div className={styles.contactInfoItem}>
                  <span>📱</span>
                  <a href="tel:0397915136" className={styles.footerLink}>0397 915 136</a>
                </div>
                <div className={styles.contactInfoItem}>
                  <span>⏰</span>
                  <span>7:00 – 20:00, 7 ngày/tuần</span>
                </div>
                <div className={styles.contactInfoItem}>
                  <span>💬</span>
                  <a href="https://zalo.me/0397915136" className={styles.footerLink} target="_blank" rel="noopener noreferrer">Chat Zalo ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>© 2026 Trung Tâm Đào Tạo Và Bồi Dưỡng Về Quản Lý. Đào tạo nghề tại Thanh Hóa.</p>
          <p className={styles.seoText}>
            Từ khóa: đào tạo nghề Thanh Hóa | học vận hành máy xúc Thanh Hóa | thợ hàn Thanh Hóa | thợ điện Thanh Hóa
          </p>
        </div>
      </div>
    </footer>
  );
}
