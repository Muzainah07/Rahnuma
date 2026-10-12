import './globals.css';

export const metadata = {
  title: 'Rahnuma - Women Career & Skill Navigator Pakistan',
  description: 'AI-powered career matching, skill gap analysis, and course recommendations tailored for women in Pakistan.',
  openGraph: {
    title: 'Rahnuma - Women Career & Skill Navigator Pakistan',
    description: 'AI-powered career matching, skill gap analysis, and course recommendations tailored for women in Pakistan.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahnuma - Women Career & Skill Navigator Pakistan',
    description: 'AI-powered career matching, skill gap analysis, and course recommendations tailored for women in Pakistan.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
