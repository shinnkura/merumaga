import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メルマガ",
  description: "しんぷる保育のメルマガ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
