import {
    createSignal,
    JSX,
    useContext
} from "solid-js";
import { useNavigate } from "@solidjs/router";

import { Button, Card } from "solid-bootstrap";

import { BookGetDTO, BookPostDTO } from "../../../../interfaces/book.interfaces";

import DropdownUtil from "../../../utility/dropdown-util";
import { AppService } from "../../../../services/app.service";
import { DIContextProvider } from "../../../../services/di-context-provider.service";

export default (props: { book?: BookGetDTO, handleSubmit: (e: Event, formData: any) => void }): JSX.Element => {
    const navigate = useNavigate();

    const [title, setTitle] = createSignal('');
    const [author, setAuthor] = createSignal('');
    const [category, setCategory] = createSignal('');
    const [desc, setDesc] = createSignal('');
    const [isAvailable, setIsAvailable] = createSignal(false);
    const [numInLib, setNumInLib] = createSignal('');
    const [quality, setQuality] = createSignal('');
    
    const handleFormSubmit = (e: Event) => {
        e.preventDefault();
        const book: BookPostDTO = {
            Title: title() || undefined,
            AuthorId: parseInt(author()),
            CategoryId: parseInt(category()),
            Description: desc() || undefined,
            IsAvailable: isAvailable() || undefined,
            NumberInLibrary: numInLib() ? numInLib().toString() : undefined,
            BookQuality: parseInt(quality())
        };        
        
        props.handleSubmit(e, book);
    };

    return <>
        <Card.Body class="d-flex flex-column">
            <Card.Title style={{ "font-size": "2.5rem", "font-weight": 'bold' }}>{props.book !== undefined ? 'Edit book' : 'Create book'}</Card.Title>

            <hr class="my-2" />

            <form onSubmit={handleFormSubmit}>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                        id="title"
                        type="text"
                        class="form-control"
                        value={title()}
                        onInput={(e) => setTitle(e.currentTarget.value)}
                        required
                    />
                </div>

                <div class="mb-3">
                    <label for="author" class="form-label">Author</label>
                    <DropdownUtil type={0} search={false} setAuthor={setAuthor} />
                </div>

                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <DropdownUtil type={1} search={false} setCategory={setCategory}></DropdownUtil>
                </div>

                <div class="mb-3">
                    <label for="desc" class="form-label">Description</label>
                    <input
                        id="desc"
                        type="text"
                        class="form-control"
                        value={desc()}
                        onInput={(e) => setDesc(e.currentTarget.value)}
                    />
                </div>

                <div class="mb-3">
                    <label for="isAvailable" class="form-label">Availability</label>
                    <input id="isAvailable" class="form-check-input" type="checkbox" required
                        checked={isAvailable()}
                        onChange={(e) => setIsAvailable(e.currentTarget.checked)}
                    />

                </div>

                <div class="mb-3">
                    <label for="numInLib" class="form-label">Number in library</label>
                    <input
                        id="numInLib"
                        type="text"
                        class="form-control"
                        required
                        value={numInLib()}
                        onInput={(e) => setNumInLib(e.currentTarget.value)}
                    />
                </div>

                <div class="mb-3">
                    <label for="quality" class="form-label">Quality</label>
                    <DropdownUtil type={2} search={false} setQuality={setQuality}></DropdownUtil>
                </div>

                <div class="d-flex gap-2 mt-auto">
                    <Button class="btn btn-primary w-100" variant="danger" onClick={() => { navigate('/books') }}>Cancel</Button>
                    <Button type="submit" class="btn btn-primary w-100" variant="success">Create</Button>
                </div>
            </form>
        </Card.Body>
    </>
}