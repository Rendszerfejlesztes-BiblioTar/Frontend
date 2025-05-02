import { injectable } from "tsyringe";

import { HttpService } from "./http.service";

@injectable()
export class LoanService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }


}