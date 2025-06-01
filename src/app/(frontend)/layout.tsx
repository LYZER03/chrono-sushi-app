import React from 'react'
import './styles.css'
import './storefront.css'

export const metadata = {
  description: 'Fresh sushi delivered with precision timing.',
  title: 'Chrono Sushi',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
