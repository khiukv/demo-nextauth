import { signIn, signOut } from 'next-auth/react';
import {useEffect} from "react";

export default function NoAccess() {
    useEffect(() => {
        //signIn('Credentials', { sid: "948F6035CCEDAEFF3604A9F772098E48", callbackUrl: window.location.origin, });
        signIn('Credentials', {
            redirect: false,
            callbackUrl: window.location.origin,
            sid: '948F6035CCEDAEFF3604A9F772098E48',

        },
        {
            prompt: "none"
        }
    )
        //signIn('Credentials', { sid: '948F6035CCEDAEFF3604A9F772098E48', callbackUrl: window.location.origin, });
    })
    return (
        <div>
            <button onClick={() => signIn('Credentials', { sid: '948F6035CCEDAEFF3604A9F772098E48', callbackUrl: window.location.origin}, { prompt: "none" })}>
                Sign in
            </button>
            <button onClick={() => signOut()}>
                Sign out
            </button>
        </div>
    );
}