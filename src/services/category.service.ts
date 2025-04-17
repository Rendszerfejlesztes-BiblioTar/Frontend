import { injectable } from "tsyringe";

import { HttpService } from "./http.service";
import { CategoryGetDTO } from "../interfaces/category.interfaces";

@injectable()
export class CategoryService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    /**
     * Requests all the categories from the API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<CategoryGetDTO[] | undefined>}
     * */
    public getAuthors(): Promise<CategoryGetDTO[] | undefined> {
        return new Promise<CategoryGetDTO[] | undefined>((resolve): void => {
            this.httpService.Get('Category').then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as CategoryGetDTO[]);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Requests the author with the given id from the API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<CategoryGetDTO | undefined>}
     * */
    public getAuthorById(id: number): Promise<CategoryGetDTO | undefined> {
        return new Promise<CategoryGetDTO | undefined>((resolve): void => {
            this.httpService.Get(`Category/${id}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as CategoryGetDTO);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Posts the Category with the given name to the API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<CategoryGetDTO | undefined>}
     * */
    public postAuthor(author: CategoryGetDTO): Promise<CategoryGetDTO | undefined> {
        return new Promise<CategoryGetDTO | undefined>((resolve): void => {
            this.httpService.Post(`Author`, author).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as CategoryGetDTO);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Requests the author with the given id from tha API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<AuthorGetDTO | undefined>}
     * */
    public putAuthor(author: CategoryGetDTO): Promise<CategoryGetDTO | undefined> {
        return new Promise<CategoryGetDTO | undefined>((resolve): void => {
            this.httpService.Put(`Author`, author).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as CategoryGetDTO);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Deletes the author with the given id.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<boolean | undefined>}
     * */
    public deleteAuthor(id: number): Promise<boolean | undefined> {
        return new Promise<boolean | undefined>((resolve): void => {
            this.httpService.Put(`Author/${id}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}