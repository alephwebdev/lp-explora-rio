import type { Metadata } from "next";
import { Lora, Instrument_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://www.explorario.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Explora Rio",
    template: "%s | Explora Rio",
  },
  description:
    "Explora Rio é um game de exploração 3D que promove o turismo no Vale do Café, especialmente em Vassouras — onde a história é contada pelos escravos e barões que moldaram a região.",
  keywords: [
    "Explora Rio",
    "game",
    "exploração 3D",
    "turismo",
    "Vale do Café",
    "Vassouras",
    "história",
    "escravidão",
    "barões do café",
    "Rio de Janeiro",
  ],
  authors: [{ name: "Explora Rio", url: BASE_URL }],
  creator: "Explora Rio",
  publisher: "Explora Rio",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Explora Rio",
    title: "Explora Rio — Game de Exploração no Vale do Café",
    description:
      "Explore Vassouras em um game 3D imersivo. Conheça a história do Vale do Café narrada pelos escravos e barões que construíram esta região.",
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Explora Rio — Game de Exploração no Vale do Café",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explora Rio — Game de Exploração no Vale do Café",
    description:
      "Explore Vassouras em um game 3D imersivo. Conheça a história do Vale do Café narrada pelos escravos e barões que construíram esta região.",
    images: ["/open-graph.png"],
  },
  other: {
    "github-repo": "https://github.com/alephwebdev/lp-explora-rio.git",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
