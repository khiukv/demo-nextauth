import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UseAuth(shouldRedirect) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            console.log('session?.error ===');
            signOut({ callbackUrl: '/error', redirect: shouldRedirect });
        }

        if (session === null) {
            console.log('session === null');
            if (router.route !== '/no-access') {
                router.replace('/no-access');
            }
            setIsAuthenticated(false);
        } else if (session !== undefined) {
            console.log('session !== undefined');
            /*if (router.route === '/') {
                router.replace('/demo');
            }*/
            setIsAuthenticated(true);
        }
    }, [session]);

    return isAuthenticated;
}