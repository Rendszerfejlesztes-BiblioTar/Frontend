import { injectable } from "tsyringe";

import { HttpService } from "./http.service";
import {CategoryGetDTO, CategoryNameDTO} from "../interfaces/category.interfaces";

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
    public async getCategories(): Promise<CategoryGetDTO[] | undefined> {
        try {
            const res: Response = await this.httpService.Get('Category');

            if (res.ok) {
                return await res.json() as unknown as CategoryGetDTO[];
            }
        } catch (error) {
            console.log('Author get error: ', error);
        }

        return undefined;
    }

    /**
     * Requests the category with the given id from the API.
     * Returns a Promise that contains the result from the API fetch.
     * @param id {number}
     * @returns {Promise<CategoryGetDTO | undefined>}
     * */
    public async getCategoryById(id: number): Promise<CategoryGetDTO | undefined> {
        try {
            const res: Response = await this.httpService.Get(`Category/${id}`);

            if (res.ok) {
                return await res.json() as unknown as CategoryGetDTO;
            }
        } catch (error) {
            console.log('')
        }

        return undefined;
    }

    /**
     * Posts the category with the given name to the API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<CategoryGetDTO | undefined>}
     * */
    public async postCategory(category: CategoryNameDTO): Promise<CategoryGetDTO | undefined> {
        try {
            const res: Response = await this.httpService.Post('Category', category);

            if (res.ok) {
                return await res.json() as unknown as CategoryGetDTO;
            }
        } catch (error) {
            console.log('Category post error: ', error);
        }

        return undefined;
    }

    /**
     * Requests the category with the given id from tha API.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<CategoryGetDTO | undefined>}
     * */
    public async putCategory(id: number, category: CategoryNameDTO): Promise<CategoryGetDTO | undefined> {
        try {
            const res: Response = await this.httpService.Put(`Category/${id}`, category);

            if (res.ok) {
                return await res.json() as unknown as CategoryGetDTO;
            }
        } catch (error) {
            console.log('Category Put error: ', error);
        }

        return undefined;
    }

    /**
     * Deletes the category with the given id.
     * Returns a Promise that contains the result from the API fetch.
     * @returns {Promise<boolean | undefined>}
     * */
    public async deleteCategory(id: number): Promise<boolean | undefined> {
        try {
            const res: Response = await this.httpService.Delete(`Category/${id}`);

            return res.ok;
        } catch (error) {
            console.log('Category delete error: ', error);
        }

        return undefined;
    }
}