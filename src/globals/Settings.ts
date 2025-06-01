import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Name',
      required: true,
      defaultValue: 'Chrono Sushi',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'Site Description',
      required: true,
      defaultValue: 'Fresh sushi delivered to your door',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Defaults',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Default Meta Title',
          defaultValue: 'Chrono Sushi - Fresh Sushi Delivery',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Default Meta Description',
          defaultValue: 'Order fresh, high-quality sushi delivered straight to your door. Fast delivery, authentic flavors.',
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Default Keywords',
          defaultValue: 'sushi, delivery, fresh, japanese food, restaurant',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Default Open Graph Image',
        },
      ],
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
          label: 'Physical Address',
        },
      ],
    },
  ],
}