import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header as HeaderType, Media } from '@/payload-types'

export const Header: React.FC = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  let headerData: HeaderType | null = null
  
  try {
    headerData = await payload.findGlobal({
      slug: 'header',
    })
  } catch (error) {
    console.error('Error fetching header data:', error)
  }
  
  const logoText = headerData?.logoText || 'Chrono Sushi'
  const navigation = headerData?.navigation || []
  const ctaButton = headerData?.ctaButton
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            {headerData?.logo && typeof headerData.logo === 'object' ? (
              <img 
                src={(headerData.logo as Media).url || ''} 
                alt={(headerData.logo as Media).alt || logoText}
                style={{ height: '40px' }}
              />
            ) : (
              <h1>{logoText}</h1>
            )}
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            {navigation.map((item, index) => {
              const href = item.type === 'internal' && item.internalLink && typeof item.internalLink === 'object'
                ? `/${item.internalLink.slug === '/' ? '' : item.internalLink.slug}`
                : item.type === 'external' && item.externalLink
                ? item.externalLink
                : '/'
              
              return (
                <li key={item.id || index}>
                  <Link 
                    href={href} 
                    className="nav-link"
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          {ctaButton?.enabled && (
            <div className="cta-button">
              {(() => {
                const href = ctaButton.type === 'internal' && ctaButton.internalLink && typeof ctaButton.internalLink === 'object'
                  ? `/${ctaButton.internalLink.slug === '/' ? '' : ctaButton.internalLink.slug}`
                  : ctaButton.type === 'external' && ctaButton.externalLink
                  ? ctaButton.externalLink
                  : '/'
                
                return (
                  <Link href={href} className="cta-link">
                    {ctaButton.label || 'Order Now'}
                  </Link>
                )
              })()} 
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}