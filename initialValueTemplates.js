import T from '@sanity/base/initial-value-template-builder';
import client from 'part:@sanity/base/client';

const filtered = ['LayoutHome', 'gridblock', 'links'];

export default [
  ...T.defaults().filter(item => !filtered.includes(item.spec.value._type)),

  T.template({
    id: 'sunday-sermon',
    title: 'Normal Sermon',
    schemaType: 'sermon',
    value: async () => {
      const sunday = new Date();
      sunday.setDate(sunday.getDate() - sunday.getDay());
      return {
        preachedDate: sunday,
        speaker: {
          _type: 'reference',
          _ref: 'ec300289-65a8-4c56-aa53-304f7d263695'
        },
        series: await client.fetch(`//groq
      *[_type == "series" && concluded == false]{
        "_type": "reference",
          "_ref": _id
        }|order(_updatedAt desc)[0]
    `)
      };
    }
  })
];
