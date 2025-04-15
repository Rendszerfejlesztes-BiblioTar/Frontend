export interface BookGetDTO {
    id: number;
    title?: string;
    authorId: number;
    authorName?: string;
    categoryId: number;
    categoryName?: string;
    description?: string;
    isAvailable: boolean;
    numberInLibrary?: string;
    bookQuality: number;
}

export interface BookPatchDTO {
    title?: string;
    authorId?: number;
    categoryId?: number;
    isAvailable?: boolean;
    numberInLibrary?: string;
    bookQuality?: number;
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
    title?: string;
    authorId: number;
    categoryId: number;
    description?: string;
    isAvailable?: boolean;
    numberInLibrary?: string;
    bookQuality: number;
}