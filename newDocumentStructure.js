import S from '@sanity/base/structure-builder';

export default [
  ...S.defaultInitialValueTemplateItems(),
  S.initialValueTemplateItem()
    .id('sunday-sermon')
    .title('NormalSermon')
];
