"use client";
import { useSession,signIn, signOut } from "next-auth/react"
import Link from "next/link"

function Navbar() {

    const {data:session} = useSession();

    return(
        // <h1>navbar page</h1>

        <nav className="header">
        <h1 className="logo">
         <a href="#">NextAuth</a>
        </h1>
        {/* <ul className={"main-nav "+!session && loading ? 'loading' : 'loaded' }> */}
        <ul>
            <li>
                <Link href='/products'>
                    Products
                </Link>
            </li>

            <li>
                <Link href='/cart'>
                    Cart
                </Link>
            </li>

            {session?.user ? (
                <li>
                    <p>{session.user.name}</p>
                    <Link href='/api/auth/signin' onClick={() => signOut()}>sign Out</Link>
                </li>
            ) : (
                <li>
                    <Link href='/api/auth/signout' onClick={() =>signIn()}>sign In</Link>
                </li>
            )}
            {/* {!loading && !session && (
                <li>
                <Link href='/api/auth/signin'
                    onClick={e => {
                    e.preventDefault()
                    signIn('github') //By including github u will automatically login to sign in and view source page output
                   }}>
                      Sign In
                   
                </Link>
            </li>
            )}
            
            {session && (
                <li>
                <Link href='/api/auth/signin'
                 onClick={e => {
                    e.preventDefault()
                    signOut()
                   }}>
                      Sign out
                   
                </Link>
            </li>
            )} */}
            

        </ul>
       
    </nav>

    )
}
export default Navbar