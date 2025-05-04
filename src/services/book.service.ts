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
    * @returns {Promise<BookGetDTO[] | undefined>}
    * */
    public async getBooks(): Promise<BookGetDTO[] | undefined> {
        try {
            const res: Response = await this.httpService.Get('Book');

            if (res.ok) {
                return await res.json() as unknown as BookGetDTO[];
            }

            return undefined;
        } catch (error) {
            console.log('Book get error: ', error);
        }

        return undefined;
    }

    /**
     * Requests the book information from the API.
     * Returns a Promise that contains the result from the API fetch.
     * @param id {number}
     * @returns {Promise<BookGetDTO | undefined>}
     * */
    public async getBook(id: string): Promise<BookGetDTO | undefined> {
        try {
            const res: Response = await this.httpService.Get(`book/${id}`);

            if (res.ok) {
                return await res.json() as unknown as BookGetDTO;
            }

            return undefined;
        } catch (error) {
            console.log('Book get error: ', error);
        }

        return undefined;
    }

    /**
     * Requests the books from the API with titles that are like given in the parameter.
     * Returns a Promise that contains the result from the API fetch.
     * @param title {string}
     * @returns {Promise<BookGetDTO[] | undefined>}
     * */
    public async getBooksByTitle(title: string): Promise<BookGetDTO[] | undefined> {
        try {
            const res: Response = await this.httpService.Get(`book/search/title?title=${title}`);

            if (res.ok) {
                return await res.json() as unknown as BookGetDTO[];
            }

            return undefined;
        } catch (error) {
            console.log('Book get error: ', error);
        }

        return undefined;
    }

    /**
     * Requests the books from the API with author that are like given in the parameter.
     * Returns a Promise that contains the result from the API fetch.
     * @param author {string}
     * @returns {Promise<BookGetDTO[] | undefined>}
     * */
    public async getBooksByAuthor(author: string): Promise<BookGetDTO[] | undefined> {
        try {
            const res: Response = await this.httpService.Get(`book/search/author?author=${author}`);

            if (res.ok) {
                return await res.json() as unknown as BookGetDTO[];
            }

            return undefined;
        } catch (error) {
            console.log('Book get error: ', error);
        }

        return undefined;
    }

    /**
     * Requests the books from the API with category that are like given in the parameter.
     * Returns a Promise that contains the result from the API fetch.
     * @param category {string}
     * @returns {Promise<BookGetDTO[] | undefined>}
     * */
    public async getBooksByCategory(category: string): Promise<BookGetDTO[] | undefined> {
        try {
            const res: Response = await this.httpService.Get(`book/search/category?category=${category}`);

            if (res.ok) {
                return await res.json() as unknown as BookGetDTO[];
            }

            return undefined;
        } catch (error) {
            console.log('Book get error: ', error);
        }

        return undefined;
    }

    /**
     * Takes the BookPostDTO and sends a Post request to the API.
     * @param book {BookPostDTO}
     * @returns {Promise<boolean | undefined>}
     * */
    public async postBooks(book: BookPostDTO): Promise<boolean | undefined> {
        try {
            const res: Response = await this.httpService.Post(`book`, book);

            return res.ok;
        } catch (error) {
            console.log('Post error: ', error)
        }

        return undefined;
    }

    /**
     * Takes the ID and the BookPatchDTO and sends a Patch request to the API.
     * @param id {number}
     * @param book {BookPatchDTO}
     * @returns {Promise<boolean | undefined>}
     * */
    public async patchBook(id: number, book: BookPatchDTO): Promise<boolean | undefined> {
        try {
            const res: Response = await this.httpService.Patch(`book/${id}`, book);

            return res.ok;
        } catch (error) {
            console.log('Book patch error: ', error);
        }

        return undefined;
    }

    /**
     * Sends a Patch request to the API with the given BookAvailabilityPatchDTO.
     * @param book {BookAvailabilityPatchDTO}
     * @returns {Promise<boolean | undefined>}
     * */
    public async patchBookAvailability(book: BookAvailabilityPatchDTO): Promise<boolean | undefined> {
        try {
            const res: Response = await this.httpService.Post(`book/availability`, book);

            return res.ok;
        } catch (error) {
            console.log('Book patch error: ', error);
        }

        return undefined;
    }

    /**
     * Sends a Patch request to the API with the given BookQualityPatchDTO.
     * @param book {BookQualityPatchDTO}
     * @returns {Promise<boolean | undefined>}
     * */
    public async patchBookQuality(book: BookQualityPatchDTO): Promise<boolean | undefined> {
        try {
            const res: Response = await this.httpService.Post(`book/quality`, book);

            return res.ok;
        } catch (error) {
            console.log('Book patch error: ', error);
        }

        return undefined;
    }

    /**
     * Takes the book's ID and sends a delete request to the API.
     * @param bookId {number}
     * @return {Promise<boolean | undefined>}
     * */
    public async deleteBook(bookId: number): Promise<boolean | undefined> {
        try {
            const res: Response = await this.httpService.Delete(`book/${bookId}`);

            return res.ok;
        } catch (error) {
            console.log('Book delete error: ', error);
        }

        return undefined;
    }
}