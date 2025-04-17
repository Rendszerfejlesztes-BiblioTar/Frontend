import { singleton } from "tsyringe";

import { AuthorService } from "./author.service";
import { BookService } from "./book.service";
import { HttpService } from "./http.service";

@singleton()
export class AppService {
    private httpService!: HttpService;
    public bookService!: BookService;
    public authorService!: AuthorService;

    constructor() {
        const server_url: string = import.meta.env.VITE_API;

        /* Init API services */
        this.httpService = new HttpService(server_url);

        this.bookService = new BookService(this.httpService);
        this.authorService = new AuthorService(this.httpService);
    }
}