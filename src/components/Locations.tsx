import styles from './Locations.module.css';

const locations = [
  {
    id: 1,
    name: 'Cơ sở Thanh Hóa',
    address: 'Khu vực Thanh Hóa – Liên hệ để biết địa điểm đào tạo gần nhất',
    icon: '📍',
    featured: true,
    tag: 'Gần bạn nhất',
  },
  {
    id: 2,
    name: 'Cơ sở Hà Nội & Thái Nguyên',
    address: 'Miền Bắc – Hà Nội, Thái Nguyên, Quảng Ninh',
    icon: '🏙️',
    featured: false,
    tag: 'Miền Bắc',
  },
  {
    id: 3,
    name: 'Cơ sở Hải Dương',
    address: 'Thôn Phạm Trung, Toàn Thắng, Gia Lộc, Hải Dương',
    icon: '📍',
    featured: false,
    tag: 'Miền Bắc',
  },
  {
    id: 4,
    name: 'Cơ sở TP. HCM',
    address: '55/23 đường TL19, P. Thạnh Lộc, Quận 12, TP. HCM',
    icon: '🌆',
    featured: false,
    tag: 'Miền Nam',
  },
  {
    id: 5,
    name: 'Cơ sở Bình Dương',
    address: 'Bình Dương – liên hệ để biết địa điểm chi tiết',
    icon: '📍',
    featured: false,
    tag: 'Miền Nam',
  },
  {
    id: 6,
    name: 'Cơ sở Đồng Tháp',
    address: 'Số 85 Ấp Phú Long, Xã Tân Dương, Tỉnh Đồng Tháp',
    icon: '📍',
    featured: false,
    tag: 'Miền Tây',
  },
  {
    id: 7,
    name: 'Cơ sở Quy Nhơn – Bình Định',
    address: '5555 QL 1A, P. Bùi Thị Xuân, TP. Quy Nhơn, Bình Định',
    icon: '📍',
    featured: false,
    tag: 'Miền Trung',
  },
  {
    id: 8,
    name: 'Cơ sở Quảng Ngãi',
    address: 'Thôn 3, Xã Nghĩa Dõng, TP. Quảng Ngãi, Tỉnh Quảng Ngãi',
    icon: '📍',
    featured: false,
    tag: 'Miền Trung',
  },
];

export default function Locations() {
  return (
    <section className="section" id="dia-diem">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Hệ thống đào tạo</span>
          <h2 className="section-title">Địa Điểm Đào Tạo Toàn Quốc</h2>
          <div className="gradient-line" />
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Mạng lưới cơ sở rộng khắp – Đào tạo và hỗ trợ cấp chứng chỉ tại Thanh Hóa và các tỉnh trên cả nước.
          </p>
        </div>

        {/* Coverage banner */}
        <div className={styles.coverageBanner}>
          <div className={styles.coverageStat}>
            <div className={styles.coverageNum}>8+</div>
            <div className={styles.coverageLabel}>Cơ sở toàn quốc</div>
          </div>
          <div className={styles.coverageDivider} />
          <div className={styles.coverageStat}>
            <div className={styles.coverageNum}>5</div>
            <div className={styles.coverageLabel}>Vùng địa lý</div>
          </div>
          <div className={styles.coverageDivider} />
          <div className={styles.coverageStat}>
            <div className={styles.coverageNum}>63</div>
            <div className={styles.coverageLabel}>Tỉnh thành hỗ trợ</div>
          </div>
        </div>

        {/* Location Cards */}
        <div className={styles.grid}>
          {locations.map((loc) => (
            <div key={loc.id} className={`${styles.locCard} ${loc.featured ? styles.featured : ''}`} id={`location-${loc.id}`}>
              {loc.featured && (
                <div className={styles.featuredBadge}>
                  ⭐ Gần bạn nhất
                </div>
              )}
              <div className={styles.locTop}>
                <span className={styles.locIcon}>{loc.icon}</span>
                <span className={`${styles.locTag} ${loc.featured ? styles.tagFeatured : ''}`}>
                  {loc.tag}
                </span>
              </div>
              <h3 className={styles.locName}>{loc.name}</h3>
              <p className={styles.locAddress}>{loc.address}</p>
              <a href="#lien-he" className={`${styles.locBtn} ${loc.featured ? styles.locBtnFeatured : ''}`}>
                {loc.featured ? 'Đăng ký tại Thanh Hóa →' : 'Tìm hiểu thêm →'}
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p>Không tìm thấy cơ sở gần bạn? Chúng tôi có thể tổ chức đào tạo tại địa phương của bạn!</p>
          <a href="#lien-he" className="btn btn-primary" id="location-cta">
            Liên hệ ngay để biết thêm →
          </a>
        </div>
      </div>
    </section>
  );
}
