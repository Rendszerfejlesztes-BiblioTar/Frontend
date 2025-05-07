import {
    createSignal,
    JSX
} from "solid-js";

import Reservation from "./reservations/reservation";
import Loans from "./loans/loans";

export default (): JSX.Element => {
    const [refreshLoans, setRefreshLoans] = createSignal<boolean>(false);

    return <>
        <Reservation onReservationChange={(): boolean => setRefreshLoans((prev: boolean): boolean => !prev)} />
        <Loans refreshTrigger={refreshLoans} />
    </>
}