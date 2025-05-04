import { Form } from "solid-bootstrap"
import { createSignal, For, JSX, onMount, Show, useContext } from "solid-js"
import { BookGetDTO } from "../../interfaces/book.interfaces";
import { AppService } from "../../services/app.service";
import { DIContextProvider } from "../../services/di-context-provider.service";
import { AuthorGetDTO } from "../../interfaces/author.interfaces";
import { CategoryGetDTO } from "../../interfaces/category.interfaces";

export default (props: { value: string, type: number, search: boolean, setBooksSIG?: (books: BookGetDTO[]) => void, setAuthor?: (author: string) => void, setCategory?: (category: string) => void, setQuality?: (quality: string) => void }): JSX.Element => {

    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const [authorSig, setAuthorSig] = createSignal<AuthorGetDTO[]>([]);
    const [categorySig, setCategorySig] = createSignal<CategoryGetDTO[]>([]);
    const [selectedValue, setSelectedValue] = createSignal<string>("");

    

    onMount(() => {
        if (props.type === 0) {
            app.authorService.getAuthors().then((res) => {
                if (res) {
                    setAuthorSig(res);
                    const selected = props.value || "1";
                    setSelectedValue(selected);
                    props.setAuthor?.(selected);
                } else {
                    setAuthorSig([]);
                }
            });
        }
    
        if (props.type === 1) {
            app.categoryService.getCategories().then((res) => {
                if (res) {
                    setCategorySig(res);
                    const selected = props.value || "1";
                    setSelectedValue(selected);
                    props.setCategory?.(selected);
                } else {
                    setCategorySig([]);
                }
            });
        }
    
        if (props.type === 2) {
            const selected = props.value || "1";
            setSelectedValue(selected);
            props.setQuality?.(selected);
        }
    });
    

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
                app.bookService.getBooksByCategory(select.options[select.selectedIndex].text).then((res: BookGetDTO[] | undefined): void => {
                    if (res) {
                        props.setBooksSIG!(res);
                    } else {
                        props.setBooksSIG!([]);
                    }
                });
            }
            if (props.search && selectedValue == "0") {
                app.bookService.getBooks().then((res: BookGetDTO[] | undefined): void => {
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
        <Form.Select onChange={handleChange} value={selectedValue()}>
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