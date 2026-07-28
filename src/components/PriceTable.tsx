import styles from './PriceTable.module.css';

const machineData = [
  { stt: '01', name: 'Vận hành xe nâng hàng', price: '3.5 Tr', hot: true },
  { stt: '02', name: 'Vận hành xe nâng người', price: '3.5 Tr', hot: true },
  { stt: '03', name: 'Vận hành trạm trộn bê tông', price: '7.0 Tr', hot: false },
  { stt: '04', name: 'Vận hành máy lu', price: '8.0 Tr', hot: false },
  { stt: '05', name: 'Vận hành máy xúc lật', price: '8.0 Tr', hot: false },
  { stt: '06', name: 'Vận hành máy xúc', price: '7.0 Tr', hot: false },
  { stt: '07', name: 'Vận hành máy ủi', price: '7.0 Tr', hot: false },
  { stt: '08', name: 'Vận hành máy san', price: '7.0 Tr', hot: false },
  { stt: '09', name: 'Vận hành cẩu trục', price: '8.0 Tr', hot: false },
  { stt: '10', name: 'Vận hành cầu tháp', price: '17.0 Tr', hot: false },
  { stt: '11', name: 'Vận hành máy nén khí', price: '6.0 Tr', hot: false },
  { stt: '12', name: 'Vận hành bình nén khí', price: '6.0 Tr', hot: false },
  { stt: '13', name: 'Vận hành nồi hấp', price: '6.0 Tr', hot: false },
  { stt: '14', name: 'Vận hành lò hơi', price: '6.0 Tr', hot: false },
  { stt: '15', name: 'Vận hành cầu tự hành', price: '7.0 Tr', hot: false },
];

const technicalData = [
  { stt: '01', name: 'Thợ Nề (xây tô thực chiến)', price: '23.0 Tr', hot: false },
  { stt: '02', name: 'Thợ giàn giáo', price: '8.0 Tr', hot: false },
  { stt: '03', name: 'Thợ Bê tông', price: '12.0 Tr', hot: false },
  { stt: '04', name: 'Thợ Sơn', price: '17.0 Tr', hot: false },
  { stt: '05', name: 'Thợ Tiện', price: '12.0 Tr', hot: false },
  { stt: '06', name: 'Thợ Mộc', price: '12.0 Tr', hot: false },
  { stt: '07', name: 'Thợ điện dân dụng', price: '13.0 Tr', hot: true },
  { stt: '08', name: 'Thợ điện công nghiệp', price: '17.0 Tr', hot: true },
  { stt: '09', name: 'Thợ hàn (điện) que', price: '14.0 Tr', hot: false },
  { stt: '10', name: 'Thợ hàn cắt gió đá', price: '14.0 Tr', hot: false },
  { stt: '11', name: 'Thợ hàn 3G TIG/MIG', price: '14.0 Tr', hot: true },
  { stt: '12', name: 'Thợ hàn 6G TIG + MIG', price: '20.0 Tr', hot: true },
  { stt: '13', name: 'Thợ hàn full', price: '28.0 Tr', hot: false },
];

export default function PriceTable() {
  return (
    <section className={`section ${styles.section}`} id="hoc-phi">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Bảng học phí</span>
          <h2 className="section-title">Học Phí Nghiệp Vụ Đào Tạo</h2>
          <div className="gradient-line" />
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Học phí trọn gói, bao gồm học liệu và phí thi cấp chứng chỉ. Hỗ trợ trả góp linh hoạt.
          </p>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableGrid}>
            {/* Machine Table */}
            <div className={styles.tableBlock}>
              <div className={styles.tableHeader}>
                <span className={styles.tableHeaderIcon}>🏗️</span>
                <h3>Vận Hành Máy Móc</h3>
              </div>
              <div className={styles.tableScrollWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>TT</th>
                      <th>Tên nghề đào tạo</th>
                      <th>Học phí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineData.map((row) => (
                      <tr key={row.stt} className={row.hot ? styles.hotRow : ''}>
                        <td className={styles.stt}>{row.stt}</td>
                        <td className={styles.name}>
                          {row.name}
                          {row.hot && <span className={`badge badge-hot ${styles.rowBadge}`}>HOT</span>}
                        </td>
                        <td className={styles.price}>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Table */}
            <div className={styles.tableBlock}>
              <div className={styles.tableHeader}>
                <span className={styles.tableHeaderIcon}>🔧</span>
                <h3>Nghề Kỹ Thuật</h3>
              </div>
              <div className={styles.tableScrollWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>TT</th>
                      <th>Tên nghề đào tạo</th>
                      <th>Học phí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicalData.map((row) => (
                      <tr key={row.stt} className={row.hot ? styles.hotRow : ''}>
                        <td className={styles.stt}>{row.stt}</td>
                        <td className={styles.name}>
                          {row.name}
                          {row.hot && <span className={`badge badge-hot ${styles.rowBadge}`}>HOT</span>}
                        </td>
                        <td className={styles.price}>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className={styles.note}>
          <div className={styles.noteIcon}>💡</div>
          <div className={styles.noteContent}>
            <strong>Lưu ý về học phí:</strong> Giá trên là học phí trọn gói bao gồm tài liệu học, thực hành và phí thi cấp chứng chỉ.
            Liên hệ để được tư vấn về chương trình hỗ trợ học phí và chính sách ưu đãi nhóm.
          </div>
        </div>
      </div>
    </section>
  );
}
