import { Card, Table, Button } from "solid-bootstrap";
import { JSX, useContext, createSignal, onMount, For, Show } from "solid-js";
import { Reservation } from "../../../interfaces/reservation.interfaces";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";
import { BookGetDTO } from "../../../interfaces/book.interfaces";

export default (): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const [reservationsSIG, setReservationsSIG] = createSignal<Reservation[]>([]);
    const [bookSig, setBookSig] = createSignal<BookGetDTO[]>([]);

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        const pad = (n: number): string => n.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());

        return `${year}/${month}/${day} ${hours}:${minutes}`;
    };


    onMount((): void => {
        app.reservationService.getUsersReservation().then((res: Reservation[] | undefined): void => {
            if (res) {
                setReservationsSIG(res);
            }
        });

        app.bookService.getBooks().then((res: BookGetDTO[] | undefined): void => {
            if (res) {
                setBookSig(res);
            }
        });
    });

    return <>
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": "100%", "overflow-y": "auto", padding: "2rem" }}
        >
            <Card class="shadow rounded" style={{ width: "80vw", "max-width": "90vw", padding: "1rem" }}>
                <Card.Body>
                    <Card.Title
                        style={{
                            'animation': 'fadeInDown 0.5s ease-out',
                            "font-size": "2.5rem",
                            "margin-bottom": "1.5rem",
                            "text-align": "center",
                            "font-weight": "bold",
                            "border-bottom": "2px solid #ccc",
                            "padding-bottom": "0.5rem",
                        }}
                    >
                        Reservations
                    </Card.Title>
                    <div class="table-responsive" style={{ width: '95%', margin: '0 auto' }}>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Reservation date</th>
                                    <th>Expected start date</th>
                                    <th>Expected end</th>
                                    <th>Acception status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <For each={reservationsSIG()}>
                                    {(res: Reservation): JSX.Element => (
                                        <Show
                                            when={res.IsAccepted}
                                            fallback={
                                                <tr>
                                                    <For each={bookSig()}>
                                                        {(book: BookGetDTO): JSX.Element => {
                                                            if (res.BookId === book.Id) {
                                                                return <td>{book.Title}</td>
                                                            } else {
                                                                return <></>
                                                            }
                                                        }}
                                                    </For>
                                                    <td>{formatDate(res.ReservationDate)}</td>
                                                    <td>{formatDate(res.ExpectedStart)}</td>
                                                    <td>{formatDate(res.ExpectedEnd)}</td>
                                                    <td>{res.IsAccepted ? "Accepted" : "Unaccepted"}</td>
                                                </tr>
                                            }
                                        >
                                            <tr>
                                                <For each={bookSig()}>
                                                    {(book: BookGetDTO): JSX.Element => {
                                                        if (res.BookId === book.Id) {
                                                            return <td>{book.Title}</td>
                                                        } else {
                                                            return <></>
                                                        }
                                                    }}
                                                </For>
                                                <td>{formatDate(res.ReservationDate)}</td>
                                                <td>{formatDate(res.ExpectedStart)}</td>
                                                <td>{formatDate(res.ExpectedEnd)}</td>
                                                <td>{res.IsAccepted ? "Accepted" : "Unaccepted"}</td>
                                            </tr>
                                        </Show>
                                    )}
                                </For>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </>
}