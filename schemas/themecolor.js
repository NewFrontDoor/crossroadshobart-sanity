export default {
  name: 'themecolor',
  title: 'Theme Colour',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'color',
      title: 'Colour',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }
  ]
};
