'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'Học xong có được cấp chứng chỉ không?',
    answer: 'Có, sau khi hoàn thành khóa học và thi đậu, học viên sẽ được cấp chứng chỉ nghề được Bộ Lao Động - Thương Binh và Xã Hội công nhận. Chứng chỉ có giá trị toàn quốc.',
  },
  {
    question: 'Điều kiện đầu vào của khóa học là gì?',
    answer: 'Không yêu cầu bằng cấp cao. Học viên chỉ cần tốt nghiệp cấp 2 (THCS) trở lên, có sức khỏe tốt. Một số nghề đặc thù (như vận hành máy móc hạng nặng) yêu cầu thêm giấy khám sức khỏe.',
  },
  {
    question: 'Thời gian học mỗi khóa là bao lâu?',
    answer: 'Tùy từng nghề, thời gian đào tạo từ 15 ngày đến 3 tháng. Khóa vận hành xe nâng: 15-20 ngày. Thợ hàn TIG/MIG: 1-3 tháng. Thợ điện dân dụng/công nghiệp: 1-2 tháng.',
  },
  {
    question: 'Có thể học tại Thanh Hóa không hay phải đi tỉnh khác?',
    answer: 'Trung tâm hiện đang tổ chức đào tạo tại khu vực Thanh Hóa. Liên hệ ngay để được tư vấn về địa điểm lớp học gần nhất và lịch khai giảng sắp tới.',
  },
  {
    question: 'Học phí có thể trả góp không?',
    answer: 'Trung tâm hỗ trợ nhiều hình thức thanh toán linh hoạt. Học viên có thể đặt cọc giữ chỗ và thanh toán phần còn lại trước ngày khai giảng. Liên hệ để biết thêm chi tiết về chính sách hỗ trợ học phí.',
  },
  {
    question: 'Sau khi học xong có được giới thiệu việc làm không?',
    answer: 'Có! Trung tâm có mạng lưới đối tác là các doanh nghiệp, công ty xây dựng và nhà máy trên toàn quốc. 95% học viên được giới thiệu và tìm được việc làm ngay sau khi tốt nghiệp.',
  },
  {
    question: 'Tôi ở Thanh Hóa nhưng muốn làm việc tại TP.HCM, có được không?',
    answer: 'Hoàn toàn được! Chứng chỉ có giá trị toàn quốc. Trung tâm cũng có thể kết nối bạn với các doanh nghiệp tại TP.HCM, Bình Dương và các tỉnh phía Nam có nhu cầu tuyển dụng.',
  },
  {
    question: 'Liên hệ với trung tâm như thế nào?',
    answer: 'Bạn có thể liên hệ qua điện thoại, Zalo, hoặc điền form đăng ký trên trang web. Nhân viên tư vấn sẽ phản hồi trong vòng 30 phút trong giờ làm việc (7:00 - 20:00, 7 ngày/tuần).',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`section ${styles.section}`} id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Giải đáp thắc mắc</span>
          <h2 className="section-title">Câu Hỏi Thường Gặp</h2>
          <div className="gradient-line" />
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${openIndex === i ? styles.open : ''}`} id={`faq-${i + 1}`}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className={styles.faqNum}>Q{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.faqText}>{faq.question}</span>
                <span className={styles.faqChevron}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>
              <div className={styles.faqAnswer}>
                <div className={styles.faqAnswerInner}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.contactCta}>
          <p>Còn câu hỏi khác? Liên hệ trực tiếp với chúng tôi!</p>
          <a href="#lien-he" className="btn btn-primary" id="faq-contact-btn">
            Đặt câu hỏi ngay →
          </a>
        </div>
      </div>
    </section>
  );
}
