import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Footer Description',
      defaultValue: 'Fresh sushi delivered to your door with authentic Japanese flavors.',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
        },
        {
          name: 'hours',
          type: 'textarea',
          label: 'Business Hours',
          defaultValue: 'Mon-Sun: 11:00 AM - 10:00 PM',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'array',
      label: 'Social Media Links',
      maxRows: 10,
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Twitter',
              value: 'twitter',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
            {
              label: 'TikTok',
              value: 'tiktok',
            },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
          required: true,
        },
      ],
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      maxRows: 10,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: true,
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Link Type',
          options: [
            {
              label: 'Internal Page',
              value: 'internal',
            },
            {
              label: 'External URL',
              value: 'external',
            },
          ],
          defaultValue: 'internal',
          required: true,
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Internal Page',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'externalLink',
          type: 'text',
          label: 'External URL',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'external',
          },
        },
      ],
      defaultValue: [
        {
          label: 'Privacy Policy',
          type: 'internal',
        },
        {
          label: 'Terms of Service',
          type: 'internal',
        },
        {
          label: 'FAQ',
          type: 'internal',
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Signup',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Newsletter Signup',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Newsletter Title',
          defaultValue: 'Stay Updated',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Newsletter Description',
          defaultValue: 'Subscribe to get special offers and updates on new menu items.',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2024 Chrono Sushi. All rights reserved.',
    },
  ],
}