import { injectable } from "tsyringe";

import { HttpService } from "./http.service";
import {Loan, LoanPatch, LoanPost} from "../interfaces/loan.interfaces";

@injectable()
export class LoanService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

     /**
      * Gets all the loans from the API.
      * @returns {Promise<Loan[] | undefined>}
      * */
    public async getAllLoans(): Promise<Loan[] | undefined> {
        try {
            const res: Response = await this.httpService.Get('loan');

            if (res.ok) {
                return await res.json() as Loan[];
            }
        } catch (error) {
            console.log('Loan get error: ', error)
        }

        return undefined;
    }

    /**
     * Gets the Users loans.
     * @param userEmail {string}
     * @returns {Promise<Loan[] | undefined>}
     * */
    public async getUserLoans(userEmail: string): Promise<Loan[] | undefined> {
        try {
            const res: Response = await this.httpService.Get(`loan/${userEmail}`);

            if (res.ok) {
                return await res.json() as Loan[];
            }
        } catch (error) {
            console.log('Loan get error: ', error)
        }

        return undefined;
    }

    /**
     * Posts the loan.
     * @param loan {LoanPost}
     * */
    public async postLoan(loan: LoanPost): Promise<Loan | undefined> {
        try {
            const res: Response = await this.httpService.Post('loan', loan);

            if (res.ok) {
                return await res.json() as Loan;
            }
        } catch (error) {
            console.log('Loan post error: ', error);
        }

        return undefined;
    }

    /**
     *
     * */
    public async patchLoan(loanId: number, loan: LoanPatch): Promise<Loan | undefined> {
        try {
            const res: Response = await this.httpService.Patch(`loan/${loanId}`, loan);

            if (res.ok) {
                return await res.json() as Loan;
            }
        } catch (error) {
            console.log('Loan patch error: ', error);
        }

        return undefined;
    }

    /**
     * Deletes the loan with the given Id;
     * @param loanId {number}
     * @returns {Promise<string | boolean | string>}
     * */
    public async deleteLoan(loanId: number): Promise<string | boolean | undefined> {
        try {
            const res: Response = await this.httpService.Delete(`loan/${loanId}`);

            if (res.ok) {
                return await res.json() as boolean
            }

            return await res.json() as string
        } catch (error) {
            console.log('Loan delete error: ', error)
        }

        return undefined;
    }
}