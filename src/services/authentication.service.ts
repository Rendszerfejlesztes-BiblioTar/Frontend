import { injectable } from "tsyringe";

import { HttpService } from "./http.service";

import {
    Authentication,
    BooleanAnswer,
    LoginAnswer,
    RegisterAnswer,
    RegisteredUser,
} from "../interfaces/authentication.interfaces";
import { BehaviorSubject, Observable } from "rxjs";

@injectable()
export class AuthenticationService {
    private readonly httpService: HttpService;
    private interval: NodeJS.Timeout | null = null;

    private expiresAt: Date | null = null;

    private refreshToken: string | null = null;

    private token: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
    public token$: Observable<string | undefined> = this.token.asObservable();

    private user: BehaviorSubject<RegisteredUser | undefined> = new BehaviorSubject<RegisteredUser | undefined>({ Email: '', Privilege: 3, PrivilegeString: 'Unregistered'});
    public user$: Observable<RegisteredUser | undefined> = this.user.asObservable();

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    /**
     * Checks the localStorage for token, if there is, and it isn't expired then asks the API for the users data.
     * @returns {Promise<void | undefined>}
     * */
    public async checkIfAuthenticated(): Promise<void | undefined> {
        const foundToken: string | null = localStorage.getItem("accessToken");
        const foundExpiration: string | null = localStorage.getItem("expiresAt");
        const foundExpirationInNumber: number = foundExpiration ? new Date(Number.parseInt(foundExpiration)).getTime() : NaN;
        const EXPIRED_OR_ISNAN: boolean = !Number.isNaN(foundExpirationInNumber) && foundExpirationInNumber < new Date().getTime();

        if (!foundToken || !foundExpiration || EXPIRED_OR_ISNAN) {
            this.resetState();
            this.clearInterval();
            return;
        }

        this.token.next(foundToken);

        this.getLoggedInUsersData().then((res: RegisteredUser | undefined ) : void => {
            if (res) {
                this.user.next(res);
                this.expiresAt = new Date(foundExpiration!);
                this.refreshToken = localStorage.getItem("refreshToken");

                return;
            }
            else {
                this.resetState();
            }
        });
    }

    /**
     * Takes the credentials and tries to register it as a new user.
     * @param register {Authentication}
     * @returns {Promise<RegisterAnswer | undefined>}
     * */
    public async register(register: Authentication): Promise<RegisterAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Post('users/register', register)

            if (res.ok) {
                return await res.json() as unknown as RegisterAnswer;
            }

        } catch (error) {
            console.error('Register error:', error);
        }

        return undefined;
    }

    /**
     * Takes the credentials and tries to log the user in.
     * @param credentials {Authentication}
     * @returns {Promise<LoginAnswer | string>}
     * */
    public async login(credentials: Authentication): Promise<LoginAnswer | string> {
        try {
            const res: Response = await this.httpService.Post('users/login', credentials);

            if (!res.ok) {
                return 'Login failed.';
            }

            const data: LoginAnswer = await res.json();

            await this.storeState(data);

            return data;
        } catch (error) {
            console.error('Login error:', error);
            return 'Login failed.';
        }
    }

    /**
     * Takes the refresh token and tries to refresh the authentication.
     * @returns {Promise<LoginAnswer | undefined>}
     * */
    public async refreshAuth(): Promise<LoginAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Post('users/refresh', { RefreshToken: this.refreshToken });

            if (!res.ok) {
                this.resetState();

                return undefined;
            }

            const data: LoginAnswer = await res.json();

            await this.storeState(data);

            return data;
        } catch (error) {
            console.log('Failed to refresh token: ', error);
        }

        return  undefined;
    }

    /**
     * Clears the localStorage and throws all the user data from memory. Basically logging the user out.
     * @returns {Promise<BooleanAnswer | undefined>}
     * */
    public async logout(): Promise<BooleanAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Post('users/logout');

            this.resetState();

            if (!res) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('Error during logout: ', error)
        }

        return undefined;
    }

    /**
     * Taking the JWT token and asking the API for the Users data.
     * @returns {Promise<RegisteredUser | undefined>}
     * */
    public async getLoggedInUsersData(): Promise<RegisteredUser | undefined> {
        try {
            const res: Response = await this.httpService.Get('users');

            if (!res.ok) {
                return undefined;
            }

            const data: LoginAnswer = await res.json();

            if (data.Success) {
                return data.Data! as unknown as RegisteredUser;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log("Get userdata error: ", error);
            return undefined;
        }
    }

    private checkIfStillAuthenticated(): void {
        if (this.token === null) {
            this.clearInterval();

            return;
        }

        if (this.expiresAt === null) {
            this.clearInterval();

            return;
        }

        const NOW: Date = new Date();
        const TIME_REMAINING: number = this.expiresAt!.getTime() - NOW.getTime();

        if (TIME_REMAINING <= 60000) {
            this.refreshAuth();
        }

        if (TIME_REMAINING < 0) {
            this.resetState();
            this.clearInterval();
        }
    }

    private resetState(): void {
        console.log('RESETING STATE');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresAt');

        this.token.next(undefined);
        this.user.next({ Email: '', Privilege: 3, PrivilegeString: 'Unregistered'});
        this.refreshToken = null;
        this.expiresAt = null;

        this.clearInterval();
    }

    private setInterval(): void {
        this.interval = setInterval((): void => {
            this.checkIfStillAuthenticated();
        }, 60000);
    }

    private clearInterval(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    private async storeState(data: LoginAnswer): Promise<void> {
        console.log('DATA', data);

        const accessToken: string = data.Data?.AccessToken!;
        const refreshToken: string = data.Data?.RefreshToken!;
        const expiresAt: Date = new Date(data.Data?.ExpiresAt!);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('expiresAt', `${expiresAt.getTime()}`);

        this.token.next(accessToken);

        const user: RegisteredUser | undefined = await this.getLoggedInUsersData();

        if (!user) {
            this.resetState();
            return;
        }

        this.user.next(user);

        this.expiresAt = new Date(expiresAt);
        this.refreshToken = refreshToken;

        this.clearInterval();
        this.setInterval();
    }
}