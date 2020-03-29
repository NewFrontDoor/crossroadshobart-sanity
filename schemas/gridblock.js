export default {
  name: 'gridblock',
  title: 'Grid block',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Block identifier',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      description:
        "This is optional - often you won't want a header for your grid types"
    },
    {
      name: 'columns',
      title: 'Number of grid columns',
      description:
        'This number defines the default maximum number of columns per view. However on smaller screens, content will wrap onto more rows with reduced columns.',
      type: 'number'
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Card style', value: 'card'},
          {title: 'Horizontal card style', value: 'horizontal'},
          {title: 'Overlay style', value: 'overlay'},
          {title: 'People', value: 'people'},
          {title: 'Home card', value: 'homecard'}
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'blocks',
      title: 'Items',
      type: 'array',
      of: [
        {
          title: 'Action Item',
          name: 'griditem',
          type: 'object',
          fields: [
            {
              title: 'Header',
              name: 'header',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              title: 'Description',
              name: 'description',
              type: 'text',
              rows: 5
            },
            {
              title: 'Action',
              name: 'action',
              type: 'string',
              description: 'If left blank, will default to "View page"'
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: Rule => Rule.uri({allowRelative: true})
            },
            {
              title: 'Image',
              name: 'image',
              type: 'image',
              validation: Rule => Rule.required()
            }
          ]
        },
        {
          title: 'Reference Item',
          type: 'reference',
          to: [{type: 'page'}, {type: 'person'}]
        },
        {
          title: 'Blank Item',
          name: 'blank',
          type: 'object',
          fields: [{title: 'id', name: 'id', type: 'string'}]
        }
      ],
      options: {
        canDuplicate: true
      }
    }
  ],
  preview: {
    select: {
      id: 'id',
      header: 'header'
    },
    prepare(selection) {
      const {id, header} = selection;
      return {
        title: id ? id : header,
        subtitle: id ? header : ''
      };
    }
  }
};
