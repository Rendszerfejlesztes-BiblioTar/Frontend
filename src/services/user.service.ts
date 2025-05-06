import { injectable } from "tsyringe";

import { HttpService } from "./http.service";

import {
    AdminAnswer,
    AllUsers,
    Authentication,
    BooleanAnswer,
    ChangeCredentials,
    ChangePrivilege,
    Contact
} from "../interfaces/authentication.interfaces";

@injectable()
export class UserService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    /**
     * Gets all the Users from the API
     * @returns {Promise<AllUsers | undefined>}
     * */
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

    /**
     * Creates the default admin.
     * @returns {Promise<AdminAnswer | undefined>}
     * */
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

    /**
     * Creates admin with the credentials.
     * @param credentials {Authentication}
     * @returns {Promise<BooleanAnswer | undefined>}
     * */
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

    /**
     * Changes the login credentials for the User.
     * @param credentials {ChangeCredentials}
     * @returns {Promise<BooleanAnswer | undefined>}
     * */
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

    /**
     * Changes the contact info for the User.
     * @param contact {Contact}
     * @returns {Promise<BooleanAnswer | undefined>}
     * */
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

    /**
     * Changes the privilege level of the given User.
     * @param privilege {ChangePrivilege}
     * @returns {Promise<BooleanAnswer | undefined>}
     * */
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

    /**
     * Deletes the User with the given email.
     * @param email {string}
     * @returns {Promise<BooleanAnswer | undefined>}
     * */
    public async deleteUser(email: string): Promise<BooleanAnswer | undefined> {
        try {
            const res: Response = await this.httpService.Delete(`users/${email}`);

            if (!res.ok) {
                return undefined;
            }

            return await res.json();
        } catch (error) {
            console.log('User delete error: ', error);
        }

        return undefined;
    }
}