import useSWR from 'swr';
import axios from "axios";

// use opensheet for data fetching: https://github.com/benborgers/opensheet

const VERCEL_URL = 'https://opensheet.vercel.app';
const GOOGLESHEET_ID = '1o2iDICELXleh_650qPLICgipiqW86b0fafeXVO_CS9w';

type UseFetchdata = {
  data: any;
  error: any;
}

const fetcher = (url:string) => axios.get(url).then(res => res.data);

const useFetchdata = (tabName:string):UseFetchdata => {
  const { data, error } = useSWR(`${VERCEL_URL}/${GOOGLESHEET_ID}/${tabName}`, fetcher);
  return {
    data,
    error,
  }
};

export default useFetchdata;