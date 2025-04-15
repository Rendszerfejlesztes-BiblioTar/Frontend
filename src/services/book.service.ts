import { injectable } from "tsyringe";

import { HttpService } from "./http.service";

import {
    BookAvailabilityPatchDTO,
    BookGetDTO,
    BookPatchDTO,
    BookPostDTO,
    BookQualityPatchDTO
} from "../interfaces/book.interfaces";

@injectable()
export class BookService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    /**
    * Requests all the books from tha API.
    * Returns a Promise that contains the result from the API fetch.
    * @returns {Promise<Book[] | undefined>}
    * */
    public getBooks(): Promise<BookGetDTO[] | undefined> {
        return new Promise<BookGetDTO[] | undefined>((resolve): void => {
            this.httpService.Get('Book').then((res: Response): void => {
               if (res.ok) {
                   resolve(res.json() as unknown as BookGetDTO[]);
               } else {
                   resolve(undefined);
               }
            });
        });
    }

    /**
     * Requests the book information from the API.
     * Returns a Promise that contains the result from the API fetch.
     * @param {string} id
     * @returns {Promise<BookFromId | undefined>}
     * */
    public getBook(id: string): Promise<BookGetDTO | undefined> {
        return new Promise<BookGetDTO | undefined>((resolve): void => {
           this.httpService.Get(`book/${id}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as BookGetDTO);
                } else {
                    resolve(undefined);
                }
           });
        });
    }

    /**
     * Requests the books from the API with titles that are like given in the parameter.
     * Returns a Promise that contains the result from the API fetch.
     * @param {string} title
     * @returns {Promise<BookGetDTO[] | undefined>}
     * */
    public getBooksByTitle(title: string): Promise<BookGetDTO[] | undefined> {
        return new Promise<BookGetDTO[] | undefined>((resolve): void => {
            this.httpService.Get(`book/search/title=${title}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as BookGetDTO[]);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Requests the books from the API with author that are like given in the parameter.
     * Returns a Promise that contains the result from the API fetch.
     * @param {string} author
     * @returns {Promise<BookGetDTO[] | undefined>}
     * */
    public getBooksByAuthor(author: string): Promise<BookGetDTO[] | undefined> {
        return new Promise<BookGetDTO[] | undefined>((resolve): void => {
            this.httpService.Get(`book/search/author=${author}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as BookGetDTO[]);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Requests the books from the API with category that are like given in the parameter.
     * Returns a Promise that contains the result from the API fetch.
     * @param {string} category
     * @returns {Promise<BookGetDTO[] | undefined>}
     * */
    public getBooksByCategory(category: string): Promise<BookGetDTO[] | undefined> {
        return new Promise<BookGetDTO[] | undefined>((resolve): void => {
            this.httpService.Get(`book/search/category=${category}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as BookGetDTO[]);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * POST the book given in the parameter.
     * Returns a Promise that contains whether the POST operation was successful.
     * @param {BookPostDTO} book
     * @returns {Promise<boolean>}
     * */
    public postBooks(book: BookPostDTO): Promise<boolean> {
        return new Promise<boolean>((resolve): void => {
            this.httpService.Post(`book`, book).then((res: Response): void => {
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /**
     * Returns a Promise that contains whether the PATCH operation was successful.
     * @param {number} id
     * @param {BookPostDTO} book
     * @returns {Promise<boolean>}
     * */
    public patchBook(id: number, book: BookPatchDTO): Promise<boolean> {
        return new Promise<boolean>((resolve): void => {
            this.httpService.Post(`book/${id}`, book).then((res: Response): void => {
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /**
     * Returns a Promise that contains whether the PATCH operation was successful.
     * @param {BookPostDTO} book
     * @returns {Promise<boolean>}
     * */
    public patchBookAvailability(book: BookAvailabilityPatchDTO): Promise<boolean> {
        return new Promise<boolean>((resolve): void => {
            this.httpService.Post(`book/availability`, book).then((res: Response): void => {
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /**
     * Returns a Promise that contains whether the PATCH operation was successful.
     * @param {BookPostDTO} book
     * @returns {Promise<boolean>}
     * */
    public patchBookQuality(book: BookQualityPatchDTO): Promise<boolean> {
        return new Promise<boolean>((resolve): void => {
            this.httpService.Post(`book/quality`, book).then((res: Response): void => {
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}