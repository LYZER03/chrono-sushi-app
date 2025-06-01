import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface StorefrontLayoutProps {
  children: React.ReactNode
  className?: string
}

export const StorefrontLayout: React.FC<StorefrontLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`storefront-layout ${className}`}>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}