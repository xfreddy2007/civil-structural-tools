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
        page:'單筋梁彎矩檢核/設計',
        url: '/single-layer-rc-beam',
      }, 
      {
        page: '雙筋梁彎矩檢核/設計',
        url: '/double-layer-rc-beam'
      },
      {
        page: '梁剪力檢核/設計',
        url: '/shear-rc-beam'
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
  {
    tab: '地震力設計',
    pages: [
      {
        page: '地震力計算',
        url: '/seismic-force',
      }, 
      {
        page: '反應譜生成',
        url: '/response-spectrum',
      },
    ],
  },
];

export default pageList;
