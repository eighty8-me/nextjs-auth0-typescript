import { initAuth0 } from '@auth0/nextjs-auth0';

function getServerSetting(environmentVariable: string, defaultValue?: string) {
  if (typeof window === 'undefined') {
    return process.env[environmentVariable];
  }

  return defaultValue || null;
}

export default initAuth0({
  clientId: getServerSetting('AUTH0_CLIENT_ID'),
  clientSecret: getServerSetting('AUTH0_CLIENT_SECRET'),
  scope: 'openid profile email',
  domain: getServerSetting('AUTH0_DOMAIN'),
  redirectUri: getServerSetting('AUTH0_REDIRECT_URI', 'http://localhost:3000/api/callback'),
  postLogoutRedirectUri: getServerSetting('AUTH0_POST_LOGOUT_REDIRECT_URI', 'http://localhost:3000/'),
  audience: 'http://localhost:8009/',
  session: {
    cookieSecret: getServerSetting('AUTH0_COOKIE_SECRET'),
    cookieLifetime: 7200,
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
  }
});
