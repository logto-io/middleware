import { Optional } from '@silverhand/essentials';

import { ClientStorage } from './storage';

const SESSEION_MANAGER_KEY = 'LOGTO_SESSION_MANAGER';

interface Session {
  codeVerifier: string;
  redirectUri: string;
}

export default class SessionManager {
  private session: Optional<Session>;

  constructor(private readonly storage: ClientStorage) {
    this.session = this.storage.getItem(SESSEION_MANAGER_KEY);
  }

  public create(session: Session) {
    this.session = session;

    this.storage.setItem(SESSEION_MANAGER_KEY, session, { secondsUntilExpire: 86_400 });
  }

  public get(): Optional<Session> {
    return this.session;
  }

  public remove() {
    this.session = undefined;
    this.storage.removeItem(SESSEION_MANAGER_KEY);
  }
}