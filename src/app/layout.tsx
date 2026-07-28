import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "Cấp Chứng Chỉ Xe Nâng, Máy Múc, Xe Lu tại Thanh Hóa & Toàn Quốc 2026",
  description:
    "Đào tạo và cấp tốc chứng chỉ nghề Xe Nâng, Máy Múc (Máy Xúc), Xe Lu, Công Nghệ Hàn tại Thanh Hóa và các tỉnh trên cả nước. Thủ tục nhanh gọn, cấp chứng chỉ chuẩn Bộ LĐ-TB&XH.",
  keywords: [
    "cấp chứng chỉ xe nâng Thanh Hóa",
    "học lái máy múc Thanh Hóa",
    "học lái máy xúc Thanh Hóa",
    "học lái xe lu Thanh Hóa",
    "chứng chỉ xe nâng Thanh Hóa",
    "đào tạo thợ hàn Thanh Hóa",
    "học lái xe nâng toàn quốc",
    "cấp chứng chỉ máy xúc toàn quốc",
    "học nghề lái máy xúc xe nâng",
    "trung tâm đào tạo nghề Thanh Hóa",
    "công nghệ hàn Thanh Hóa",
    "học lái xe lu cấp chứng chỉ",
  ],
  authors: [{ name: "Trung Tâm Đào Tạo Và Bồi Dưỡng Về Quản Lý" }],
  creator: "Trung Tâm Đào Tạo Và Bồi Dưỡng Về Quản Lý",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://daotaonghethanhoa.vn",
    siteName: "Cấp Chứng Chỉ Xe Nâng Máy Múc Xe Lu Toàn Quốc",
    title: "Cấp Chứng Chỉ Xe Nâng, Máy Múc, Xe Lu, Hàn tại Thanh Hóa & Toàn Quốc 2026",
    description:
      "Chuyên đào tạo và cấp nhanh chứng chỉ nghề Xe Nâng, Máy Múc, Xe Lu, Thợ Hàn tại Thanh Hóa và các tỉnh trên cả nước. Cam kết uy tín, học phí ưu đãi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Trung Tâm Đào Tạo Và Bồi Dưỡng Về Quản Lý",
  description:
    "Trung tâm đào tạo và cấp chứng chỉ Xe Nâng, Máy Múc, Xe Lu, Công Nghệ Hàn uy tín tại Thanh Hóa",
  url: "https://daotaonghethanhoa.vn",
  telephone: "+84-397-915-136",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Thanh Hóa",
    addressCountry: "VN",
  },
  areaServed: ["Thanh Hóa", "Miền Trung", "Toàn Quốc"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Khóa học lái máy và thợ hàn trọng điểm",
    itemListElement: [
      { "@type": "Course", name: "Vận hành xe nâng hàng (cấp chứng chỉ)", offers: { "@type": "Offer", price: "3500000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy xúc/máy múc", offers: { "@type": "Offer", price: "7000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Vận hành máy lu/xe lu", offers: { "@type": "Offer", price: "8000000", priceCurrency: "VND" } },
      { "@type": "Course", name: "Công nghệ hàn thợ hàn 3G/6G", offers: { "@type": "Offer", price: "14000000", priceCurrency: "VND" } },
    ],
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${beVietnamPro.variable}`}>{children}</body>
    </html>
  );
}
