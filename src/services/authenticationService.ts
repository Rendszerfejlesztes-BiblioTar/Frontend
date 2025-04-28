import { injectable } from "tsyringe";

import { HttpService } from "./http.service";

import {
    Authentication,
    ChangeCredentials,
    BooleanAnswer,
    LoginAnswer,
    RegisterAnswer,
    RegisteredUser,
    Contact,
    ChangePrivilege,
    AllUsers,
    AdminAnswer
} from "../interfaces/authentication.interfaces";
import { BehaviorSubject, Observable } from "rxjs";

@injectable()
export class AuthenticationService {
    private readonly httpService: HttpService;
    private token: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
    public token$: Observable<string | undefined> = this.token.asObservable();

    private user: BehaviorSubject<RegisteredUser | undefined> = new BehaviorSubject<RegisteredUser | undefined>({ Email: '', Privilege: 3, PrivilegeString: 'Unregistered'});
    public user$: Observable<RegisteredUser | undefined> = this.user.asObservable();

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    public async checkIfAuthenticated(): Promise<void> {
        const foundToken: string | null = localStorage.getItem("accessToken");

        if (!foundToken) {
            return;
        }

        this.token.next(foundToken);

        this.getLoggedInUsersData().then((res: RegisteredUser | undefined ) : void => {
            if (res) {
                this.user.next(res);
                return;
            }

            this.resetState();
        });
    }

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

    public async login(credentials: Authentication): Promise<LoginAnswer | string> {
        try {
            const res: Response = await this.httpService.Post('users/login', credentials);

            if (!res.ok) {
                return 'Login failed.';
            }

            const data: LoginAnswer = await res.json();

            const accessToken: string = data.Data?.AccessToken!;
            const refreshToken: string = data.Data?.RefreshToken!;
            const expiresAt: Date = new Date(data.Data?.ExpiresAt!);

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('expiresAt', expiresAt.toDateString());

            this.token.next(accessToken);
            this.user.next(data.Data?.User);

            return data;
        } catch (error) {
            console.error('Login error:', error);
            return 'Login failed.';
        }
    }

    public async changeLogin(credentials: ChangeCredentials): Promise<BooleanAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Put('users/login', credentials);

            if (!res.ok) {
                return undefined
            }

            return await res.json();
        } catch (error) {
            console.log('Change login error:', error);
        }

        return undefined;
    }

    public async createAdmin(credentials: Authentication): Promise<BooleanAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Post('users/create-admin', credentials);

            if (!res.ok) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('Create admin error: ', error)
        }

        return undefined
    }

    public async refreshToken(refreshToken: string): Promise<LoginAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Post('users/refresh', refreshToken);

            if (!res.ok) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('Failed to refresh token: ', error);
        }

        return  undefined;
    }

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

    private resetState(): void {
        console.log('RESETING STATE');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresAt');

        this.token.next(undefined);
        this.user.next({ Email: '', Privilege: 3, PrivilegeString: 'Unregistered'});
    }

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

    public async changeContact(contact: Contact): Promise<BooleanAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Put('users/contact', contact);

            if (!res.ok) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('Change contact error: ', error)
        }

        return undefined;
    }

    public async changePrivilege(privilege: ChangePrivilege): Promise<BooleanAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Put('users/privilege', privilege);

            if (!res.ok) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('Privilege change error: ', error)
        }
    }

    public async deleteUser(email: string): Promise<BooleanAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Delete(`users/${email}`);

            if (!res.ok) {
                return undefined;
            }

            this.resetState();
            return await res.json();
        } catch (error) {
            console.log('User delete error: ', error);
        }

        return undefined;
    }

    public async getAllUsers(): Promise<AllUsers | undefined> {
        try {
            const res: Response = await this.httpService.Get('users/get-all-users');

            if (!res.ok) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('Get all users error: ', error);
        }

        return undefined;
    }

    public async createDefaultAdmin(): Promise<AdminAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Post('users/create-default-admin');

            if (!res.ok) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('Error creating default admin: ', error);
        }

        return undefined;
    }
}