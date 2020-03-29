import {MdMap} from 'react-icons/md';

export default {
  name: 'LayoutMap',
  title: 'Map Segment',
  type: 'document',
  icon: MdMap,
  fields: [
    {title: 'Map segment name', name: 'name', type: 'string'},
    {
      name: 'details',
      title: 'Detail lines',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Type',
              name: 'type',
              type: 'string',
              options: {
                list: ['email', 'telephone', 'time', 'location'],
                layout: 'dropdown'
              }
            },
            {
              title: 'Title',
              name: 'value',
              type: 'string'
            },
            {
              title: 'Block',
              name: 'block',
              type: 'blockContent'
            }
          ]
        }
      ]
    },
    {
      title: 'Meeting Location',
      name: 'location',
      description:
        'Adding a geopoint to this field will render a map within this segment on the homepage. It will render the following fields irrelevant: background, actions.',
      type: 'object',
      fields: [
        {name: 'location', title: 'Pinned location', type: 'geopoint'},
        {name: 'latcentrepoint', title: 'Latitude centrepoint', type: 'number'},
        {
          name: 'longcentrepoint',
          title: 'Longitude centrepoint',
          type: 'number'
        }
      ]
    }
  ]
};
