import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import {useEffect} from "react";
import { signIn, signOut } from 'next-auth/react';
import {getSID} from "../../common/utils/getSID";

/*export async function getServerSideProps({params}) {
    return {props: {test: params.id}}
}*/

const UserSID = () => {
    const router = useRouter();
    console.log(router.query.sid);
    getSID(router.query.sid);

    useEffect(() => {
        //signIn('Credentials', { sid: router.query.sid, callbackUrl: window.location.origin, }, { prompt: "none" });
    })

    return (
        <div>
            <Head>
                <title>TestSID</title>
            </Head>
            <div>
                Test SID Page
            </div>
        </div>
    );
};

export default UserSID;
