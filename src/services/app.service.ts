import { singleton } from "tsyringe";

import { BookService } from "./book.service";
import { HttpService } from "./http.service";

@singleton()
export class AppService {
    private httpService!: HttpService;
    public bookService!: BookService;

    constructor() {
        const server_url: string = import.meta.env.VITE_API;

        /* Init API services */
        this.httpService = new HttpService(server_url);

        this.bookService = new BookService(this.httpService);
    }
}