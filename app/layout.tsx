import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Làng Sinh Thái Ngọc Đồng | Về Làng, chạm vào một nhịp sống khác',
 description: 'Khám phá Làng Sinh Thái Ngọc Đồng tại Ngọc Đồng – Thục Luyện – Thanh Sơn – Phú Thọ. Một gợi ý nghỉ dưỡng giữa thiên nhiên, kết hợp khám phá đồi chè Long Cốc. Liên hệ 0965163291.',
 ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL), alternates: { canonical: '/' } } : {}),
 icons: { icon: '/favicon.svg' },
 openGraph: { title: 'Làng Sinh Thái Ngọc Đồng', description: 'Về Làng, chạm vào một nhịp sống khác.', locale: 'vi_VN', type: 'website' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
 const schema = { '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: 'Làng Sinh Thái Ngọc Đồng', telephone: '+84965163291', address: { '@type': 'PostalAddress', streetAddress: 'Ngọc Đồng – Thục Luyện', addressLocality: 'Thanh Sơn', addressRegion: 'Phú Thọ', addressCountry: 'VN' }, ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}) };
 return <html lang="vi"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>{children}</body></html>;
}
