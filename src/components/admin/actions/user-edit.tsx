import { Card, Table, FormControl, Button, Form } from "solid-bootstrap";
import { JSX, useContext, Accessor, from, createSignal, onMount, For, Show } from "solid-js";
import { AllUsers, ChangeCredentials, ChangePrivilege, RegisteredUser } from "../../../interfaces/authentication.interfaces";
import { CategoryGetDTO } from "../../../interfaces/category.interfaces";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const [userSig, setUserSig] = createSignal<AllUsers>({ Success: false });

    const [editingEmail, setEditingEmail] = createSignal<string | null>(null);
    const [editedRole, setEditedRole] = createSignal<number | null>(null);

    const roleOptions = [
        { label: "Administrator", value: 0 },
        { label: "Librarian", value: 1 },
        { label: "Registered User", value: 2 },
        { label: "Unregistered User", value: 3 }
    ];

    //edit
    const startEdit = (user: RegisteredUser) => {
        setEditingEmail(user.Email);
        setEditedRole(user.Privilege);
    };    

    const cancelEdit = () => {
        setEditingEmail(null);
        setEditedRole(null);
    };

    const saveEdit = async (email: string) => {
        const updatedPrivilege = editedRole();
        if (updatedPrivilege === null) return;

        const change: ChangePrivilege = {
            RequesterEmail: user()!.Email,
            UserEmail: email,
            NewPrivilege: updatedPrivilege
        };

        try {
            await app.userService.changePrivilege(change);
            const updated = await app.userService.getAllUsers();
            setUserSig(updated || { Success: false });
            setEditingEmail(null);
        } catch (err) {
            console.error(err);
        }
    };


    //delete
    const deleteUser = async (email: string) => {
        try {
            await app.userService.deleteUser(email);
            const updatedUsers = await app.userService.getAllUsers();
            setUserSig(updatedUsers || { Success: false });
        } catch (error) {
            const fallback = await app.userService.getAllUsers();
            setUserSig(fallback || { Success: false });
        }
    };
    

    onMount((): void => {
        app.userService.getAllUsers().then((res) => {
            setUserSig(res || { Success: false });
        });
    });

    return (
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": '100%', "overflow-y": 'auto', padding: '2rem' }}
        >
            <Card class="shadow rounded" style={{ width: '80vw', "max-width": '90vw', padding: '1rem' }}>
                <h2 style={{ "font-size": '2rem', "margin-bottom": '1rem', "text-align": 'center' }}>Users</h2>

                <div class="table-responsive" style={{ width: '95%', margin: '0 auto' }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th style={{ width: '10rem' }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <For each={userSig().Data}>
                                {(user) => (
                                    <tr>
                                        <td>{user.Email}</td>
                                        <td>{user.FirstName || "-"}</td>
                                        <td>{user.LastName || "-"}</td>
                                        <td>{user.Phone || "-"}</td>
                                        <td>{user.Address || "-"}</td>
                                        <Show when={editingEmail() === user.Email} fallback={
                                            <>
                                                <td>{user.PrivilegeString}</td>
                                                <td>
                                                    <div class="d-flex justify-content-between gap-2">
                                                        <Button variant="danger" onClick={() => deleteUser(user.Email)} style={{ width: '5rem', "min-width": '5rem' }}>Delete</Button>
                                                        <Button variant="primary" onClick={() => startEdit(user)} style={{ width: '5rem', "min-width": '5rem' }}>Edit</Button>
                                                    </div>
                                                </td>
                                            </>
                                        }>
                                            <>
                                                <td>
                                                    <Form.Select
                                                        value={editedRole()?.toString()}
                                                        onChange={(e) => setEditedRole(parseInt(e.currentTarget.value))}
                                                    >
                                                        {roleOptions.map(option => (
                                                            <option value={option.value}>{option.label}</option>
                                                        ))}
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    <div class="d-flex justify-content-between gap-2">
                                                        <Button variant="success" onClick={() => saveEdit(user.Email)}>Save</Button>
                                                        <Button variant="danger" onClick={cancelEdit}>Cancel</Button>
                                                    </div>
                                                </td>
                                            </>
                                        </Show>

                                    </tr>
                                )}
                            </For>
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
