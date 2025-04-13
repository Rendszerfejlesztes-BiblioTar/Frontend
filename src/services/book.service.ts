import { injectable } from "tsyringe";

import { HttpService } from "./http.service";

import { Book, BookFromId } from "../interfaces/book.interfaces";

@injectable()
export class BookService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    /**
    * Returns a Promise that contains the result from the API fetch.
    * @returns {Promise<Book[] | undefined>}
    * */
    public getBooks(): Promise<Book[] | undefined> {
        return new Promise<Book[] | undefined>((resolve): void => {
            this.httpService.Get('Book').then((res: Response): void => {
               if (res.ok) {
                   resolve(res.json() as unknown as Book[]);
               } else {
                   resolve(undefined);
               }
            });
        });
    }

    /**
     * Returns a Promise that contains the result from the API fetch.
     * @param {string} id
     * @returns {Promise<BookFromId | undefined>}
     * */
    public getBook(id: string): Promise<BookFromId | undefined> {
        return new Promise<BookFromId | undefined>((resolve): void => {
           this.httpService.Get(`book/${id}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as BookFromId);
                } else {
                    resolve(undefined);
                }
           });
        });
    }
}