//import '@component/styles/globals.css'
import Head from "next/head";
import Header from "@component/components/Header";
import "../styles/layout.css";
import "../styles/product.css";
import Navbar from "@component/components/Navbar";
import "components/Navbar.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps, session }) {
  // if(Component.getLayout){
  //   return Component.getLayout(<Component {...pageProps}/>)
  // }
  return (
    <>
      <Head>
        <title>About codevlotion</title>
        <meta name="description" content="Free tutorials on web development" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>

      {/* <Header /> */}
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
