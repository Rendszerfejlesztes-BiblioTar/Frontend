import {
  Accessor,
  createSignal,
  from,
  JSX,
  onMount,
  Show,
  useContext
} from "solid-js";

import { Params, useNavigate, useParams, useSearchParams } from "@solidjs/router";

import { DIContextProvider } from "../../../services/di-context-provider.service";
import { AppService } from "../../../services/app.service";

import { BookGetDTO } from "../../../interfaces/book.interfaces";

import { Card, Button } from "solid-bootstrap";
import { Condition } from "../../../enums/bookquality.enum"
import { RegisteredUser } from "../../../interfaces/authentication.interfaces";
import DropdownUtil  from "../../utility/dropdown-util";

export default (): JSX.Element => {
  const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

  const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

  const [bookSIG, setBookSIG] = createSignal<BookGetDTO | null>(null);

  const navigate = useNavigate();

  onMount((): void => {

    const params: Params = useParams();

    app.bookService.getBook(params.id).then((book: BookGetDTO | undefined): void => {
      if (book) {
        setBookSIG(book);
      }
    })
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();

  };

  return (
    <Show when={bookSIG()}>
      {(book) => (
        <div class="d-flex justify-content-center" style={{ "max-height": '100%', "overflow-y": 'auto', padding: '2rem' }}>
          <Card class="shadow rounded" style={{ width: '80vw', "max-width": '60vw' }}>
            <Show when={user() && user()!.Privilege > 0}>
              <Card.Body class="d-flex flex-column">
                <Card.Title style={{ "font-size": "2.5rem", "font-weight": 'bold' }}>{book().Title}</Card.Title>
                <Card.Subtitle class="mb-2" style={{ "font-size": "2rem" }}>{book().AuthorName}</Card.Subtitle>
                <Card.Subtitle class="mb-2 text-muted" style={{ "font-size": "1.5rem" }}>{book().CategoryName}</Card.Subtitle>

                <hr class="my-2" />
                <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                  {book().Description}
                </Card.Text>

                <hr class="my-2" />

                <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                  This book is <b>{book().IsAvailable ? 'available' : 'currently unavailable'}</b>
                </Card.Text>

                <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                  This book is <b>{Object.values(Condition)[book().BookQuality]}</b> quality
                </Card.Text>

                <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                  Number in library: <b>{book().NumberInLibrary}</b>
                </Card.Text>

                <div class="mt-auto">
                  <Button variant="info" style={{ background: '#402208', color: 'white', "border-color": '#402208' }}>Reserve</Button>
                </div>
              </Card.Body>
            </Show>

            {/* Edit mode */}
            <Show when={user() && user()!.Privilege === 0}>
              <Card.Body class="d-flex flex-column">
                <Card.Title style={{ "font-size": "2.5rem", "font-weight": 'bold' }}>Edit book</Card.Title>

                <hr class="my-2" />

                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="author" class="form-label">Author</label>
                    <DropdownUtil type={0} search={false}></DropdownUtil>
                  </div>

                  <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <DropdownUtil type={1} search={false}></DropdownUtil>
                  </div>

                  <div class="mb-3">
                    <label for="desc" class="form-label">Description</label>
                    <input
                      id="desc"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="isAvailable" class="form-label">Availability</label>
                    <input id="isAvailable" class="form-check-input" type="checkbox" required/>
                  </div>

                  <div class="mb-3">
                    <label for="numInLib" class="form-label">Number in library</label>
                    <input
                      id="numInLib"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="quality" class="form-label">Quality</label>
                    <DropdownUtil type={2} search={false}></DropdownUtil>
                  </div>
                 
                  <div class="d-flex gap-2 mt-auto">
                    <Button class="btn btn-primary w-100" variant="danger" onClick={() => {navigate('/books')}}>Cancel</Button>
                    <Button type="submit" class="btn btn-primary w-100" variant="success">Update</Button>
                  </div>
                </form>
              </Card.Body>
            </Show>
          </Card>
        </div>
      )}
    </Show>
  );
}