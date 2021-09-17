import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Civil Structural Calculation Tools</title>
        <meta name="description" content="Tools for Civil Engineers who need calculation for designs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-bold">
        civil structural tools
      </main>
    </div>
  )
}
