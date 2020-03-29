import {MdLink} from 'react-icons/md';

export default {
  name: 'link',
  title: 'Link',
  icon: MdLink,
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string'
    }
  ]
};
