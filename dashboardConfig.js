import {feedSettings} from './dashboardfeed';

export default {
  widgets: [
    {
      name: 'feed-widget',
      options: feedSettings
    },
    {
      name: 'structure-menu',
      layout: {width: 'large', height: 'auto'}
    },
    {
      name: 's3upload',
      layout: {width: 'medium', height: 'auto'}
    }
  ]
};
