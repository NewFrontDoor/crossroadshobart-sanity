export default {
  name: 'submission',
  title: 'Form submission',
  type: 'document',
  fields: [
    {
      name: 'datetime',
      title: 'Submission Date/Time',
      type: 'datetime',
      readOnly: 'true'
    },
    {
      name: 'values',
      title: 'Values',
      type: 'text',
      readOnly: 'true'
    }
  ]
};
