import { injectable } from "tsyringe";

import { HttpService } from "./http.service";
import {Reservation} from "../interfaces/reservation.interfaces";

@injectable()
export class ReservationService {
    private readonly httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    public async getAllReservations(): Promise<Reservation[] | undefined> {
        try {
            const res: Response = await this.httpService.Get('Reservation');

            if (res.ok) {
                return await res.json() as Reservation[];
            }
        } catch (error) {
            console.log('Get reservation error: ', error);
        }
    }

    public async getUsersReservation(): Promise<Reservation[] | undefined> {
        try {
            const res: Response = await this.httpService.Get('Reservation/user');

            if (res.ok) {
                return await res.json() as Reservation[];
            }
        } catch (error) {
            console.log('Get reservation error: ', error);
        }
    }

    public async getReservationById(resId: number): Promise<Reservation | undefined> {
        try {
            const res: Response = await this.httpService.Get(`Reservation/${resId}`);

            if (res.ok) {
                return await res.json() as Reservation;
            }
        } catch (error) {
            console.log('Get reservation error: ', error);
        }
    }

    public async patchReservation(resId: number, reservation: Reservation): Promise<Reservation | undefined> {
        try {
            const res: Response = await this.httpService.Patch(`Reservation/${resId}`, reservation);

            if (res.ok) {
                return await res.json() as Reservation;
            }
        } catch (error) {
            console.log('Patch reservation error: ', error);
        }
    }

    public async postReservation(reservation: Reservation): Promise<Reservation | undefined> {
        try {
            const res: Response = await this.httpService.Post(`Reservation`, reservation);

            if (res.ok) {
                return await res.json() as Reservation;
            }
        } catch (error) {
            console.log('Get reservation error: ', error);
        }
    }

    public async deleteReservation(resId: number): Promise<string | boolean | undefined> {
        try {
            const res: Response = await this.httpService.Post(`Reservation/${resId}`);

            if (res.ok) {
                return await res.json() as boolean;
            }

            return await res.json() as string;
        } catch (error) {
            console.log('Get reservation error: ', error);
        }
    }
}