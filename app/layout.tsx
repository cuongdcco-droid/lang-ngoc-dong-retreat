import type {Metadata} from 'next';
import './globals.css';
// Page SEO and structured data come from published content in the Worker.
export const metadata:Metadata={icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body>{children}</body></html>;}
