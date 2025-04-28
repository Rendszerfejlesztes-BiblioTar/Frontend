export interface BookGetDTO {
    Id: number;
    Title?: string;
    AuthorId: number;
    AuthorName?: string;
    CategoryId: number;
    CategoryName?: string;
    Description?: string;
    IsAvailable: boolean;
    NumberInLibrary?: string;
    BookQuality: number;
}

export interface BookPatchDTO {
    Title?: string;
    AuthorId?: number;
    CategoryId?: number;
    IsAvailable?: boolean;
    NumberInLibrary?: string;
    BookQuality?: number;
}

export interface BookAvailabilityPatchDTO {
    Id: number;
    IsAvailable: boolean;
}

export interface BookQualityPatchDTO {
    Id: number;
    BookQuality: number;
}

export interface BookPostDTO {
    Title?: string;
    AuthorId: number;
    CategoryId: number;
    Description?: string;
    IsAvailable?: boolean;
    NumberInLibrary?: string;
    BookQuality: number;
}