import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Instrument_Serif } from 'next/font/google';
import { ThemeProvider } from './providers';
import { ClientLayout } from '@/components/ClientLayout';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nadipena-varunkumar.vercel.app'),
  title: 'Nadipena Varunkumar — Software Developer & AI Security Practitioner',
  description:
    'Software Developer, AI Security Practitioner, and Bug Bounty Hunter. Building secure systems and shipping intelligent products. Experienced in full-stack development, cloud infrastructure (AWS, Azure), and AI/GenAI security.',
  keywords: [
    'Nadipena Varunkumar',
    'Software Developer',
    'AI Security',
    'Bug Bounty Hunter',
    'Full Stack Developer',
    'Cybersecurity',
    'LangChain',
    'Next.js',
    'Python',
  ],
  authors: [{ name: 'Nadipena Varunkumar' }],
  creator: 'Nadipena Varunkumar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nadipena-varunkumar.vercel.app',
    title: 'Nadipena Varunkumar — Software Developer & AI Security Practitioner',
    description:
      'Building secure systems and shipping intelligent products. Full-stack developer with expertise in AI/GenAI security.',
    siteName: 'Nadipena Varunkumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nadipena Varunkumar — Software Developer & AI Security Practitioner',
    description:
      'Building secure systems and shipping intelligent products.',
    creator: '@varunnadipena',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nadipena Varunkumar',
  url: 'https://nadipena-varunkumar.vercel.app',
  jobTitle: 'Software Developer & AI Security Practitioner',
  worksFor: {
    '@type': 'Organization',
    name: 'Kroll Inc.',
  },
  sameAs: [
    'https://linkedin.com/in/nadipenavarunkumar',
    'https://github.com/Varun9490',
  ],
  email: 'varunnadipena@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressCountry: 'IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ClientLayout>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
