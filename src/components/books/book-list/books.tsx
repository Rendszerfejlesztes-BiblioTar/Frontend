import {
    createSignal,
    For,
    JSX,
    onMount,
    useContext
} from 'solid-js';
import { useNavigate } from "@solidjs/router";

import { DIContextProvider } from '../../../services/di-context-provider.service';
import { AppService } from '../../../services/app.service';

import { Book } from '../../../interfaces/book.interfaces';

import style from './books.module.scss';

import BookCard from '../book-card/book-card';

export default (): JSX.Element => {
    const navigator = useNavigate();

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const [booksSIG, setBooksSIG] = createSignal<Book[]>([]);

    onMount((): void => {
        app.bookService.getBooks().then((res: Book[] | undefined): void => {
            if (res) {
                setBooksSIG(res);
            }
        });
    });

    const navigate = (id: number): void => {
        navigator(`/books/${id}`, { replace: false });
    }

    return <>
        <div class={`books ${style['books']}`}>
            <div class={'book-container'}>
                <For each={booksSIG()}>
                    {(item: Book): JSX.Element => {
                        return <BookCard
                            book={item}
                            onClick={(): void => { navigate(item.id) }}
                        />
                    }}
                </For>
            </div>
        </div>
    </>
}