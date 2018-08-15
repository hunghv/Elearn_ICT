import { APP_CONFIG } from '../services/app-config/app-config.service';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

export const identityConfig: object = {
  authority: 'http://10.192.73.252:6092/',
  client_id: 'alesjs',
  redirect_uri: 'http://localhost:4200/auth-callback',
  post_logout_redirect_uri: 'http://localhost:4200/',
  response_type: 'id_token token',
  scope: 'openid profile email phone ales petronas',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
};
