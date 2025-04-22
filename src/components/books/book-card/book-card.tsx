import {
    JSX
} from "solid-js";

import { BookGetDTO } from "../../../interfaces/book.interfaces";

import { Button, Card } from "solid-bootstrap";

export default (props: { book: BookGetDTO, onClick: () => void }): JSX.Element => {
    return <Card style={{ width: '15rem', height: '100%' }} onClick={props.onClick} class="d-flex flex-column shadow rounded">
        <Card.Body class="d-flex flex-column">
            <Card.Title>{props.book.title}</Card.Title>
            <Card.Subtitle class="mb-2 text-muted">{props.book.categoryName}</Card.Subtitle>
            <Card.Text class="flex-grow-1">
                {props.book.description}
            </Card.Text>
            <div class="mt-auto">
                <Button variant="info" style={{ background: '#402208', color: 'white', "border-color": '#402208'}}>Reserve</Button>
            </div>
        </Card.Body>
    </Card>
}