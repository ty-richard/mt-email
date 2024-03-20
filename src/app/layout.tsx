import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar'
import AuthProvider from './context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="flex flex-col items-center justify-center p-6 min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
