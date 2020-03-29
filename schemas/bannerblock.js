export default {
  name: 'bannerblock',
  title: 'Banner block',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      description:
        "This is optional - you won't always want a header on your banners"
    },
    {
      name: 'id',
      title: 'Block identifier',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean'
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      description:
        'Choose your style. Top bar will sit below the menu bar, and will not include any styling features (will include links though). Modal overlay will have all styles included.',
      options: {
        list: [
          {title: 'Top bar', value: 'top'},
          {title: 'Modal overlay', value: 'modal'}
        ],
        layout: 'radio'
      }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }
  ]
};
