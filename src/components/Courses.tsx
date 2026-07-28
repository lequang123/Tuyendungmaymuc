'use client';

import { useState } from 'react';
import styles from './Courses.module.css';

const coreCourses = [
  { id: 1, name: 'Vận hành xe nâng hàng (Cấp chứng chỉ)', price: 3.5, badge: 'cấp tốc', popular: true },
  { id: 2, name: 'Vận hành xe nâng người', price: 3.5, badge: null },
  { id: 3, name: 'Vận hành máy xúc (máy múc)', price: 7.0, badge: 'hot', popular: true },
  { id: 4, name: 'Vận hành máy xúc lật', price: 8.0, badge: null },
  { id: 5, name: 'Vận hành máy lu (xe lu)', price: 8.0, badge: 'hot' },
  { id: 6, name: 'Thợ hàn 3G TIG/MIG (Công nghệ hàn)', price: 14.0, badge: 'new', popular: true },
  { id: 7, name: 'Thợ hàn 6G TIG + MIG', price: 20.0, badge: 'hot' },
  { id: 8, name: 'Thợ hàn full (Tay nghề cao)', price: 28.0, badge: 'popular' },
];

const otherCourses = [
  { id: 10, name: 'Vận hành trạm trộn bê tông', price: 7.0, badge: null },
  { id: 11, name: 'Vận hành máy ủi / máy san', price: 7.0, badge: null },
  { id: 12, name: 'Vận hành cẩu trục / cầu tháp', price: 8.0, badge: null },
  { id: 13, name: 'Vận hành máy nén khí / bình nén khí', price: 6.0, badge: null },
  { id: 14, name: 'Vận hành lò hơi / nồi hấp', price: 6.0, badge: null },
  { id: 15, name: 'Thợ Nề (xây tô thực chiến)', price: 23.0, badge: 'new' },
  { id: 16, name: 'Thợ giàn giáo / Thợ bê tông', price: 8.0, badge: null },
  { id: 17, name: 'Thợ Sơn / Thợ Mộc / Thợ Tiện', price: 12.0, badge: null },
  { id: 18, name: 'Thợ điện dân dụng', price: 13.0, badge: 'popular' },
  { id: 19, name: 'Thợ điện công nghiệp', price: 17.0, badge: 'popular' },
];

const badgeConfig: Record<string, { label: string; className: string }> = {
  hot: { label: '🔥 HOT', className: 'badge-hot' },
  new: { label: '✨ MỚI', className: 'badge-new' },
  popular: { label: '⭐ PHỔ BIẾN', className: 'badge-popular' },
  'cấp tốc': { label: '⚡ CẤP TỐC', className: 'badge-new' },
};

type Course = {
  id: number;
  name: string;
  price: number;
  icon?: string;
  badge: string | null;
  popular?: boolean;
};

function CourseCard({ course }: { course: Course }) {
  return (
    <div className={`${styles.courseCard} ${course.popular ? styles.featured : ''}`} id={`course-${course.id}-${course.name.toLowerCase().replace(/\s+/g, '-')}`}>
      {course.badge && (
        <span className={`badge ${badgeConfig[course.badge].className} ${styles.courseBadge}`}>
          {badgeConfig[course.badge].label}
        </span>
      )}
      {course.icon && <div className={styles.courseIcon}>{course.icon}</div>}
      <h3 className={styles.courseName}>{course.name}</h3>
      <div className={styles.coursePrice}>
        <span className={styles.priceAmount}>{course.price.toFixed(1)} Tr</span>
        <span className={styles.priceUnit}>đồng</span>
      </div>
      <a href="#lien-he" className={`btn ${course.popular ? 'btn-accent' : 'btn-primary'} ${styles.courseBtn}`}>
        Đăng Ký Học
      </a>
    </div>
  );
}

export default function Courses() {
  const [showAll, setShowAll] = useState(true);

  return (
    <section className="section" id="khoa-hoc">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Đào tạo trọng điểm</span>
          <h2 className="section-title">Khóa Học Xe Nâng • Máy Múc • Xe Lu • Hàn</h2>
          <div className="gradient-line" />
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Các khóa đào tạo thực chiến hàng đầu – Đào tạo cấp tốc, hỗ trợ thi cấp chứng chỉ nhanh gọn tại Thanh Hóa.
          </p>
        </div>

        {/* Core Courses Display */}
        <h3 className={styles.subHeading}>🎯 Chương Trình Đào Tạo Trọng Điểm</h3>
        <div className={styles.grid}>
          {coreCourses.map((course) => (
            <CourseCard key={`core-${course.id}-${course.name}`} course={course} />
          ))}
        </div>

        {/* Other Courses Accordion/Toggle */}
        <div className={styles.otherSection}>
          <div className={styles.divider}>
            <span className={styles.dividerText}>Các ngành nghề đào tạo khác</span>
          </div>

          {!showAll ? (
            <div className={styles.toggleWrapper}>
              <button className="btn btn-outline" onClick={() => setShowAll(true)} id="btn-show-all-courses">
                📂 Xem thêm các khóa đào tạo khác ({otherCourses.length} nghề) ↓
              </button>
            </div>
          ) : (
            <div className={styles.animatedContent}>
              <div className={styles.grid}>
                {otherCourses.map((course) => (
                  <CourseCard key={`other-${course.id}-${course.name}`} course={course} />
                ))}
              </div>
              <div className={styles.toggleWrapper} style={{ marginTop: '2rem' }}>
                <button className="btn btn-outline" onClick={() => setShowAll(false)} id="btn-hide-courses">
                  🔺 Thu gọn danh sách ↑
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Hỗ trợ tư vấn hồ sơ và lớp học tại chỗ cho doanh nghiệp tại Thanh Hóa
          </p>
          <a href="#lien-he" className="btn btn-primary" id="courses-contact-btn">
            Tư vấn thủ tục cấp chứng chỉ →
          </a>
        </div>
      </div>
    </section>
  );
}
