export const metadata = {
  title: 'Al Baraka Investment Fund',
  description: 'Investment Management Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  )
}
