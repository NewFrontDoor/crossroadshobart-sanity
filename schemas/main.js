export default {
  name: 'main',
  title: 'Main',
  type: 'document',
  description: 'experimental description',
  __experimental_actions: [/* 'create', */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      title: 'Main page segments',
      name: 'content',
      description:
        'Add segments below to feature on the front page, create segments using the segment menu to the left',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Segment',
          description: 'Pick a segment from the dropdown list below',
          to: [
            {type: 'LayoutHome'},
            {type: 'LayoutMap'},
            {type: 'LayoutSpacer'}
          ]
        }
      ]
    },
    {
      title: 'Menu items',
      name: 'menuitems',
      description: 'Add pages below to feature in the main menu',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Child page',
          fields: [
            {title: 'Menu text', name: 'text', type: 'string'},
            {
              title: 'Child pages',
              name: 'childpages',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  title: 'Child page',
                  description: 'Pick a page from the dropdown list below',
                  to: [
                    {
                      type: 'page'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Background image',
      name: 'backgroundImage',
      type: 'image'
    }
  ]
};
