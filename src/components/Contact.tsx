'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

const courses = [
  'Vận hành xe nâng hàng',
  'Vận hành xe nâng người',
  'Vận hành máy xúc',
  'Vận hành máy lu',
  'Vận hành cẩu trục',
  'Thợ hàn TIG/MIG',
  'Thợ điện dân dụng',
  'Thợ điện công nghiệp',
  'Thợ Nề xây tô',
  'Khóa học khác...',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to API here
    setSubmitted(true);
  };

  return (
    <section className="section" id="lien-he">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Tư vấn miễn phí</span>
          <h2 className="section-title">Đăng Ký Ngay Hôm Nay</h2>
          <div className="gradient-line" />
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Điền form bên dưới, chúng tôi sẽ liên hệ tư vấn trong vòng 30 phút!
          </p>
        </div>

        <div className={styles.grid}>
          {/* Contact Form */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3>📝 Form Đăng Ký Tư Vấn</h3>
            </div>

            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>🎉</div>
                <h3>Đăng ký thành công!</h3>
                <p>Chúng tôi đã nhận được thông tin của bạn. Nhân viên tư vấn sẽ liên hệ sớm nhất có thể.</p>
                <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                  Đăng ký thêm
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} id="registration-form">
                <div className={styles.formGroup}>
                  <label htmlFor="name">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên của bạn"
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0xxx xxx xxx"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="course">Khóa học quan tâm</label>
                  <select
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">-- Chọn khóa học --</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Câu hỏi hoặc yêu cầu thêm</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Ví dụ: Tôi muốn hỏi về lịch khai giảng tháng 8..."
                    rows={4}
                    className={styles.textarea}
                  />
                </div>

                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} id="form-submit">
                  🚀 Đăng Ký Tư Vấn Ngay
                </button>

                <p className={styles.formNote}>
                  🔒 Thông tin của bạn được bảo mật tuyệt đối. Không spam.
                </p>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className={styles.infoSide}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>📞 Liên hệ trực tiếp</h3>

              <div className={styles.contactItems}>
                <a href="tel:0397915136" className={styles.contactItem} id="contact-phone">
                  <div className={styles.contactIcon} style={{ background: 'rgba(59,130,246,0.15)', borderColor: 'rgba(59,130,246,0.3)' }}>
                    📱
                  </div>
                  <div>
                    <div className={styles.contactLabel}>Điện thoại</div>
                    <div className={styles.contactValue}>0397 915 136</div>
                  </div>
                </a>

                <a href="https://zalo.me/0397915136" className={styles.contactItem} id="contact-zalo" target="_blank" rel="noopener noreferrer">
                  <div className={styles.contactIcon} style={{ background: 'rgba(0,132,255,0.15)', borderColor: 'rgba(0,132,255,0.3)' }}>
                    💬
                  </div>
                  <div>
                    <div className={styles.contactLabel}>Zalo</div>
                    <div className={styles.contactValue}>Chat ngay qua Zalo</div>
                  </div>
                </a>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} style={{ background: 'rgba(34,197,94,0.15)', borderColor: 'rgba(34,197,94,0.3)' }}>
                    ⏰
                  </div>
                  <div>
                    <div className={styles.contactLabel}>Giờ làm việc</div>
                    <div className={styles.contactValue}>7:00 – 20:00 (7 ngày/tuần)</div>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} style={{ background: 'rgba(245,166,35,0.15)', borderColor: 'rgba(245,166,35,0.3)' }}>
                    📍
                  </div>
                  <div>
                    <div className={styles.contactLabel}>Khu vực đào tạo</div>
                    <div className={styles.contactValue}>Thanh Hóa & Toàn Quốc</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Card */}
            <div className={styles.urgencyCard}>
              <div className={styles.urgencyHeader}>
                <span>🔥</span>
                <strong>Tuyển sinh đang diễn ra!</strong>
              </div>
              <p>Lớp sắp khai giảng, số lượng có hạn. Đăng ký ngay để giữ chỗ!</p>
              <div className={styles.urgencyStats}>
                <div className={styles.urgencyStat}>
                  <strong>15</strong>
                  <span>chỗ còn trống</span>
                </div>
                <div className={styles.urgencyStat}>
                  <strong>30+</strong>
                  <span>đã đăng ký</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
