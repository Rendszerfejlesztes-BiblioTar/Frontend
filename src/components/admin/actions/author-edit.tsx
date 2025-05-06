import { Card, Table, Button, FormControl } from "solid-bootstrap";
import { JSX, useContext, Accessor, from, createSignal, onMount, Show, For } from "solid-js";
import { RegisteredUser } from "../../../interfaces/authentication.interfaces";
import { AuthorGetDTO, AuthorPostDTO, AuthorPutDTO, AuthorDeleteDTO } from "../../../interfaces/author.interfaces";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const [authorSig, setAuthorSig] = createSignal<AuthorGetDTO[]>([]);
    const [isAdding, setIsAdding] = createSignal(false);
    const [newAuthor, setNewAuthor] = createSignal<AuthorPostDTO>({ Name: "", RequesterEmail: user()!.Email });

    const [isEditingId, setIsEditingId] = createSignal<number | null>(null);
    const [editedAuthor, setEditedAuthor] = createSignal<AuthorPutDTO>({ Name: "", RequesterEmail: user()!.Email });

    //add new author
    const handleAddNew = () => {
        setIsAdding(true);
        setNewAuthor({ Name: "", RequesterEmail: user()!.Email });
    };

    const cancelAdd = () => {
        setIsAdding(false);
        setNewAuthor({ Name: "", RequesterEmail: user()!.Email });
    };

    const saveAuthor = async () => {
        setIsAdding(false);
        const author: AuthorPostDTO = {
            Name: newAuthor().Name,
            RequesterEmail: user()!.Email
        };

        try {
            await app.authorService.postAuthor(author);
            const updatedAuthors = await app.authorService.getAuthors();
            setAuthorSig(updatedAuthors || []);
        } catch (error) { }
    };


    const updateNewAuthorName = (value: string) => {
        setNewAuthor({ ...newAuthor(), Name: value });
    };

    //edit
    const startEdit = (author: AuthorGetDTO) => {
        setIsEditingId(author.Id);
        setEditedAuthor({ Name: author.Name, RequesterEmail: user()!.Email });
    };

    const cancelEdit = () => {
        setIsEditingId(null);
        setEditedAuthor({ Name: "", RequesterEmail: user()!.Email });
    };

    const saveEdit = async () => {
        const id = isEditingId();
        if (id === null) return;

        try {
            await app.authorService.putAuthor(id, editedAuthor());
            const updated = await app.authorService.getAuthors();
            setAuthorSig(updated || []);
            setIsEditingId(null);
        } catch (err) { }
    };

    const updateEditedName = (value: string) => {
        setEditedAuthor({ ...editedAuthor(), Name: value });
    };


    //delete
    const deleteAuthor = async (id: number) => {
        setAuthorSig(prev => prev.filter(author => author.Id !== id));

        const requester: AuthorDeleteDTO = {
            RequesterEmail: user()!.Email
        };

        try {
            await app.authorService.deleteAuthor(id, requester);
        } catch (error) {
            const fallback = await app.authorService.getAuthors();
            setAuthorSig(fallback || []);
        }
    };



    onMount((): void => {
        app.authorService.getAuthors().then((res) => {
            setAuthorSig(res || []);
        });
    });

    return (
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": '100%', "overflow-y": 'auto', padding: '2rem' }}
        >
            <Card class="shadow rounded" style={{ width: '80vw', "max-width": '90vw', padding: '1rem' }}>
                <h2 style={{ "font-size": '2rem', "margin-bottom": '1rem', "text-align": 'center' }}>Authors</h2>

                <div class="table-responsive" style={{ width: '95%', margin: '0 auto' }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th style={{ width: '10rem' }}>
                                    <Button
                                        variant="success"
                                        style={{ width: '10rem', "min-width": '10rem' }}
                                        onClick={handleAddNew}
                                        disabled={isAdding()}
                                    >
                                        Add new
                                    </Button>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <Show when={isAdding()}>
                                <tr>
                                    <td>New</td>
                                    <td>
                                        <FormControl
                                            type="text"
                                            value={newAuthor().Name}
                                            onInput={(e) => updateNewAuthorName(e.currentTarget.value)}
                                        />
                                    </td>
                                    <td>
                                        <div class="d-flex justify-content-between gap-2">
                                            <Button variant="success"
                                                onClick={saveAuthor}
                                                style={{ width: '5rem', "min-width": '5rem' }}
                                            >
                                                Save
                                            </Button>
                                            <Button variant="danger" onClick={cancelAdd} style={{ width: '5rem', "min-width": '5rem' }}>Cancel</Button>
                                        </div>
                                    </td>
                                </tr>
                            </Show>

                            <For each={authorSig()}>
                                {(author: AuthorGetDTO): JSX.Element => (
                                    <Show
                                        when={isEditingId() === author.Id}
                                        fallback={
                                            <tr>
                                                <td>{author.Id}</td>
                                                <td>{author.Name}</td>
                                                <td>
                                                    <div class="d-flex justify-content-between gap-2">
                                                        <Button variant="danger" onClick={() => deleteAuthor(author.Id)} style={{ width: '5rem', "min-width": '5rem' }}>Delete</Button>
                                                        <Button variant="primary" onClick={() => startEdit(author)} style={{ width: '5rem', "min-width": '5rem' }}>Edit</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                    >
                                        <tr>
                                            <td>{author.Id}</td>
                                            <td>
                                                <FormControl
                                                    type="text"
                                                    value={editedAuthor().Name}
                                                    onInput={(e) => updateEditedName(e.currentTarget.value)}
                                                />
                                            </td>
                                            <td>
                                                <div class="d-flex justify-content-between gap-2">
                                                    <Button variant="success" onClick={saveEdit} style={{ width: '5rem', "min-width": '5rem' }}>Save</Button>
                                                    <Button variant="danger" onClick={cancelEdit} style={{ width: '5rem', "min-width": '5rem' }}>Cancel</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </Show>
                                )}
                            </For>
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}