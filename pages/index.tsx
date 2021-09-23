import Head from 'next/head'
import Main from '@/components/Home/Main';
import Author from '@/components/Home/Author';

export default function Home() {

  return (
    <div className="flex-1">
      <Head>
        <title>Civil Structural Calculation Tools</title>
        <meta name="description" content="Tools for Civil Engineers who need calculation for designs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
      <Author />
    </div>
  )
}
