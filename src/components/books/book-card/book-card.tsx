import {
    Accessor,
    createSignal,
    from,
    JSX,
    onMount,
    Show,
    useContext
} from "solid-js";

import { BookGetDTO } from "../../../interfaces/book.interfaces";

import { Button, Card } from "solid-bootstrap";
import { RegisteredUser } from "../../../interfaces/authentication.interfaces";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";
import { useNavigate } from "@solidjs/router";

export default (props: { book: BookGetDTO, onClick: () => void, onDelete: () => void }): JSX.Element => {

    const [descriptionSIG, setDescriptionSIG] = createSignal<string>('');
    const [hoveredSIG, setHoveredSIG] = createSignal<boolean>(false);

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const navigator = useNavigate();
    const navigate = (id: number): void => {
        navigator(`/book/reservation/${id}`, { replace: false });
    }

    if (props.book.Description != null) {
        if (props.book.Description.length > 50) {
            setDescriptionSIG(props.book.Description.substring(0, 50) + '...');
        }
        else {
            setDescriptionSIG(props.book.Description);
        }
    }

    return <Card
        style={{
            animation: 'zoomIn 0.3s ease-out',
            width: '15rem',
            height: '100%',
            cursor: 'pointer',
            transition: '0.3s ease',
            transform: hoveredSIG() ? 'scale(1.05)' : ''
        }}
        onMouseEnter={(): true => setHoveredSIG(true)}
        onMouseLeave={(): false => setHoveredSIG(false)}
        onClick={props.onClick}
        class="d-flex flex-column shadow rounded">
        <Card.Body class="d-flex flex-column">
            <Card.Title style={{ "font-size": "1.5rem", "font-weight": 'bold' }}>{props.book.Title}</Card.Title>

            <Card.Subtitle class="mb-2" style={{ "font-size": "1.15rem" }}>{props.book.AuthorName}</Card.Subtitle>
            <Card.Subtitle class="mb-2 text-muted" style={{ "font-size": "1rem" }}>{props.book.CategoryName}</Card.Subtitle>

            <hr class="my-2" />
            <Card.Text class="flex-grow-1" style={{ "font-size": "1.2rem" }}>
                {descriptionSIG()}
            </Card.Text>

            <Show when={user() && user()!.Privilege == 2}>
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

            <Show when={user() && user()!.Privilege < 2}>
                <div class="d-flex gap-2 mt-auto">
                    <Button
                        variant="danger"
                        onClick={async (e) => {
                            e.stopPropagation();
                            try {
                                await app.bookService.deleteBook(props.book.Id);
                                props.onDelete();
                            } catch (error) { }
                        }}
                    >
                        Delete
                    </Button>

                    <Button variant="success">
                        Edit
                    </Button>

                </div>
            </Show>
        </Card.Body>
    </Card>
}