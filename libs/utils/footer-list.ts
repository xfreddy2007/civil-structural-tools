// footer list

export type pageProps = {
  page: string,
  url: string,
}

export type footerListProps = {
  title: string,
  tabs: pageProps[],
}

const footerList:footerListProps[] = [
  {
    title: '材料相關',
    tabs: [
      {
        page: '鋼筋規格列表',
        url: '/rebar-spec',
      },
      {
        page: '單位長度配筋面積列表',
        url: '/rebarArea-per-meter'
      }
    ],
  },
  {
    title: '土木相關網頁',
    tabs: [
      {
        page: '營建署',
        url: 'https://www.cpami.gov.tw/',
      },
      {
        page: '考選部',
        url: 'https://wwwc.moex.gov.tw/main/home/wfrmHome.aspx',
      },
      {
        page: '台灣省土木技師公會',
        url: 'http://www.twce.org.tw/',
      },
      {
        page: '台灣省結構技師公會',
        url: 'http://www.newtsea.com.tw/',
      },
    ],
  },
];

export default footerList;
