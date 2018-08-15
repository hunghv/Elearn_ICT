import { APP_CONFIG } from '../services/app-config/app-config.service';
import { UserManager, UserManagerSettings } from 'oidc-client';

export class IapConfiguration {
  baseApiUrl: string;
  baseIdentityUrl: string;
  configuration: object;
}

const baseApiUrl = 'http://localhost:4200';
// const baseIdentityUrl: string = 'http://localhost:6002';
const baseIdentityUrl = 'http://10.192.73.252:6092';

export const iapConfiguration: IapConfiguration = {
  baseApiUrl: baseApiUrl,
  baseIdentityUrl: baseIdentityUrl,
  configuration: {
    authority: baseIdentityUrl,
    client_id: 'alesjs',
    redirect_uri: baseApiUrl + '/auth-callback',
    post_logout_redirect_uri: baseApiUrl,
    response_type: 'id_token token',
    scope: 'openid profile email phone ales petronas',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: baseApiUrl + '/silent-refresh.html'
  }
};

