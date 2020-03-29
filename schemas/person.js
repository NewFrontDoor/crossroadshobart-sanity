export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5
    },
    {
      name: 'image',
      title: 'Profile image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
