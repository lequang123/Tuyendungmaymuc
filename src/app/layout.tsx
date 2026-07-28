import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const BASE_URL = "https://www.truongdaotaonghethanhhoa.online";

// 🔑 Thay bằng Measurement ID thực của bạn (GA4 → Admin → Data Streams)
const GA_ID = "G-XXXXXXXXXX";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  // ✅ metadataBase — bắt buộc để Next.js resolve URL tương đối (OG image, canonical)
  metadataBase: new URL(BASE_URL),

  // ✅ Title ≤ 60 ký tự — tránh bị Google cắt trên SERP
  title: "Chứng Chỉ Xe Nâng, Máy Múc, Hàn tại Thanh Hóa 2026",
  description:
    "Đào tạo & cấp chứng chỉ nghề Xe Nâng, Máy Múc, Xe Lu, Thợ Hàn tại Thanh Hóa và toàn quốc. Chuẩn Bộ LĐ-TB&XH, học phí ưu đãi, thủ tục nhanh gọn.",
  keywords: [
    // Toàn quốc
    "cấp chứng chỉ xe nâng toàn quốc",
    "học lái máy múc toàn quốc",
    "cấp chứng chỉ máy xúc toàn quốc",
    "học lái xe lu toàn quốc",
    "cấp chứng chỉ xe lu toàn quốc",
    "đào tạo thợ hàn toàn quốc",
    "trung tâm đào tạo nghề toàn quốc",
    "chứng chỉ vận hành máy móc toàn quốc",
    "học lái xe lu cấp chứng chỉ",
    "vận hành cẩu trục chứng chỉ",
    // Thanh Hóa
    "cấp chứng chỉ xe nâng Thanh Hóa",
    "học lái máy múc Thanh Hóa",
    "học lái máy xúc Thanh Hóa",
    "cấp chứng chỉ máy múc Thanh Hóa",
    "học lái xe lu Thanh Hóa",
    "cấp chứng chỉ xe lu Thanh Hóa",
    "chứng chỉ xe nâng Thanh Hóa",
    "đào tạo thợ hàn Thanh Hóa",
    "trung tâm đào tạo nghề Thanh Hóa",
    "công nghệ hàn Thanh Hóa",
    // Hà Nội
    "cấp chứng chỉ xe nâng Hà Nội",
    "học lái máy múc Hà Nội",
    "cấp chứng chỉ máy múc Hà Nội",
    "học lái xe lu Hà Nội",
    "đào tạo thợ hàn Hà Nội",
    "chứng chỉ vận hành máy móc Hà Nội",
    // Hồ Chí Minh
    "cấp chứng chỉ xe nâng TP HCM",
    "học lái máy múc TP Hồ Chí Minh",
    "cấp chứng chỉ máy múc TP HCM",
    "học lái xe lu TP HCM",
    "đào tạo thợ hàn TP HCM",
    "chứng chỉ xe nâng Sài Gòn",
    // Đà Nẵng
    "cấp chứng chỉ xe nâng Đà Nẵng",
    "học lái máy xúc Đà Nẵng",
    "cấp chứng chỉ máy múc Đà Nẵng",
    "học lái xe lu Đà Nẵng",
    "đào tạo thợ hàn Đà Nẵng",
    // Hải Phòng
    "cấp chứng chỉ xe nâng Hải Phòng",
    "học lái máy múc Hải Phòng",
    "cấp chứng chỉ máy múc Hải Phòng",
    "học lái xe lu Hải Phòng",
    "đào tạo nghề Hải Phòng",
    // Nghệ An
    "cấp chứng chỉ xe nâng Nghệ An",
    "học lái máy xúc Nghệ An",
    "cấp chứng chỉ máy múc Nghệ An",
    "học lái xe lu Nghệ An",
    "đào tạo thợ hàn Nghệ An",
    // Hà Tĩnh
    "cấp chứng chỉ xe nâng Hà Tĩnh",
    "học lái máy múc Hà Tĩnh",
    "cấp chứng chỉ máy múc Hà Tĩnh",
    "học lái xe lu Hà Tĩnh",
    // Quảng Bình
    "cấp chứng chỉ xe nâng Quảng Bình",
    "học lái máy xúc Quảng Bình",
    "cấp chứng chỉ máy múc Quảng Bình",
    "học lái xe lu Quảng Bình",
    // Quảng Trị
    "cấp chứng chỉ xe nâng Quảng Trị",
    "học lái máy múc Quảng Trị",
    "cấp chứng chỉ máy múc Quảng Trị",
    "học lái xe lu Quảng Trị",
    // Thừa Thiên Huế
    "cấp chứng chỉ xe nâng Huế",
    "học lái máy xúc Thừa Thiên Huế",
    "cấp chứng chỉ máy múc Huế",
    "học lái xe lu Huế",
    // Quảng Nam
    "cấp chứng chỉ xe nâng Quảng Nam",
    "học lái máy múc Quảng Nam",
    "cấp chứng chỉ máy múc Quảng Nam",
    "học lái xe lu Quảng Nam",
    // Quảng Ngãi
    "cấp chứng chỉ xe nâng Quảng Ngãi",
    "học lái máy múc Quảng Ngãi",
    "học lái xe lu Quảng Ngãi",
    // Bình Định
    "cấp chứng chỉ xe nâng Bình Định",
    "học lái máy xúc Bình Định",
    "học lái máy múc Bình Định",
    "học lái xe lu Bình Định",
    // Phú Yên
    "cấp chứng chỉ xe nâng Phú Yên",
    "học lái máy múc Phú Yên",
    "học lái xe lu Phú Yên",
    // Khánh Hòa
    "cấp chứng chỉ xe nâng Khánh Hòa",
    "học lái máy múc Nha Trang",
    "học lái máy múc Khánh Hòa",
    "học lái xe lu Khánh Hòa",
    // Bình Dương
    "cấp chứng chỉ xe nâng Bình Dương",
    "học lái máy xúc Bình Dương",
    "cấp chứng chỉ máy múc Bình Dương",
    "học lái xe lu Bình Dương",
    "đào tạo thợ hàn Bình Dương",
    // Đồng Nai
    "cấp chứng chỉ xe nâng Đồng Nai",
    "học lái máy múc Đồng Nai",
    "cấp chứng chỉ máy múc Đồng Nai",
    "học lái xe lu Đồng Nai",
    // Bà Rịa - Vũng Tàu
    "cấp chứng chỉ xe nâng Vũng Tàu",
    "học lái máy xúc Bà Rịa Vũng Tàu",
    "cấp chứng chỉ máy múc Vũng Tàu",
    "học lái xe lu Vũng Tàu",
    // Long An
    "cấp chứng chỉ xe nâng Long An",
    "học lái máy múc Long An",
    "học lái xe lu Long An",
    // Cần Thơ
    "cấp chứng chỉ xe nâng Cần Thơ",
    "học lái máy múc Cần Thơ",
    "cấp chứng chỉ máy múc Cần Thơ",
    "học lái xe lu Cần Thơ",
    // Ninh Bình
    "cấp chứng chỉ xe nâng Ninh Bình",
    "học lái máy múc Ninh Bình",
    "học lái xe lu Ninh Bình",
    // Nam Định
    "cấp chứng chỉ xe nâng Nam Định",
    "học lái máy múc Nam Định",
    "học lái xe lu Nam Định",
    // Thái Bình
    "cấp chứng chỉ xe nâng Thái Bình",
    "học lái máy múc Thái Bình",
    "học lái xe lu Thái Bình",
    // Hà Nam
    "cấp chứng chỉ xe nâng Hà Nam",
    "học lái máy múc Hà Nam",
    "học lái xe lu Hà Nam",
    // Hưng Yên
    "cấp chứng chỉ xe nâng Hưng Yên",
    "học lái máy múc Hưng Yên",
    "học lái xe lu Hưng Yên",
    // Bắc Ninh
    "cấp chứng chỉ xe nâng Bắc Ninh",
    "học lái máy múc Bắc Ninh",
    "học lái xe lu Bắc Ninh",
    // Hải Dương
    "cấp chứng chỉ xe nâng Hải Dương",
    "học lái máy múc Hải Dương",
    "học lái xe lu Hải Dương",
    // Vĩnh Phúc
    "cấp chứng chỉ xe nâng Vĩnh Phúc",
    "học lái máy múc Vĩnh Phúc",
    "học lái xe lu Vĩnh Phúc",
    // Phú Thọ
    "cấp chứng chỉ xe nâng Phú Thọ",
    "học lái máy múc Phú Thọ",
    "học lái xe lu Phú Thọ",
    // Thái Nguyên
    "cấp chứng chỉ xe nâng Thái Nguyên",
    "học lái máy múc Thái Nguyên",
    "học lái xe lu Thái Nguyên",
    // Bắc Giang
    "cấp chứng chỉ xe nâng Bắc Giang",
    "học lái máy múc Bắc Giang",
    "học lái xe lu Bắc Giang",
    // Quảng Ninh
    "cấp chứng chỉ xe nâng Quảng Ninh",
    "học lái máy múc Quảng Ninh",
    "học lái xe lu Quảng Ninh",
    // Lào Cai
    "cấp chứng chỉ xe nâng Lào Cai",
    "học lái máy múc Lào Cai",
    "học lái xe lu Lào Cai",
    // Đắk Lắk
    "cấp chứng chỉ xe nâng Đắk Lắk",
    "học lái máy múc Đắk Lắk",
    "học lái xe lu Đắk Lắk",
    // Gia Lai
    "cấp chứng chỉ xe nâng Gia Lai",
    "học lái máy múc Gia Lai",
    "học lái xe lu Gia Lai",
    // Lâm Đồng
    "cấp chứng chỉ xe nâng Lâm Đồng",
    "học lái máy xúc Đà Lạt",
    "học lái máy múc Lâm Đồng",
    "học lái xe lu Lâm Đồng",
    // Tiền Giang
    "cấp chứng chỉ xe nâng Tiền Giang",
    "học lái máy múc Tiền Giang",
    "học lái xe lu Tiền Giang",
    // Đồng Tháp
    "cấp chứng chỉ xe nâng Đồng Tháp",
    "học lái máy múc Đồng Tháp",
    "học lái xe lu Đồng Tháp",
    // An Giang
    "cấp chứng chỉ xe nâng An Giang",
    "học lái máy múc An Giang",
    "học lái xe lu An Giang",
    // Kiên Giang
    "cấp chứng chỉ xe nâng Kiên Giang",
    "học lái máy múc Kiên Giang",
    "học lái xe lu Kiên Giang",
  ],
  authors: [{ name: "Trung Tâm Đào Tạo Và Bồi Dưỡng Về Quản Lý" }],
  creator: "Trung Tâm Đào Tạo Và Bồi Dưỡng Về Quản Lý",

  // ✅ Canonical URL — ngăn duplicate content (www vs non-www, query string)
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BASE_URL + "/",
    siteName: "Trung Tâm Đào Tạo Nghề Thanh Hóa",
    title: "Chứng Chỉ Xe Nâng, Máy Múc, Hàn tại Thanh Hóa 2026",
    description:
      "Chuyên đào tạo & cấp nhanh chứng chỉ nghề Xe Nâng, Máy Múc, Xe Lu, Thợ Hàn tại Thanh Hóa và toàn quốc. Cam kết uy tín, học phí ưu đãi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trung tâm đào tạo nghề xe nâng máy múc xe lu Thanh Hóa",
      },
    ],
  },

  // ✅ Twitter Card — hiển thị đẹp khi chia sẻ trên X/Twitter
  twitter: {
    card: "summary_large_image",
    title: "Chứng Chỉ Xe Nâng, Máy Múc, Hàn tại Thanh Hóa 2026",
    description:
      "Đào tạo & cấp chứng chỉ nghề Xe Nâng, Máy Múc, Xe Lu, Thợ Hàn tại Thanh Hóa và toàn quốc. Chuẩn Bộ LĐ-TB&XH.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// ✅ EducationalOrganization — 28 khóa học đồng bộ với PriceTable
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Trung Tâm Đào Tạo Và Bồi Dưỡng Về Quản Lý",
  description:
    "Trung tâm đào tạo và cấp chứng chỉ Xe Nâng, Máy Múc, Xe Lu, Công Nghệ Hàn uy tín tại Thanh Hóa và toàn quốc.",
  url: BASE_URL + "/",
  telephone: "+84-397-915-136",
  // ✅ Địa chỉ đầy đủ cho Local SEO & Google Business
  address: {
    "@type": "PostalAddress",
    streetAddress: "Thành phố Thanh Hóa",
    addressLocality: "Thành phố Thanh Hóa",
    addressRegion: "Thanh Hóa",
    addressCountry: "VN",
  },
  areaServed: [
    // Miền Bắc
    "Hà Nội", "Hải Phòng", "Quảng Ninh", "Bắc Ninh", "Bắc Giang",
    "Hải Dương", "Hưng Yên", "Vĩnh Phúc", "Hà Nam", "Nam Định",
    "Thái Bình", "Ninh Bình", "Phú Thọ", "Thái Nguyên", "Bắc Kạn",
    "Cao Bằng", "Lạng Sơn", "Tuyên Quang", "Lào Cai", "Yên Bái",
    "Hà Giang", "Sơn La", "Lai Châu", "Điện Biên", "Hòa Bình",
    // Miền Trung
    "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Bình", "Quảng Trị",
    "Thừa Thiên Huế", "Đà Nẵng", "Quảng Nam", "Quảng Ngãi",
    "Bình Định", "Phú Yên", "Khánh Hòa", "Ninh Thuận", "Bình Thuận",
    // Tây Nguyên
    "Kon Tum", "Gia Lai", "Đắk Lắk", "Đắk Nông", "Lâm Đồng",
    // Miền Nam
    "TP Hồ Chí Minh", "Bình Dương", "Đồng Nai", "Bà Rịa Vũng Tàu",
    "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Vĩnh Long",
    "Đồng Tháp", "An Giang", "Kiên Giang", "Cần Thơ", "Hậu Giang",
    "Sóc Trăng", "Bạc Liêu", "Cà Mau", "Tây Ninh", "Bình Phước",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Chương trình đào tạo nghề",
    itemListElement: [
      // Vận hành máy móc (15 khóa)
      { "@type": "Course", name: "Vận hành xe nâng hàng", offers: { "@type": "Offer", price: "3500000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành xe nâng người", offers: { "@type": "Offer", price: "3500000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành trạm trộn bê tông", offers: { "@type": "Offer", price: "7000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy lu", offers: { "@type": "Offer", price: "8000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy xúc lật", offers: { "@type": "Offer", price: "8000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy xúc (máy múc)", offers: { "@type": "Offer", price: "7000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy ủi", offers: { "@type": "Offer", price: "7000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy san", offers: { "@type": "Offer", price: "7000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành cẩu trục", offers: { "@type": "Offer", price: "8000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành cầu tháp", offers: { "@type": "Offer", price: "17000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy nén khí", offers: { "@type": "Offer", price: "6000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành bình nén khí", offers: { "@type": "Offer", price: "6000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành nồi hấp", offers: { "@type": "Offer", price: "6000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành lò hơi", offers: { "@type": "Offer", price: "6000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành cầu tự hành", offers: { "@type": "Offer", price: "7000000", priceCurrency: "VND" } },
      // Nghề kỹ thuật (13 khóa)
      { "@type": "Course", name: "Thợ Nề (xây tô thực chiến)", offers: { "@type": "Offer", price: "23000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ giàn giáo", offers: { "@type": "Offer", price: "8000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ Bê tông", offers: { "@type": "Offer", price: "12000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ Sơn", offers: { "@type": "Offer", price: "17000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ Tiện", offers: { "@type": "Offer", price: "12000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ Mộc", offers: { "@type": "Offer", price: "12000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ điện dân dụng", offers: { "@type": "Offer", price: "13000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ điện công nghiệp", offers: { "@type": "Offer", price: "17000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ hàn điện que", offers: { "@type": "Offer", price: "14000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ hàn cắt gió đá", offers: { "@type": "Offer", price: "14000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ hàn 3G TIG/MIG", offers: { "@type": "Offer", price: "14000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ hàn 6G TIG + MIG", offers: { "@type": "Offer", price: "20000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Thợ hàn full (tất cả phương pháp)", offers: { "@type": "Offer", price: "28000000", priceCurrency: "VND" } },
    ],
  },
};

// ✅ FAQPage schema — giúp lên rich snippet trên Google
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Chứng chỉ xe nâng có giá trị toàn quốc không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Chứng chỉ do Trung Tâm cấp theo chuẩn Bộ LĐ-TB&XH, có giá trị pháp lý trên toàn quốc và được các doanh nghiệp, khu công nghiệp trên cả nước công nhận.",
      },
    },
    {
      "@type": "Question",
      name: "Học và cấp chứng chỉ xe nâng mất bao lâu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Thời gian đào tạo từ 3–7 ngày tùy loại nghề. Chứng chỉ được cấp nhanh sau khi thi đạt, hỗ trợ cả hình thức thi tại trung tâm hoặc lưu động tại doanh nghiệp.",
      },
    },
    {
      "@type": "Question",
      name: "Học phí có bao gồm phí thi cấp chứng chỉ không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Học phí là trọn gói, bao gồm tài liệu học, thực hành thực tế và toàn bộ phí thi cấp chứng chỉ. Không phát sinh chi phí ẩn.",
      },
    },
    {
      "@type": "Question",
      name: "Trung tâm có dạy tại địa phương hoặc khu công nghiệp không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Chúng tôi hỗ trợ đào tạo lưu động tại doanh nghiệp, khu công nghiệp trên toàn quốc. Liên hệ hotline 0397.915.136 để được tư vấn và báo giá theo nhóm.",
      },
    },
    {
      "@type": "Question",
      name: "Cần mang giấy tờ gì khi đăng ký học?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chỉ cần CCCD/CMND và ảnh thẻ 3×4. Thủ tục đơn giản, nhanh gọn. Có thể đăng ký qua điện thoại hoặc Zalo trước khi đến.",
      },
    },
    {
      "@type": "Question",
      name: "Trung tâm ở đâu tại Thanh Hóa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trung tâm đặt tại thành phố Thanh Hóa. Liên hệ hotline 0397.915.136 để được chỉ dẫn địa chỉ cụ thể và đặt lịch học.",
      },
    },
  ],
};

// ✅ BreadcrumbList schema — hỗ trợ hiển thị breadcrumb trên SERP
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Trang chủ",
      item: BASE_URL + "/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Chứng chỉ nghề",
      item: BASE_URL + "/#hoc-phi",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className={`${beVietnamPro.variable}`}>
        {children}

        {/* ✅ Google Analytics 4 — afterInteractive không block LCP */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
