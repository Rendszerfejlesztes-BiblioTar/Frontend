import {
    JSX
} from "solid-js";

import Reservation from "./reservations/reservation";
import Loans from "./loans/loans";

export default (): JSX.Element => {

    return <>
        <Reservation />
        <Loans />
    </>
}