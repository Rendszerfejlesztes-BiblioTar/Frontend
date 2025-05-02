import {
    Accessor,
    createSignal,
    from,
    JSX,
    Match,
    onMount,
    Show,
    Switch,
    useContext
} from "solid-js";
import { Params, useParams } from "@solidjs/router";

import { Card } from "solid-bootstrap";

import { DIContextProvider } from "../../../services/di-context-provider.service";
import { AppService } from "../../../services/app.service";

import { BookGetDTO } from "../../../interfaces/book.interfaces";
import { RegisteredUser } from "../../../interfaces/authentication.interfaces";

import BookView from "./book-views/book-view";
import BookEditCreate from "./book-views/book-edit-create";

export default (props: {mode: string}): JSX.Element => {
  const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

  const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

  const [bookSIG, setBookSIG] = createSignal<BookGetDTO | null>(null);
  const [modeSIG, setModeSIG] = createSignal<string>('view');

  onMount((): void => {
      setModeSIG(props.mode);

      if (props.mode !== 'create') {
          const params: Params = useParams();

          app.bookService.getBook(params.id).then((book: BookGetDTO | undefined): void => {
              if (book) {
                  setBookSIG(book);
              }
          })
      }
  });

  const handleEdit = (e: Event): void => {
    e.preventDefault();

  };

  const handleCreate = (e: Event): void => {

  }

  return <>
      <div class="d-flex justify-content-center" style={{"max-height": '100%', "overflow-y": 'auto', padding: '2rem'}}>
          <Card class="shadow rounded" style={{width: '80vw', "max-width": '60vw'}}>
              <Show when={modeSIG() === 'view' && bookSIG()}>
                  {(book: Accessor<BookGetDTO>): JSX.Element => (
                      <Switch>
                          <Match when={user()!.Privilege !== 0}>
                              <BookView book={book()}/>
                          </Match>
                          <Match when={user()!.Privilege === 0}>
                              <BookEditCreate book={book()} handleSubmit={handleEdit}/>
                          </Match>
                      </Switch>
                  )}
              </Show>
              <Show when={modeSIG() === 'create'}>
                  <BookEditCreate handleSubmit={handleCreate}/>
              </Show>
          </Card>
      </div>
  </>
}