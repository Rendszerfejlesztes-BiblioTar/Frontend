import {
    Accessor,
    from,
    JSX,
    Show,
    useContext
} from "solid-js";
import { Button, Card } from "solid-bootstrap";

import { Condition } from "../../../../enums/bookquality.enum";

import { BookGetDTO } from "../../../../interfaces/book.interfaces";
import { RegisteredUser } from "../../../../interfaces/authentication.interfaces";
import { Reservation } from "../../../../interfaces/reservation.interfaces";
import { AppService } from "../../../../services/app.service";
import { DIContextProvider } from "../../../../services/di-context-provider.service";
import { useNavigate } from "@solidjs/router";

export default (props: { book: BookGetDTO }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const navigator = useNavigate();
    const navigate = (id: number): void => {
        navigator(`/book/reservation/${id}`, { replace: false });
    }


    return <>
        <Card.Body class="d-flex flex-column">
            <Card.Title style={{ "font-size": "2.5rem", "font-weight": 'bold' }}>{props.book.Title}</Card.Title>
            <Card.Subtitle class="mb-2" style={{ "font-size": "2rem" }}>{props.book.AuthorName}</Card.Subtitle>
            <Card.Subtitle class="mb-2 text-muted" style={{ "font-size": "1.5rem" }}>{props.book.CategoryName}</Card.Subtitle>

            <hr class="my-2" />
            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                {props.book.Description}
            </Card.Text>

            <hr class="my-2" />

            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                This book is <b>{props.book.IsAvailable ? 'available' : 'currently unavailable'}</b>
            </Card.Text>

            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                This book is <b>{Object.values(Condition)[props.book.BookQuality]}</b> quality
            </Card.Text>

            <Card.Text class="flex-grow-1" style={{ "font-size": "1.5rem" }}>
                Number in library: <b>{props.book.NumberInLibrary}</b>
            </Card.Text>

            <Show when={user() && user()!.Privilege <= 2}>
                <div class="mt-auto">
                <Button
                        variant="info"
                        disabled={!props.book.IsAvailable}
                        style={{ background: '#402208', color: 'white', "border-color": '#402208' }}
                        onClick={async (e) => { 
                            e.stopPropagation();
                            navigate(props.book.Id) 
                        }}
                    >
                        Reserve
                    </Button>
                </div>
            </Show>
        </Card.Body>
    </>
}