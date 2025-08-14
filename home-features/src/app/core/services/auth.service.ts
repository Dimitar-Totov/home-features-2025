import { Injectable, signal } from "@angular/core";
import { User } from "../../models";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private _users: User[] = [
        { id: '1', username: 'John' },
        { id: '2', username: 'David' },
        { id: '3', username: 'Peter' },
    ];

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor() {
        if (typeof window !== 'undefined' && localStorage) {
            const savedUser = localStorage.getItem('currentUser');

            if (savedUser) {
                try {
                    const user = JSON.parse(savedUser);
                    this._currentUser.set(user);
                    this._isLoggedIn.set(true);
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('currentUser');
                }
            }
        }
    }

    login(email: string, password: string): boolean {
        if (email && password) {
            const user = this._users[0];
            this._currentUser.set(user);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }

        return false;
    }

    register(username: string, email: string, password: string, rePasswrod: string): boolean {
        if (username && email && password && rePasswrod) {
            const newUser: User = { id: ` user_${Date.now()}`, username: username };

            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true);
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            return true;
        }

        return false;
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser')
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?.id || null;
    }
}