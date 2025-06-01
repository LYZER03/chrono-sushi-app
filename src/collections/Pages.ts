import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the page',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for this page (e.g., "about", "store", or "/" for homepage)',
      },
      validate: (value: string | string[] | null | undefined) => {
        const stringValue = Array.isArray(value) ? value[0] : value
        if (!stringValue) return 'Slug is required'
        if (stringValue !== '/' && (!stringValue.startsWith('/') || stringValue.endsWith('/'))) {
          return 'Slug must start with "/" and not end with "/" (except for homepage "/")'
        }
        return true
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'The main content of the page',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO title for the page (optional)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO description for the page (optional)',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this page is published and visible to visitors',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.slug && data.slug !== '/') {
          // Ensure slug starts with / if not homepage
          if (!data.slug.startsWith('/')) {
            data.slug = `/${data.slug}`
          }
          // Remove trailing slash if not homepage
          if (data.slug.endsWith('/') && data.slug !== '/') {
            data.slug = data.slug.slice(0, -1)
          }
        }
        return data
      },
    ],
  },
}