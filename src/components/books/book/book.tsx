import {
    createSignal,
    JSX,
    onMount,
    Show,
    useContext
} from "solid-js";

import { Params, useParams } from "@solidjs/router";

import { DIContextProvider } from "../../../services/di-context-provider.service";
import { AppService } from "../../../services/app.service";

import { BookGetDTO } from "../../../interfaces/book.interfaces";

import { Card, Button } from "solid-bootstrap";
import { Condition } from "../../../enums/bookquality.enum"

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const [bookSIG, setBookSIG] = createSignal<BookGetDTO | null>(null);

    onMount((): void => {

        const params: Params = useParams();

        app.bookService.getBook(params.id).then((book: BookGetDTO | undefined): void => {
            if (book) {
                setBookSIG(book);
            }
        })
    });

    return (
        <Show when={bookSIG()}>
          {(book) => (
            <div class="d-flex justify-content-center" style={{ "max-height": '100%', "overflow-y": 'auto', padding: '2rem' }}>
              <Card class="shadow rounded" style={{ width: '80vw', "max-width": '60vw' }}>
                <Card.Body class="d-flex flex-column">
                  <Card.Title style={{ "font-size": "2.5rem", "font-weight": 'bold' }}>{book().title}</Card.Title>
                  <Card.Subtitle class="mb-2" style={{ "font-size": "2rem" }}>{book().authorName}</Card.Subtitle>
                  <Card.Subtitle class="mb-2 text-muted" style={{ "font-size": "1.5rem" }}>{book().categoryName}</Card.Subtitle>
      
                  <hr class="my-2" />
                  <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                    {book().description}
                  </Card.Text>
      
                  <hr class="my-2" />
      
                  <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                    This book is <b>{book().isAvailable ? 'available' : 'currently unavailable'}</b>
                  </Card.Text>
      
                  <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                    This book is <b>{Object.values(Condition)[book().bookQuality]}</b> quality
                  </Card.Text>

                  <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                    Number in library: <b>{book().numberInLibrary}</b>
                  </Card.Text>
      
                  <div class="mt-auto">
                    <Button variant="info" style={{ background: '#402208', color: 'white', "border-color": '#402208' }}>Reserve</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </Show>
      );
}