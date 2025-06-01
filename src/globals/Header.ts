import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Header Logo',
    },
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo Text',
      defaultValue: 'Chrono Sushi',
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      minRows: 1,
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
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
        },
      ],
      defaultValue: [
        {
          label: 'Home',
          type: 'internal',
        },
        {
          label: 'Menu',
          type: 'internal',
        },
        {
          label: 'About',
          type: 'internal',
        },
        {
          label: 'Contact',
          type: 'internal',
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call-to-Action Button',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show CTA Button',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Order Now',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Button Link Type',
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
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Internal Page',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled && siblingData?.type === 'internal',
          },
        },
        {
          name: 'externalLink',
          type: 'text',
          label: 'External URL',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled && siblingData?.type === 'external',
          },
        },
      ],
    },
  ],
}