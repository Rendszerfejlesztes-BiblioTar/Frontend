import { Accessor, createSignal, from, JSX, onMount, useContext } from "solid-js";
import { Card, Button, Form } from "solid-bootstrap";
import { RegisteredUser } from "../../interfaces/authentication.interfaces";
import { AppService } from "../../services/app.service";
import { DIContextProvider } from "../../services/di-context-provider.service";
import { Reservation } from "../../interfaces/reservation.interfaces";
import { Navigate, Params, useNavigate, useParams } from "@solidjs/router";
import { BookGetDTO } from "../../interfaces/book.interfaces";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const navigator = useNavigate();

    const [startDate, setStartDate] = createSignal("");
    const [bookSIG, setBookSIG] = createSignal<BookGetDTO | null>(null);

    onMount((): void => {
        const params: Params = useParams();

        app.bookService.getBook(params.id).then((book: BookGetDTO | undefined): void => {
            if (book) {
                setBookSIG(book);
            }
        })

    });

    const makeReservation = async (bookId: number, userEmail: string, startDate: string) => {
        const now = new Date();
        const reservationDate = now.toISOString();
        const expectedStart = new Date(startDate).toISOString();

        const expectedEnd = new Date(startDate);
        expectedEnd.setDate(expectedEnd.getDate() + 14);
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

    return (
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": "100%", "overflow-y": "auto", padding: "2rem" }}
        >
            <Card class="shadow rounded" style={{ width: "80vw", "max-width": "90vw", padding: "1rem", 'animation': 'fadeInDown 0.5s ease-out' }}>
                <Card.Body class="d-flex flex-column gap-3" style={{ "font-size": "1.5rem" }}>
                    <Card.Title style={{ "font-size": "2.5rem", "font-weight": "bold" }}>
                        {bookSIG()?.Title}
                    </Card.Title>

                    <Form.Group>
                        <Form.Label>Choose Loan Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate()}
                            onBlur={(e) => setStartDate(e.currentTarget.value)}
                        />
                    </Form.Group>

                    <Button
                        style={{ background: '#402208', color: 'white', "border-color": '#402208' }}
                        onClick={async (e) => {
                            e.stopPropagation();
                            try {
                                await makeReservation(bookSIG()!.Id, user()!.Email, startDate());
                                navigator(`/home`, { replace: true });
                            } catch (error) {}
                        }}
                    >
                        Reserve Book
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}
