import '@/app/style/globals.css';
import { Poppins } from 'next/font/google';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://joeliesbeautyhaven.com/'),
  title: 'joelies beauty haven',
  applicationName: 'joeliesbeautyhaven',
  author: 'Torcah',
  images: "https://raw.githubusercontent.com/DarknessMonarch/jolieBeauty/master/public/assets/banner.png",
  description: 'We offer beauty services, hair services and nails services',
  keywords: ['hair', 'beauty', 'salon', 'joeliesbeautyhaven', 'hair product', 'beauty product', 'salon product'],

  openGraph: {
    title: 'joeliesbeautyhaven',
    description: 'We offer beauty services, hair services and nails services',
    url: 'https://joeliesbeautyhaven.com/',
    siteName: 'joeliesbeautyhaven',
    images: "https://raw.githubusercontent.com/DarknessMonarch/jolieBeauty/master/public/assets/banner.png",

  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={poppins.className}>
          {children}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
