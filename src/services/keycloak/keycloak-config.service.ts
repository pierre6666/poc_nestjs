import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    console.log(process.env.KEY_CLOAK_CLIENT_ID);
    return {
      authServerUrl: process.env.KEY_CLOAK_URL,
      realm: process.env.KEY_CLOAK_REALM,
      clientId: process.env.KEY_CLOAK_CLIENT_ID,
      secret: process.env.KEY_CLOAK_SECRET,
      useNestLogger: true,
      realmPublicKey: process.env.KEY_CLOAK_REALM_PUBLIC_KEY,
    };
  }
}
