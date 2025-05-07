import {
    Accessor,
    from,
    JSX,
    useContext
} from "solid-js";
import { Button, Card } from "solid-bootstrap";

import { Condition } from "../../../../enums/bookquality.enum";

import { BookGetDTO } from "../../../../interfaces/book.interfaces";
import { RegisteredUser } from "../../../../interfaces/authentication.interfaces";
import { Reservation } from "../../../../interfaces/reservation.interfaces";
import { AppService } from "../../../../services/app.service";
import { DIContextProvider } from "../../../../services/di-context-provider.service";

export default (props: { book: BookGetDTO }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const makeReservation = async (bookId: number, userEmail: string) => {
        const now = new Date();
        const reservationDate = now.toISOString();
        const expectedStart = reservationDate;

        const expectedEnd = new Date();
        expectedEnd.setDate(now.getDate() + 14);
        const expectedEndStr = expectedEnd.toISOString();

        const reservation: Reservation = {
            BookId: bookId,
            UserEmail: userEmail,
            IsAccepted: false,
            ReservationDate: reservationDate,
            ExpectedStart: expectedStart,
            ExpectedEnd: expectedEndStr,
        };

        await app.reservationService.postReservation(reservation);
    };

    return <>
        <Card.Body class="d-flex flex-column">
            <Card.Title style={{ "font-size": "2.5rem", "font-weight": 'bold' }}>{props.book.Title}</Card.Title>
            <Card.Subtitle class="mb-2" style={{ "font-size": "2rem" }}>{props.book.AuthorName}</Card.Subtitle>
            <Card.Subtitle class="mb-2 text-muted" style={{ "font-size": "1.5rem" }}>{props.book.CategoryName}</Card.Subtitle>

            <hr class="my-2" />
            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                {props.book.Description}
            </Card.Text>

            <hr class="my-2" />

            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                This book is <b>{props.book.IsAvailable ? 'available' : 'currently unavailable'}</b>
            </Card.Text>

            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                This book is <b>{Object.values(Condition)[props.book.BookQuality]}</b> quality
            </Card.Text>

            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                Number in library: <b>{props.book.NumberInLibrary}</b>
            </Card.Text>

            <div class="mt-auto">
                <Button
                    variant="info"
                    style={{ background: '#402208', color: 'white', "border-color": '#402208' }}
                    onClick={async (e) => {
                        e.stopPropagation();
                        try {
                            await makeReservation(props.book.Id, user()!.Email);
                        } catch (error) { }
                    }}
                >
                    Reserve
                </Button>
            </div>
        </Card.Body>
    </>
}