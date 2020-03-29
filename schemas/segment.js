export default {
  title: 'Segment',
  name: 'segment',
  type: 'object',
  fields: [
    {
      title: 'Header',
      name: 'header',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // Will be ignored if slugify is set
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200)
      }
    },
    {
      title: 'Background',
      name: 'background',
      type: 'string'
    },
    {
      title: 'Main image',
      name: 'mainimage',
      type: 'image',
      options: {
        hotspot: true // <-- Defaults to false
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        },
        {
          // Editing this field will be hidden behind an "Edit"-button
          name: 'attribution',
          type: 'string',
          title: 'Attribution'
        }
      ]
    },
    {
      title: 'Body Text',
      name: 'bodytext',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      title: 'Full-width',
      name: 'fullWidth',
      type: 'boolean'
    },
    {
      title: 'After segment block',
      name: 'postSegment',
      type: 'object',
      fields: [
        {
          title: 'Fullscreen image',
          name: 'image',
          type: 'image',
          options: {
            hotspot: true // <-- Defaults to false
          },
          fields: [
            {
              name: 'backgroundcss',
              type: 'string',
              title: 'Background CSS',
              options: {
                highlighted: true
              }
            }
          ]
        },
        {
          title: 'Call to action',
          name: 'buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {title: 'Text value', name: 'value', type: 'string'},
                {title: 'URL', name: 'url', type: 'string'}
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'quote',
      type: 'string',
      title: 'Quote text'
    }
  ]
};
