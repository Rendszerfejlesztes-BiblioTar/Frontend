export interface AuthorGetDTO {
    Id: number;
    Name: string;
}

export interface AuthorPostDTO {
    Name: string;
    RequesterEmail: string;
}

export interface AuthorPutDTO {
    Name: string;
    RequesterEmail: string;
}

export interface AuthorDeleteDTO {
    RequesterEmail: string;
}