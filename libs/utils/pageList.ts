// page list

type pageProps = {
  page: string,
  url: string,
}

export type pageListProps = {
  tab: string,
  pages: pageProps[],
}

const pageList:pageListProps[] = [
  {
    tab: 'RC',
    pages: [
      {
        page:'單筋梁檢核/設計',
        url: '/single-layer-rc-beam',
      }, 
      {
        page: '雙筋梁檢核/設計',
        url: '/double-layer-rc-beam'
      },
    ],
  },
  {
    tab: '鋼結構設計',
    pages: [
      {
        page: '小梁設計',
        url: '/steal-beam',
      }, 
      {
        page: '鋼柱設計',
        url: '/steal-column',
      },
    ],
  },
];

export default pageList;
