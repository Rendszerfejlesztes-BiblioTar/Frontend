import { Button, Form, Row, Col, Container, Card } from "solid-bootstrap"
import { createSignal, JSX, onMount, useContext } from "solid-js"
import { AppService } from "../../services/app.service";
import { DIContextProvider } from "../../services/di-context-provider.service";
import DebouncedInput from "./debounced-input";

export default (): JSX.Element => {

    // const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    // const [categoriesSIG, setCategoriesSIG] = createSignal<CategoryGetDto[]>([]);

    //     onMount((): void => {
    //         app.bookService.getBooks().then((res: CategoryGetDto[] | undefined): void => {
    //             if (res) {
    //                 console.log(res);
    //                 setCategoriesSIG(res);
    //             }
    //         });
    //     });

    return (
        <Container class="mt-5 px-4">
            <Form>
                <Row class="mb-4 align-items-end">
                    <Col class="me-3">
                        <Form.Group controlId="formBookSearch">
                            {/* <Form.Control type="text" placeholder="Search for books" /> */}
                            <DebouncedInput
                                placeholder = "Search for books"
                                type={0}
                            />

                        </Form.Group>
                    </Col>
                    <Col class="me-3">
                        <Form.Group controlId="formCategorySelect">
                            <Form.Select>
                                <option selected disabled>Search Category</option>
                                {/* TODO!!! add categories from service */}
                                <option value="1">Fantasy</option>
                                <option value="2">Adventure</option>
                                <option value="3">Mystery</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col class="me-3">
                        <Form.Group controlId="formAuthorSearch">
                            <DebouncedInput
                                placeholder = "Search by author"
                                type={1}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
