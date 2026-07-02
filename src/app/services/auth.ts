import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME = 'admin';
  private readonly PASSWORD = 'admin123';

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly EXPIRES_KEY = 'auth_expires_at';

  // 1 jam
  private readonly TOKEN_TTL_MS = 60 * 60 * 1000;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private get storage(): Storage | null {
    return isPlatformBrowser(this.platformId) ? localStorage : null;
  }

  private now(): number {
    return Date.now();
  }

  private isTokenValid(): boolean {
    const storage = this.storage;
    if (!storage) return false;

    const token = storage.getItem(this.TOKEN_KEY);
    const expiresAt = storage.getItem(this.EXPIRES_KEY);

    if (!token || !expiresAt) return false;

    const exp = Number(expiresAt);
    if (!Number.isFinite(exp)) return false;

    return exp > this.now();
  }

  login(username: string, password: string): boolean {
    if (username !== this.USERNAME || password !== this.PASSWORD) {
      return false;
    }

    const storage = this.storage;
    if (!storage) return false;

    const token = crypto.randomUUID();
    const expiresAt = this.now() + this.TOKEN_TTL_MS;

    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.USER_KEY, username);
    storage.setItem(this.EXPIRES_KEY, String(expiresAt));

    return true;
  }

  logout(): void {
    const storage = this.storage;
    storage?.removeItem(this.TOKEN_KEY);
    storage?.removeItem(this.USER_KEY);
    storage?.removeItem(this.EXPIRES_KEY);
  }

  isLoggedIn(): boolean {
    const ok = this.isTokenValid();
    if (!ok) {
      this.logout();
    }
    return ok;
  }

  getUsername(): string | null {
    const storage = this.storage;
    if (!storage) return null;
    return storage.getItem(this.USER_KEY);
  }
}

