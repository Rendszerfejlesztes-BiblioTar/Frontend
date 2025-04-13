import {
    createSignal,
    JSX, onMount, Show, useContext
} from "solid-js";

import { Params, useParams } from "@solidjs/router";

import { DIContextProvider } from "../../../services/di-context-provider.service";
import { AppService } from "../../../services/app.service";

import { BookFromId } from "../../../interfaces/book.interfaces";

import style from "./book.module.scss";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const [bookSIG, setBookSIG] = createSignal<BookFromId | null>(null);

    onMount((): void => {

        const params: Params = useParams();

        app.bookService.getBook(params.id).then((book: BookFromId | undefined): void => {
            if (book) {
                setBookSIG(book);
            }
        })
    });


    return <>
        <div class={`book ${style['book']}`}>
            <div class={'content'}>
                <Show when={bookSIG()}>
                    <h1>{bookSIG()!.title}</h1>
                    <p>{bookSIG()!.category.name}</p>
                    <p>{bookSIG()!.description}</p>
                    <p>{bookSIG()!.isAvailable ? 'Available' : 'Unavailable'}</p>
                    <p>{bookSIG()!.numberInLibrary}</p>
                </Show>
            </div>
        </div>
    </>
}