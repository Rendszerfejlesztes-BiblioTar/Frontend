export interface CategoryGetDTO {
    Id: number;
    Name: string;
}

export interface CategoryPostDTO {
    Name: string;
    RequesterEmail: string;
}

export interface CategoryPutDTO {
    Name: string;
    RequesterEmail: string;
}

export interface CategoryDeleteDTO {
    RequesterEmail: string;
}