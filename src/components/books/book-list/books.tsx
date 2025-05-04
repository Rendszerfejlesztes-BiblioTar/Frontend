import {
    Accessor,
    createSignal,
    For,
    from,
    JSX,
    onMount,
    Show,
    useContext
} from 'solid-js';
import { useNavigate } from "@solidjs/router";

import { DIContextProvider } from '../../../services/di-context-provider.service';
import { AppService } from '../../../services/app.service';

import { BookGetDTO } from '../../../interfaces/book.interfaces';

import BookCard from '../book-card/book-card';

import SearchUtil from '../../utility/search-util';
import NewButtonUtil from '../../utility/newButton-util';
import { RegisteredUser } from '../../../interfaces/authentication.interfaces';

export default (): JSX.Element => {
    const navigator = useNavigate();

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const [booksSIG, setBooksSIG] = createSignal<BookGetDTO[]>([]);


    onMount((): void => {
        app.bookService.getBooks().then((res: BookGetDTO[] | undefined): void => {
            if (res) {
                setBooksSIG(res);
            }
        });
    });

    const navigate = (id: number): void => {
        navigator(`/books/${id}`, { replace: false });
    }

    return <>
        <SearchUtil setBooksSIG={setBooksSIG}></SearchUtil>
        <div class="row" style={{
            "margin-top": '1rem', "margin-left": '0.25rem', "margin-right": '0.25rem',
        }}>
            <For each={booksSIG()}>
                {(book: BookGetDTO): JSX.Element => {
                    return <div class="col-2 d-flex justify-content-center mb-4">
                        <BookCard
                            book={book}
                            onClick={(): void => { navigate(book.Id) }}
                            onDelete={() => setBooksSIG(prev => prev.filter(b => b.Id !== book.Id))}
                        />
                    </div>
                }}
            </For>
        </div>
        <Show when={user() && user()!.Privilege === 0}>
            <NewButtonUtil></NewButtonUtil>
        </Show>
    </>
}