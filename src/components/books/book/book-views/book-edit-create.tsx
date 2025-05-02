import {
    JSX
} from "solid-js";
import { useNavigate } from "@solidjs/router";

import { Button, Card } from "solid-bootstrap";

import { BookGetDTO } from "../../../../interfaces/book.interfaces";

import DropdownUtil from "../../../utility/dropdown-util";

export default (props: { book?: BookGetDTO, handleSubmit: (e: Event) => void }): JSX.Element => {
    const navigate = useNavigate();

    return <>
        <Card.Body class="d-flex flex-column">
            <Card.Title style={{ "font-size": "2.5rem", "font-weight": 'bold' }}>{props.book !== undefined ? 'Edit book' : 'Create book'}</Card.Title>

            <hr class="my-2" />

            <form onSubmit={props.handleSubmit}>
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
    </>
}