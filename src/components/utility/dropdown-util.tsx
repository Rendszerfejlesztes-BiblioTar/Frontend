import { Form } from "solid-bootstrap"
import { createSignal, For, JSX, Show, useContext } from "solid-js"
import { BookGetDTO } from "../../interfaces/book.interfaces";
import { AppService } from "../../services/app.service";
import { DIContextProvider } from "../../services/di-context-provider.service";
import { AuthorGetDTO } from "../../interfaces/author.interfaces";
import { CategoryGetDTO } from "../../interfaces/category.interfaces";

export default (props: { type: number, search: boolean, setBooksSIG?: (books: BookGetDTO[]) => void, setAuthor?: (author: string) => void, setCategory?: (category: string) => void, setQuality?: (quality: string) => void }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const [authorSig, setAuthorSig] = createSignal<AuthorGetDTO[]>([]);
    const [categorySig, setCategorySig] = createSignal<CategoryGetDTO[]>([]);
    const [selectedCategory, setSelectedCategory] = createSignal<string>("");

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
        app.categoryService.getCategories().then((res: CategoryGetDTO[] | undefined): void => {
            if (res) {
                setCategorySig(res);
            }
            else {
                setCategorySig([]);
            }
        });
    }

    const handleChange = (e: Event) => {
        const select = e.target as HTMLSelectElement;
        const selectedValue = select.value;

        if (props.type === 0) {
            if (props.setAuthor) {
                props.setAuthor(selectedValue);
            }
        } else if (props.type === 1) {
            if (props.setCategory) {
                props.setCategory(selectedValue);
            }
            if (props.search && selectedValue !== "0" && props.setBooksSIG) {
                app.bookService.getBooksByCategory(selectedValue).then((res: BookGetDTO[] | undefined): void => {
                    if (res) {
                        props.setBooksSIG!(res);
                    } else {
                        props.setBooksSIG!([]);
                    }
                });
            }
        } else if (props.type === 2) {
            if (props.setQuality) {
                props.setQuality(selectedValue);
            }
        }
    };
    
    return <>
        <Form.Select onChange={handleChange}>
            <Show when={props.search === true}>
                <option value="0" selected>Search Category</option>
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