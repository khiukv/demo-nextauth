import { SessionProvider } from 'next-auth/react';
import {useEffect, useState} from 'react';
import RefreshTokenHandler from '../common/components/refreshTokenHandler';
import '../styles/globals.scss';
import UseAuth from "../common/hooks/useAuth";

function MyApp({ Component, pageProps }) {
  const [interval, setInterval] = useState(0);

  return (
        <SessionProvider session={pageProps.session} refetchInterval={interval}>
          <UseAuth />
          <Component {...pageProps} />
          <RefreshTokenHandler setInterval={setInterval} />
        </SessionProvider>
      )
}

export default MyApp
