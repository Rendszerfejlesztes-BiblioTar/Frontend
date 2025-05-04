import {
    JSX
} from "solid-js";
import { Button, Card } from "solid-bootstrap";

import { Condition } from "../../../../enums/bookquality.enum";

import { BookGetDTO } from "../../../../interfaces/book.interfaces";

export default (props: {book: BookGetDTO}): JSX.Element => {
    
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

            <div class="mt-auto">
                <Button variant="info" style={{ background: '#402208', color: 'white', "border-color": '#402208' }}>Reserve</Button>
            </div>
        </Card.Body>
    </>
}