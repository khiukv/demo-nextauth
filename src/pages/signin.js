import { signIn, signOut } from 'next-auth/react';
import {useEffect} from "react";

export default function Signin () {
    /*useEffect(() => {
        //signIn('Credentials', { sid: "948F6035CCEDAEFF3604A9F772098E48", callbackUrl: window.location.origin, });
        signIn('Credentials', {
            callbackUrl: window.location.origin,
            sid: '948F6035CCEDAEFF3604A9F772098E48',
        },)
        //signIn('Credentials', { sid: '948F6035CCEDAEFF3604A9F772098E48', callbackUrl: window.location.origin, });
    }, [])*/
    return (
        <div>
            <button onClick={() => signIn('Credentials', { sid: '948F6035CCEDAEFF3604A9F772098E48', callbackUrl: window.location.origin},)}>
                Sign in
            </button>
        </div>
    );
}