import {FaCogs} from 'react-icons/fa';

export default {
  name: 'config',
  title: 'Config',
  icon: FaCogs,
  type: 'document',
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      title: 'Banner',
      name: 'frontbanner',
      type: 'reference',
      to: [{type: 'bannerblock'}]
    },
    {
      name: 'maintenance',
      title: 'Maintenance mode',
      type: 'boolean'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image'
    },
    {
      name: 'themecolors',
      title: 'Theme colours',
      type: 'object',
      fields: [
        {
          title: 'Base',
          name: 'base',
          type: 'color',
          options: {
            disableAlpha: true
          }
        },
        {
          title: 'Accent',
          name: 'accent',
          type: 'color',
          options: {
            disableAlpha: true
          }
        },
        {
          title: 'Highlight',
          name: 'highlight',
          type: 'color',
          options: {
            disableAlpha: true
          }
        },
        {
          title: 'Lowlight',
          name: 'lowlight',
          type: 'color',
          options: {
            disableAlpha: true
          }
        },
        {
          title: 'Black',
          name: 'black',
          type: 'color',
          options: {
            disableAlpha: true
          }
        },
        {
          title: 'White',
          name: 'white',
          type: 'color',
          options: {
            disableAlpha: true
          }
        }
      ]
    }
  ]
};
