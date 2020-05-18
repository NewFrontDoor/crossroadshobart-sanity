export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      description:
        'If this page ought to sit under another page categorically, then choose that page here. Selecting "Ministries" page for example will result in a url such as "crossroadshobart.org/ministries/*your slug here*"',
      to: [
        {
          type: 'page'
        }
      ]
    },
    {
      name: 'shortdescription',
      title: 'Short description',
      type: 'string',
      description:
        'Will be displayed when this page is previewed elsewhere on the site (e.g. ministries page)'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required()
    },
    {
      name: 'backgroundColor',
      title: 'Background Colour',
      type: 'color'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
};
