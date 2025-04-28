import {
    createSignal,
    JSX
} from "solid-js";

import { BookGetDTO } from "../../../interfaces/book.interfaces";

import { Button, Card } from "solid-bootstrap";

export default (props: { book: BookGetDTO, onClick: () => void }): JSX.Element => {

    const [descriptionSIG, setDescriptionSIG] = createSignal<string>('');
    const [hoveredSIG, setHoveredSIG] = createSignal<boolean>(false);

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
            <div class="mt-auto">
                <Button variant="info" style={{ background: '#402208', color: 'white', "border-color": '#402208'}}>Reserve</Button>
            </div>
        </Card.Body>
    </Card>
}