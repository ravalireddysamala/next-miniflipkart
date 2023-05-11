import Head from "next/head"

function About(){
    return(
        <>

        <Head>
            <title>About codevlotion</title>
            <meta name="description" content="Free tutorials on web development"/>
        </Head>
        <h2 className="content">About</h2>
        
        </>
    )
}
export default About

About.getLayout = function pageLayout(page){
    return (
        <>
            {page}
        </>
    )
}