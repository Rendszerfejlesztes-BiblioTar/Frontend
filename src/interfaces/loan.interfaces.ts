export interface Loan {
    Id: number;
    UserEmail: string;
    BookId: number;
    Extensions: number;
    StartDate: string;
    ExpectedEndDate: string;
    ReturnDate: string;
}

export interface LoanPost {
    BookId: number;
    UserEmail: string;
    StartTime: string;
}

export interface LoanPatch {
    Extensions?: number;
    BookId?: number;
    StartDate?: string;
    ExpectedEndDate?: string;
    ReturnDate?: string;
}
