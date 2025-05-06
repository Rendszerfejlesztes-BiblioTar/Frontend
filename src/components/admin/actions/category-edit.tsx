import { Card, Table, Button, FormControl } from "solid-bootstrap";
import { JSX, useContext, Accessor, from, createSignal, onMount, Show, For } from "solid-js";
import { RegisteredUser } from "../../../interfaces/authentication.interfaces";
import { CategoryDeleteDTO, CategoryGetDTO, CategoryPostDTO, CategoryPutDTO } from "../../../interfaces/category.interfaces";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const [categorySig, setCategorySig] = createSignal<CategoryGetDTO[]>([]);
    const [isAdding, setIsAdding] = createSignal(false);
    const [newCategory, setNewCategory] = createSignal<CategoryPostDTO>({ Name: "", RequesterEmail: user()!.Email });

    const [isEditingId, setIsEditingId] = createSignal<number | null>(null);
    const [editedCategory, setEditedCategory] = createSignal<CategoryPutDTO>({ Name: "", RequesterEmail: user()!.Email });

    // add new category
    const handleAddNew = () => {
        setIsAdding(true);
        setNewCategory({ Name: "", RequesterEmail: user()!.Email });
    };

    const cancelAdd = () => {
        setIsAdding(false);
        setNewCategory({ Name: "", RequesterEmail: user()!.Email });
    };

    const saveCategory = async () => {
        setIsAdding(false);
        const category: CategoryPostDTO = {
            Name: newCategory().Name,
            RequesterEmail: user()!.Email
        };

        try {
            await app.categoryService.postCategory(category);
            const updatedCategories = await app.categoryService.getCategories();
            setCategorySig(updatedCategories || []);
        } catch (error) { }
    };

    const updateNewCategoryName = (value: string) => {
        setNewCategory({ ...newCategory(), Name: value });
    };

    // edit
    const startEdit = (category: CategoryGetDTO) => {
        setIsEditingId(category.Id);
        setEditedCategory({ Name: category.Name, RequesterEmail: user()!.Email });
    };

    const cancelEdit = () => {
        setIsEditingId(null);
        setEditedCategory({ Name: "", RequesterEmail: user()!.Email });
    };

    const saveEdit = async () => {
        const id = isEditingId();
        if (id === null) return;

        try {
            await app.categoryService.putCategory(id, editedCategory());
            const updated = await app.categoryService.getCategories();
            setCategorySig(updated || []);
            setIsEditingId(null);
        } catch (err) { }
    };

    const updateEditedName = (value: string) => {
        setEditedCategory({ ...editedCategory(), Name: value });
    };

    // delete
    const deleteCategory = async (id: number) => {
        setCategorySig(prev => prev.filter(category => category.Id !== id));

        const requester: CategoryDeleteDTO = {
            RequesterEmail: user()!.Email
        };

        try {
            await app.categoryService.deleteCategory(id, requester);
        } catch (error) {
            const fallback = await app.categoryService.getCategories();
            setCategorySig(fallback || []);
        }
    };

    onMount((): void => {
        app.categoryService.getCategories().then((res) => {
            setCategorySig(res || []);
        });
    });

    return (
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": '100%', "overflow-y": 'auto', padding: '2rem' }}
        >
            <Card class="shadow rounded" style={{ width: '80vw', "max-width": '90vw', padding: '1rem' }}>
                <h2 style={{ "font-size": '2rem', "margin-bottom": '1rem', "text-align": 'center' }}>Categories</h2>

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
                                            value={newCategory().Name}
                                            onInput={(e) => updateNewCategoryName(e.currentTarget.value)}
                                        />
                                    </td>
                                    <td>
                                        <div class="d-flex justify-content-between gap-2">
                                            <Button variant="success"
                                                onClick={saveCategory}
                                                style={{ width: '5rem', "min-width": '5rem' }}
                                            >
                                                Save
                                            </Button>
                                            <Button variant="danger" onClick={cancelAdd} style={{ width: '5rem', "min-width": '5rem' }}>Cancel</Button>
                                        </div>
                                    </td>
                                </tr>
                            </Show>

                            <For each={categorySig()}>
                                {(category: CategoryGetDTO): JSX.Element => (
                                    <Show
                                        when={isEditingId() === category.Id}
                                        fallback={
                                            <tr>
                                                <td>{category.Id}</td>
                                                <td>{category.Name}</td>
                                                <td>
                                                    <div class="d-flex justify-content-between gap-2">
                                                        <Button variant="danger" onClick={() => deleteCategory(category.Id)} style={{ width: '5rem', "min-width": '5rem' }}>Delete</Button>
                                                        <Button variant="primary" onClick={() => startEdit(category)} style={{ width: '5rem', "min-width": '5rem' }}>Edit</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                    >
                                        <tr>
                                            <td>{category.Id}</td>
                                            <td>
                                                <FormControl
                                                    type="text"
                                                    value={editedCategory().Name}
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
