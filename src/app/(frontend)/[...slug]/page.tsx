import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@/payload.config'
import { StorefrontLayout } from '@/components/StorefrontLayout'
import { RichText } from '@/components/RichText'
import '../storefront.css'
import { Page } from '@/payload-types'

interface PageProps {
  params: {
    slug?: string[]
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // Convert slug array to string path
  const slugPath = params.slug ? `/${params.slug.join('/')}` : '/'
  
  try {
    // Find the page by slug
    const pages = await payload.find({
      collection: 'pages',
      where: {
        and: [
          {
            slug: {
              equals: slugPath,
            },
          },
          {
            isPublished: {
              equals: true,
            },
          },
        ],
      },
      limit: 1,
    })

    if (!pages.docs || pages.docs.length === 0) {
      notFound()
    }

    const page = pages.docs[0]

    return (
      <StorefrontLayout>
        <div className="page-content">
          <h1>{page.title}</h1>
          {page.content && <RichText data={page.content} />}
        </div>
      </StorefrontLayout>
    )
  } catch (error) {
    console.error('Error fetching page:', error)
    notFound()
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const slugPath = params.slug ? `/${params.slug.join('/')}` : '/'
  
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        and: [
          {
            slug: {
              equals: slugPath,
            },
          },
          {
            isPublished: {
              equals: true,
            },
          },
        ],
      },
      limit: 1,
    })

    if (!pages.docs || pages.docs.length === 0) {
      return {
        title: '404 - Page Not Found',
        description: 'The requested page could not be found.',
      }
    }

    const page = pages.docs[0]

    return {
      title: page.metaTitle || page.title || 'Chrono Sushi',
      description: page.metaDescription || `${page.title} - Chrono Sushi`,
    }
  } catch (error) {
    return {
      title: 'Chrono Sushi',
      description: 'Fresh sushi delivered with precision timing.',
    }
  }
}