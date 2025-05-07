import {
    Accessor, from,
    JSX, onMount, useContext
} from "solid-js";
import {DIContextProvider} from "../../services/di-context-provider.service";
import {AppService} from "../../services/app.service";
import {RegisteredUser} from "../../interfaces/authentication.interfaces";
import DataChangeComponent from "./profile-components/data-change-component";
import PasswordChangeComponent from "./profile-components/password-change-component";
import ReservationComponent from "./profile-components/reservation-component";
import LoanComponent from "./profile-components/loan-component";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    onMount((): void => {
       console.log(user());
    });

    return <>
        <DataChangeComponent></DataChangeComponent>
        <PasswordChangeComponent></PasswordChangeComponent>
        <LoanComponent></LoanComponent>
        <ReservationComponent></ReservationComponent>
    </>
}