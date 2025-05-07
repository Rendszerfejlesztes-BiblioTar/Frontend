import {
    createEffect, createSignal, For,
    JSX, onMount, Show, useContext
} from "solid-js";
import {Button, Card, Table} from "solid-bootstrap";
import {DIContextProvider} from "../../../services/di-context-provider.service";
import {AppService} from "../../../services/app.service";
import {Loan} from "../../../interfaces/loan.interfaces";
import {Reservation} from "../../../interfaces/reservation.interfaces";

export default (props: { refreshTrigger: () => boolean }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    
    const [loansSIG, setLoansSIG] = createSignal<Loan[] | undefined>([]);
    
    onMount((): void => {
        fetchData();
    });
    
    createEffect(() => {
        props.refreshTrigger();
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
        app.loanService.getAllLoans().then((res: Loan[] | undefined): void => {
            if (res) {
                setLoansSIG(res);
            }
        })
    }
    
    const handleExtension = async (loan: Loan): Promise<void> => {
        const original = new Date(loan.ExpectedEndDate)
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(original.getDate() + 7);

        await app.loanService.patchLoan(loan.Id, { Extensions: loan.Extensions-1, ExpectedEndDate: sevenDaysLater.toISOString() });
        fetchData();
    }
    
    const handleDelete = async (loan: Loan): Promise<void> => {
        await app.loanService.deleteLoan(loan.Id);
        fetchData();
    }

    const handleReturn = async (loan: Loan): Promise<void> => {
        await app.loanService.patchLoan(loan.Id, { ReturnDate: new Date().toISOString() });
        fetchData();
    }

    return <>
        <div
            class="d-flex justify-content-center"
            style={{"max-height": '100%', "overflow-y": 'auto', padding: '2rem'}}
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
                        Loans
                    </Card.Title>
                    <div class="table-responsive" style={{width: '95%', margin: '0 auto', 'animation': 'fadeInDown 0.5s ease-out'}}>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>BookId</th>
                                    <th>User Email</th>
                                    <th>Extensions</th>
                                    <th>Start date</th>
                                    <th>Expected end</th>
                                    <th>Return date</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                            <For each={loansSIG()}>
                                {(loan: Loan): JSX.Element => (
                                    <tr>
                                        <td>{loan.Id}</td>
                                        <td>{loan.BookId}</td>
                                        <td>{loan.UserEmail}</td>
                                        <td>{loan.Extensions}</td>
                                        <td>{formatDate(loan.StartDate)}</td>
                                        <td>{formatDate(loan.ExpectedEndDate)}</td>
                                        <Show when={loan.ReturnDate === null}
                                            fallback={<>
                                                <td>{formatDate(loan.ReturnDate)}</td>
                                                <td>
                                                    <div class="d-flex justify-content-between gap-2">
                                                        <Button variant="danger" onClick={() => handleDelete(loan)}
                                                                style={{
                                                                    width: '5rem',
                                                                    "min-width": '5rem'
                                                                }}>Delete</Button>
                                                    </div>
                                                </td>
                                            </>}
                                        >
                                            <td>---</td>
                                            <td>
                                                <div class="d-flex justify-content-between gap-2">
                                                    <Button variant="success" onClick={() => handleReturn(loan)}
                                                            style={{width: '5rem', "min-width": '5rem'}}>Return</Button>
                                                    <Button variant="primary" disabled={loan.Extensions === 0}
                                                            onClick={() => handleExtension(loan)}
                                                            style={{width: '5rem', "min-width": '5rem'}}>Extend</Button>
                                                    <Button variant="danger" onClick={() => handleDelete(loan)}
                                                            style={{width: '5rem', "min-width": '5rem'}}>Delete</Button>
                                                </div>
                                            </td>
                                        </Show>
                                    </tr>
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