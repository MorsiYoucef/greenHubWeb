export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent:'center',
          alignItems:'center',
          minHeight: '100vh',
        }}
      >
        <div>AuthLayout</div>
        {children}
      </body>
    </html>
  )
}
