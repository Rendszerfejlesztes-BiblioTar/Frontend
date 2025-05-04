import { Button, Form, Row, Col, Container, Card } from "solid-bootstrap"
import { createSignal, JSX, onMount, useContext } from "solid-js"
import { AppService } from "../../services/app.service";
import { DIContextProvider } from "../../services/di-context-provider.service";
import DebouncedInput from "./debounced-input";
import { BookGetDTO } from "../../interfaces/book.interfaces";
import DropdownUtil from "./dropdown-util";


export default (props: { setBooksSIG: (books: BookGetDTO[]) => void }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const [searchText, setSearchText] = createSignal("");
    const [authorText, setAuthorText] = createSignal("");
    const [selectedCategory, setSelectedCategory] = createSignal("");

    const resetFilters = (): void => {
        setSearchText("");
        setAuthorText("");
        setSelectedCategory("");

        app.bookService.getBooks().then((res: BookGetDTO[] | undefined): void => {
            if (res) {
                props.setBooksSIG(res);
            }
        });
    };

    return (
        <Container class="mt-5 px-4">
            <Form>
                <Row class="mb-4 align-items-end">
                    <Col class="me-3">
                        <Form.Group controlId="formBookSearch">
                            <DebouncedInput
                                placeholder = "Search for books"
                                type={0}
                                setBooksSIG={props.setBooksSIG}
                            />

                        </Form.Group>
                    </Col>
                    <Col class="me-3">
                        <Form.Group controlId="formCategorySelect">
                            <DropdownUtil type={1} search={true} setBooksSIG={props.setBooksSIG} value=""></DropdownUtil>
                        </Form.Group>
                    </Col>
                    <Col class="me-3">
                        <Form.Group controlId="formAuthorSearch">
                            <DebouncedInput
                                placeholder = "Search by author"
                                type={1}
                                setBooksSIG={props.setBooksSIG}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Button on:click={resetFilters} type="reset" variant="danger">Clear filters</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
