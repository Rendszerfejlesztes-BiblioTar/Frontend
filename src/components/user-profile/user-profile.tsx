import {
    Accessor, from,
    JSX, onMount, useContext
} from "solid-js";
import {DIContextProvider} from "../../services/di-context-provider.service";
import {AppService} from "../../services/app.service";
import {RegisteredUser} from "../../interfaces/authentication.interfaces";
import DataChangeComponent from "./profile-components/data-change-component";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    onMount((): void => {
       console.log(user());
    });

    return <>
        <DataChangeComponent></DataChangeComponent>
    </>
}