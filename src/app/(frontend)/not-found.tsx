import React from 'react'
import Link from 'next/link'
import { StorefrontLayout } from '@/components/StorefrontLayout'
import './storefront.css'

export default function NotFound() {
  return (
    <StorefrontLayout>
      <div className="error-404">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for doesn't exist or no pages have been created yet.
        </p>
        <Link href="/">
          Return to Home
        </Link>
      </div>
    </StorefrontLayout>
  )
}