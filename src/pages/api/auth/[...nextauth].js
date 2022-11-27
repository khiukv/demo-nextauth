import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "../../../network/ApiClient";

const sidValue = "948F6035CCEDAEFF3604A9F772098E48";

async function refreshAccessToken(tokenObject) {
    try {
        // Get a new set of tokens with a refreshToken
        const tokenResponse = await apiClient.post(process.env.API_URL + 'auth/login', {
            headers: {
                'content-type': 'application/json'
            },
            token: tokenObject.refreshToken
        });

        return {
            ...tokenObject,
            accessToken: tokenResponse.data.accessToken,
            accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
            refreshToken: tokenResponse.data.refreshToken
        }
    } catch (error) {
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }
}

const providers = [
    CredentialsProvider({
        //id: "sso-login",
        name: 'Credentials',
        credentials: {
            //sid: { label: "sid", type: "text", value: `${sid}` },
            sid: { label: "sid", type: "text"},
        },
        /*session: {
            jwt: true,
            maxAge: 30 * 24 * 60 * 60 // the session will last 30 days
        },*/
        authorize: async (credentials, req) => {
            console.log('credentials: ', credentials);
            console.log('req: ', req);
            try {
                // Authenticate user with credentials
                const user = await apiClient.post('http://localhost:3000/api/hello', {
                    sid: credentials.sid,
                });
                if (user.data.accessToken) {
                    return user.data;
                }

                return null;
            } catch (e) {
                throw new Error(e);
            }
        }
    })
]

const callbacks = {
    jwt: async ({ token, user }) => {
        if (user) {
            // This will only be executed at login. Each next invocation will skip this part.
            token.accessToken = user.accessToken;
            token.accessTokenExpiry = user.accessTokenExpiry;
            token.refreshToken = user.refreshToken;
        }

        // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
        const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 60 * 1000) - Date.now());

        // If the token is still valid, just return it.
        if (shouldRefreshTime > 0) {
            return Promise.resolve(token);
        }
        // If the call arrives after 23 hours have passed, we allow to refresh the token.
        token = refreshAccessToken(token);
        return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
        // Here we pass accessToken to the client to be used in authentication with your API
        session.accessToken = token.accessToken;
        session.accessTokenExpiry = token.accessTokenExpiry;
        session.error = token.error;
        return Promise.resolve(session);
    },
    /*signIn: async (props) => {
        console.log(props);
    },*/
    debug: 'development',
}

export const options = {
    providers,
    callbacks,
    pages: {/*signIn: '/signin'*/},
    secret: 'dnBZ1Yq5CMNEykHsgeK8tQTtwWYXK3eGrLtUq57fHDI',
    debug: true
    //site: process.env.NEXTAUTH_URL
}

const Auth = (req, res) => NextAuth(req, res, options)
export default Auth;
