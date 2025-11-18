import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blueprint 3D - Next.js',
  description: 'Blueprint 3D floor planner built with Next.js, TypeScript, and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
