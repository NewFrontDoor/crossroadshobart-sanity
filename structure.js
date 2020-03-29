import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import {FaCogs} from 'react-icons/fa';
import {
  MdMap,
  MdReceipt,
  MdHome,
  MdVideoLibrary,
  MdViewAgenda,
  MdCollectionsBookmark,
  MdInsertDriveFile
} from 'react-icons/md';

export default () => {
  return S.list()
    .title('Website Content and Settings')
    .items([
      S.listItem()
        .title('Home and Menu')
        .icon(MdHome)
        .child(
          S.editor()
            .title('Home and Menu')
            .id('global-main')
            .schemaType('main')
            .documentId('global-main')
        ),
      S.listItem()
        .title('Segments')
        .icon(MdViewAgenda)
        .child(
          S.list()
            .title('Segments')
            .items([
              S.listItem()
                .title('Normal segments')
                .icon(MdReceipt)
                .child(
                  S.documentTypeList('LayoutHome')
                    .title('Segments')
                    .defaultOrdering([{field: 'heading', direction: 'asc'}])
                ),
              S.listItem()
                .title('Spacer segments')
                .icon(MdReceipt)
                .child(
                  S.documentTypeList('LayoutSpacer')
                    .title('Segments')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('Map segments')
                .icon(MdMap)
                .child(
                  S.documentTypeList('LayoutMap')
                    .title('Segments')
                    .defaultOrdering([{field: 'heading', direction: 'asc'}])
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(MdInsertDriveFile)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Content blocks')
        .icon(MdCollectionsBookmark)
        .child(
          S.list()
            .title('Content blocks')
            .items([
              S.listItem()
                .title('Forms')
                .child(
                  S.documentTypeList('form')
                    .title('Forms')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('Grid blocks')
                .child(
                  S.documentTypeList('gridblock')
                    .title('Grid blocks')
                    .defaultOrdering([{field: 'id', direction: 'asc'}])
                ),
              S.listItem()
                .title('Banners and Popovers')
                .child(
                  S.documentTypeList('bannerblock')
                    .title('Banners and Popovers')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('Buttons')
                .child(
                  S.documentTypeList('button')
                    .title('Buttons')
                    .defaultOrdering([{field: 'id', direction: 'asc'}])
                )
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Categories and classes')
        .icon(MdCollectionsBookmark)
        .child(
          S.list()
            .title('Categories and classes')
            .items([
              S.listItem()
                .title('Speakers')
                .child(
                  S.documentTypeList('speaker')
                    .title('Speakers')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
              S.listItem()
                .title('People')
                .child(
                  S.documentTypeList('person')
                    .title('People')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
              S.listItem()
                .title('Series')
                .child(
                  S.documentTypeList('series')
                    .title('Series')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                )
            ])
        ),
      S.listItem()
        .title('Sermons')
        .icon(MdVideoLibrary)
        .child(
          S.documentTypeList('sermon')
            .title('Sermons')
            .defaultOrdering([{field: 'preachedDate', direction: 'desc'}])
        ),
      S.divider(),
      S.listItem()
        .title('Podcasts metadata')
        .icon(MdVideoLibrary)
        .child(S.documentTypeList('podcast').title('Podcasts')),
      S.listItem()
        .title('Form submissions')
        .child(S.documentTypeList('submission').title('Form submissions')),
      S.listItem()
        .title('Config')
        .icon(FaCogs)
        .child(
          S.editor()
            .id('config')
            .title('Config')
            .schemaType('config')
            .documentId('global-config')
        )
    ]);
};
