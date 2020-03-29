export default {
  name: 'LayoutHome',
  title: 'Home Segment',
  type: 'document',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      name: 'blurb',
      title: 'Blurb',
      type: 'blockContent'
    },
    {
      name: 'style',
      title: 'Layout style',
      type: 'string',
      options: {
        list: ['overlay', 'side-by-side'],
        layout: 'radio'
      }
    },
    {
      title: 'Background',
      name: 'background',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      title: 'Background Colour',
      name: 'backgroundColor',
      type: 'color'
    }
  ]
};
