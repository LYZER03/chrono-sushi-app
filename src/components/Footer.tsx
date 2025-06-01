import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Footer as FooterType, Media } from '@/payload-types'

export const Footer: React.FC = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  let footerData: FooterType | null = null
  
  try {
    footerData = await payload.findGlobal({
      slug: 'footer',
    })
  } catch (error) {
    console.error('Error fetching footer data:', error)
  }
  
  const description = footerData?.description || 'Fresh sushi delivered with precision timing.'
  const quickLinks = footerData?.quickLinks || []
  const contact = footerData?.contact
  const socialMedia = footerData?.socialMedia || []
  const newsletter = footerData?.newsletter
  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} Chrono Sushi. All rights reserved.`
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            {footerData?.logo && typeof footerData.logo === 'object' ? (
              <img 
                src={(footerData.logo as Media).url || ''} 
                alt={(footerData.logo as Media).alt || 'Footer Logo'}
                style={{ height: '40px', marginBottom: '10px' }}
              />
            ) : (
              <h3>Chrono Sushi</h3>
            )}
            <p>{description}</p>
            {socialMedia.length > 0 && (
              <div className="social-media">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ marginRight: '10px' }}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {quickLinks.length > 0 && (
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link, index) => {
                  const href = link.type === 'internal' && link.internalLink && typeof link.internalLink === 'object'
                    ? `/${link.internalLink.slug === '/' ? '' : link.internalLink.slug}`
                    : link.type === 'external' && link.externalLink
                    ? link.externalLink
                    : '/'
                  
                  return (
                    <li key={index}>
                      <Link href={href}>{link.label}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          
          {contact && (
            <div className="footer-section">
              <h4>Contact</h4>
              {contact.email && <p>Email: {contact.email}</p>}
              {contact.phone && <p>Phone: {contact.phone}</p>}
              {contact.address && <p>Address: {contact.address}</p>}
              {contact.hours && <p>Hours: {contact.hours}</p>}
            </div>
          )}
          
          {newsletter?.enabled && (
            <div className="footer-section">
              <h4>{newsletter.title || 'Newsletter'}</h4>
              <p>{newsletter.description}</p>
              {/* Newsletter signup form would go here */}
            </div>
          )}
        </div>
        <div className="footer-bottom">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  )
}