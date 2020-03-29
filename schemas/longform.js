export default {
  name: 'longform',
  title: 'Long form',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: {type: 'speaker'}
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    }
  ],

  preview: {
    select: {
      title: 'title',
      speaker: 'speaker.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const {speaker} = selection;
      return Object.assign({}, selection, {
        subtitle: speaker && `by ${speaker}`
      });
    }
  }
};
