import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import blockContent from './blockContent';
import speaker from './speaker';
import main from './main';
import config from './config';
import segment from './segment';
import page from './page';
import modals from './modals';
import link from './link';
import {
  formObject as form,
  formField as formfield,
  formArrayField as formarrayfield
} from '@newfrontdoor/form';
import LayoutHome from './LayoutHome';
import LayoutSpacer from './LayoutSpacer';
import LayoutMap from './LayoutMap';
import themecolor from './themecolor';
import sermon from './sermon';
import series from './series';
import gridblock from './gridblock';
import bannerblock from './bannerblock';
import menuItem from './menuItem';
import person from './person';
import button from './button';
import inlineButton from './inline-button';
import podcast from './podcast';
import submission from './form-submissions';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    speaker,
    person,
    page,
    blockContent,
    main,
    config,
    segment,
    modals,
    link,
    form,
    formfield,
    formarrayfield,
    LayoutHome,
    LayoutMap,
    LayoutSpacer,
    themecolor,
    sermon,
    series,
    gridblock,
    bannerblock,
    menuItem,
    button,
    inlineButton,
    podcast,
    submission
  ])
});
