export default {
  name: 'inlineButton',
  title: 'Button',
  type: 'document',
  fields: [
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Ghost', value: 'ghost'},
          {title: 'Warning-ghost', value: 'warning'},
          {title: 'Regular', value: 'regular'}
        ],
        layout: 'dropdown'
      }
    },
    {
      title: 'Button text',
      name: 'action',
      type: 'string',
      description: 'If left blank, will default to "View page"'
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
      validation: Rule => Rule.uri({allowRelative: true})
    }
  ],
  preview: {
    select: {
      title: 'action'
    }
  }
};
