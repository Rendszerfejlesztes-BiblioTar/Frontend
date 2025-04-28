export interface Authentication {
    Email: string;
    Password: string;
}

export interface RegisteredUser {
    Email: string;
    FirstName?: string;
    LastName?: string;
    Phone?: string;
    Address?: string;
    Privilege: number;
    PrivilegeString: string;
}

export interface RegisterAnswer {
    Data: RegisteredUser;
    Error?: string;
    Success: boolean;
}

export interface LoginAnswer {
    Data?: {
        AccessToken: string;
        RefreshToken: string;
        ExpiresAt: Date;
        User: RegisteredUser;
    }
    Error?: string;
    Success: boolean;
}

export interface ChangeCredentials {
    OldEmail: string;
    NewEmail: string;
    NewPassword: string;
}

export interface BooleanAnswer {
    Data: boolean;
    Error: string;
    Success: boolean;
}

export interface Contact {
    Email: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    Address: string;
}

export interface ChangePrivilege {
    RequesterEmail: string;
    UserEmail: string;
    NewPrivilege: number;
}

export interface AllUsers {
    Data?: RegisteredUser[];
    Error?: string;
    Success: boolean;
}

export interface AdminAnswer {
    Data?: {
        Email: string;
        Password: string;
    },
    Error?: string;
    Success: boolean;
}