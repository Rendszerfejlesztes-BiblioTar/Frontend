export interface Reservation {
    Id: number;
    BookId: number;
    UserEmail: string;
    IsAccepted: boolean;
    ReservationDate: string;
    ExpectedStart: string;
    ExpectedEnd: string;
}

