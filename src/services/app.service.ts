import { singleton } from "tsyringe";

import { AuthenticationService } from "./authentication.service";
import { AuthorService } from "./author.service";
import { BookService } from "./book.service";
import { HttpService } from "./http.service";
import { CategoryService } from "./category.service";
import { LoanService } from "./loan.service";
import { UserService } from "./user.service";
import { ReservationService } from "./reservation.service";

@singleton()
export class AppService {
    private httpService!: HttpService;
    public authentication!: AuthenticationService;
    public authorService!: AuthorService;
    public bookService!: BookService;
    public categoryService!: CategoryService;
    public loanService!: LoanService;
    public userService!: UserService;
    public reservationService!: ReservationService;

    constructor() {
        const server_url: string = import.meta.env.VITE_API;

        /* Init API services */
        this.httpService = new HttpService(server_url);

        this.authentication = new AuthenticationService(this.httpService);
        this.authorService = new AuthorService(this.httpService);
        this.bookService = new BookService(this.httpService);
        this.categoryService = new CategoryService(this.httpService);
        this.loanService = new LoanService(this.httpService);
        this.userService = new UserService(this.httpService);
        this.reservationService = new ReservationService(this.httpService)
    }
}