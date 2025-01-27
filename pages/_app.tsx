import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import ThemeSwitch from '../components/ThemeSwitch'
import Head from 'next/head'
import PolygonScan from '../components/PolygonScan'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Mover's Polygon faucet"
        />
        <meta
          name="keywords"
          content="mover, matic, faucet, polygon"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="Mover" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matic.btn.sh/" />
        <meta property="og:title" content="Mover's Polygon Faucet" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet"/>
        <meta
          property="og:description"
          content="Mover's Polygon faucet"
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://matic.btn.sh/" />
        <meta
          property="twitter:title"
          content="Polygon Matic Community Faucet"
        />
        <meta
          property="twitter:description"
          content="Mover's Polygon faucet"
        />
        <meta property="twitter:image" content="/banner.png" />
      </Head>
      <ToastContainer hideProgressBar={true} />
      <main
        className={`app-container light:bg-white dark:bg-dark dark:text-white`}
      >
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
