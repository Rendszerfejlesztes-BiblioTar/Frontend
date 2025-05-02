import { Form } from "solid-bootstrap"
import { createSignal, For, JSX, Show, useContext } from "solid-js"
import { BookGetDTO } from "../../interfaces/book.interfaces";
import { AppService } from "../../services/app.service";
import { DIContextProvider } from "../../services/di-context-provider.service";
import { AuthorGetDTO } from "../../interfaces/author.interfaces";
import { CategoryGetDTO } from "../../interfaces/category.interfaces";

export default (props: { type: number, search: boolean }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const [authorSig, setAuthorSig] = createSignal<AuthorGetDTO[]>([]);
    const [categorySig, setCategorySig] = createSignal<CategoryGetDTO[]>([]);

    if (props.type == 0) {
        //Author search
        app.authorService.getAuthors().then((res: AuthorGetDTO[] | undefined): void => {
            if (res) {
                setAuthorSig(res);
            }
            else {
                setAuthorSig([]);
            }
        });
    }

    if (props.type == 1) {
        //Category
        // app.categoryService.getCategories().then((res: CategoryGetDTO[] | undefined): void => {
        //     if (res) {
        //         setCategorySig(res);
        //     }
        //     else {
        //         setCategorySig([]);
        //     }
        // });
    }

    return <>
        <Form.Select>
            <Show when={props.search === true}>
                <option selected disabled>Search Category</option>
            </Show>
            <Show when={props.type === 0}>
                <For each={authorSig()}>
                    {(author: AuthorGetDTO) => {
                        return <option value={author.Id}>{author.Name}</option>;
                    }}
                </For>
            </Show>

            <Show when={props.type === 1}>
                <For each={categorySig()}>
                    {(category: CategoryGetDTO) => {
                        return <option value={category.Id}>{category.Name}</option>;
                    }}
                </For>
            </Show>

            <Show when={props.type === 2}>
                <option value="1">As New</option>
                <option value="2">Fine</option>
                <option value="3">Good</option>
                <option value="4">Fair</option>
                <option value="5">Poor</option>
            </Show>
        </Form.Select>
    </>
}