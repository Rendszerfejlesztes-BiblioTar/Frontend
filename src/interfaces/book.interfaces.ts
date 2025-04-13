export interface Book {
    id: number;
    title: string;
    authorId: string;
    authorName: string;
    categoryId: number;
    categoryName: string;
    description: string;
    isAvailable: boolean;
    numberInLibrary: string;
    bookQuality: number;
}

export interface BookFromId {
    id: number;
    title: string;
    authorId: number;
    author: Author;
    categoryId: number;
    category: Category;
    description: string;
    isAvailable: boolean,
    numberInLibrary: string;
    bookQuality: number;

}

export interface Author {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}