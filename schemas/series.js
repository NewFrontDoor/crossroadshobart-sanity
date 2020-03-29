import ItemViewer from '../item-viewer';

export default {
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Concluded',
      name: 'concluded',
      type: 'boolean'
    },
    {
      title: 'Items',
      name: 'items',
      type: 'string',
      inputComponent: ItemViewer
    }
  ]
};
