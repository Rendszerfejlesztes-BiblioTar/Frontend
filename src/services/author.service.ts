import { injectable } from "tsyringe";

import { HttpService } from "./http.service";
import {AuthorDeleteDTO, AuthorGetDTO, AuthorPutDTO, AuthorPostDTO} from "../interfaces/author.interfaces";

@injectable()
export class AuthorService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

     /**
     * Requests all the authors from the API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<AuthorGetDTO[] | undefined>}
     * */
    public getAuthors(): Promise<AuthorGetDTO[] | undefined> {
        return new Promise<AuthorGetDTO[] | undefined>((resolve): void => {
            this.httpService.Get('Author').then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as AuthorGetDTO[]);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Requests the author with the given id from the API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<AuthorGetDTO | undefined>}
     * */
    public getAuthorById(id: number): Promise<AuthorGetDTO | undefined> {
        return new Promise<AuthorGetDTO | undefined>((resolve): void => {
            this.httpService.Get(`Author/${id}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as AuthorGetDTO);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Posts the author with the given name to the API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<AuthorGetDTO | undefined>}
     * */
    public postAuthor(author: AuthorPostDTO): Promise<AuthorGetDTO | undefined> {
        return new Promise<AuthorGetDTO | undefined>((resolve): void => {
            this.httpService.Post(`Author`, author).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as AuthorGetDTO);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    /**
     * Puts the author with the given id from tha API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<AuthorGetDTO | undefined>}
     * */
    public putAuthor(id: number, author: AuthorPutDTO): Promise<AuthorGetDTO | undefined> {
        return new Promise<AuthorGetDTO | undefined>((resolve): void => {
            this.httpService.Put(`Author`, author).then((res: Response): void => {
                if (res.ok) {
                    resolve(res.json() as unknown as AuthorGetDTO);
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
    public deleteAuthor(id: number, requester: AuthorDeleteDTO): Promise<boolean | undefined> {
        return new Promise<boolean | undefined>((resolve): void => {
            this.httpService.Delete(`Author/${id}`).then((res: Response): void => {
                if (res.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}