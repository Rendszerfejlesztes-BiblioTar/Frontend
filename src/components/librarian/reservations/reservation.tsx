import {
    createSignal,
    For,
    JSX,
    onMount,
    Show,
    useContext
} from "solid-js";
import { Button, Card, Table } from "solid-bootstrap";


import { DIContextProvider } from "../../../services/di-context-provider.service";
import { AppService } from "../../../services/app.service";

import { Reservation } from "../../../interfaces/reservation.interfaces";
import { Loan, LoanPost } from "../../../interfaces/loan.interfaces";

export default (props: { onReservationChange: () => void }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const [reservationsSIG, setReservationsSIG] = createSignal<Reservation[]>([]);

    onMount((): void => {
        fetchData();
    });

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

    const fetchData = (): void => {
        app.reservationService.getAllReservations().then((res: Reservation[] | undefined): void => {
            if (res) {
                setReservationsSIG(res);
            }
        });
    }

    const handleAccept = async (reservation: Reservation): Promise<void> => {
        let newReservation: Reservation = reservation;

        newReservation.IsAccepted = true;
        await app.reservationService.patchReservation(newReservation);

        fetchData();
    }

    const handelDelete = async (reservation: Reservation): Promise<void> => {
        await app.reservationService.deleteReservation(reservation.Id!);
    }

    const handleConvertToLoan = async (reservation: Reservation): Promise<void> => {
        const loan: LoanPost = {
            BookId: reservation.BookId,
            UserEmail: reservation.UserEmail,
            StartTime: new Date().toISOString()
        }

        const res: Loan | undefined = await app.loanService.postLoan(loan)

        if (res) {
            props.onReservationChange();

            await app.reservationService.deleteReservation(reservation.Id!);
            fetchData();
        }
    }

    const handleCancel = async (reservation: Reservation): Promise<void> => {
        let newReservation: Reservation = reservation;

        newReservation.IsAccepted = false;
        await app.reservationService.patchReservation(newReservation);

        app.reservationService.getAllReservations().then((res: Reservation[] | undefined): void => {
            if (res) {
                setReservationsSIG(res);
            }
        });
    }

    return <>
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": '100%', "overflow-y": 'auto', padding: '2rem' }}
        >
            <Card class="shadow rounded" style={{ width: '80vw', "max-width": '90vw', padding: '1rem' }}>
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
                    <div class="table-responsive" style={{ width: '95%', margin: '0 auto', 'animation': 'fadeInDown 0.5s ease-out' }}>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>BookId</th>
                                    <th>User Email</th>
                                    <th>Reservation date</th>
                                    <th>Expected start date</th>
                                    <th>Expected end</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <For each={reservationsSIG()}>
                                    {(res: Reservation): JSX.Element => (
                                        <Show
                                            when={res.IsAccepted}
                                            fallback={
                                                <tr>
                                                    <td>{res.Id}</td>
                                                    <td>{res.BookId}</td>
                                                    <td>{res.UserEmail}</td>
                                                    <td>{formatDate(res.ReservationDate)}</td>
                                                    <td>{formatDate(res.ExpectedStart)}</td>
                                                    <td>{formatDate(res.ExpectedEnd)}</td>
                                                    <td>
                                                        <div class="d-flex justify-content-start gap-1">
                                                            <Button variant="primary" onClick={() => handleAccept(res)} style={{ width: '7rem', "min-width": '7rem' }}>Accept</Button>
                                                            <Button variant="danger" onClick={() => handelDelete(res)} style={{ width: '7rem', "min-width": '7rem' }}>Delete</Button>
                                                        </div>

                                                    </td>
                                                </tr>
                                            }
                                        >
                                            <tr>
                                                <td>{res.Id}</td>
                                                <td>{res.BookId}</td>
                                                <td>{res.UserEmail}</td>
                                                <td>{formatDate(res.ReservationDate)}</td>
                                                <td>{formatDate(res.ExpectedStart)}</td>
                                                <td>{formatDate(res.ExpectedEnd)}</td>
                                                <td>
                                                <div class="d-flex justify-content-start gap-1">
                                                        <Button variant="success" onClick={() => handleConvertToLoan(res)}
                                                            style={{ width: '7rem', "min-width": '7rem' }}>Start Loan</Button>
                                                        <Button variant="danger" onClick={() => handleCancel(res)}
                                                            style={{ width: '7rem', "min-width": '7rem' }}>Cancel</Button>
                                                    </div>
                                                </td>
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