import {MdVideoLibrary} from 'react-icons/md';

export default {
  name: 'podcast',
  title: 'Podcast',
  icon: MdVideoLibrary,
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string'
    },
    {
      title: 'Summary',
      name: 'summary',
      type: 'string'
    },
    {
      title: 'Language',
      name: 'language',
      type: 'string',
      readOnly: true
    },
    {
      title: 'category',
      name: 'category',
      description:
        "The first item will be the 'main' category, under which any following tags will be child items. We recommend 'Religion & Spirituality' be your first item.",
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        layout: 'tags'
      }
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'string'
    },
    {
      title: 'Copyright text',
      name: 'copyright',
      type: 'string'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Author',
      name: 'author',
      type: 'string'
    },
    {
      title: 'Explicit',
      name: 'explicit',
      type: 'boolean'
    },
    {
      title: 'Owner email',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Owner name',
      name: 'name',
      type: 'string'
    }
  ],
  initialValue: {
    title: 'Crossroads Presbyterian Church Hobart',
    subtitle: 'Sermons from Crossroads Presbyterian Church in Hobart',
    description: 'Crossroads Hobart',
    summary:
      'All the latest sermons from Crossroads Presbyterian Church in Hobart',
    language: 'en',
    category: ['Religion & Spirituality', 'Christianity', 'Spirituality'],
    keywords: 'crossroads presbyterian church hobart, crossroads hobart',
    copyright: '© Crossroads Hobart 2020',
    author: 'Crossroads Presbyterian Church Hobart',
    explicit: false,
    email: 'dan@crossroadshobart.org',
    name: 'Dan Shepheard'
  }
};
