import { JSX, useContext, Accessor, from, onMount, createSignal, Show } from "solid-js";
import { Contact, RegisteredUser } from "../../../interfaces/authentication.interfaces";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";
import { Button, Card, FormControl } from "solid-bootstrap";
export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    const [isEditing, setIsEditing] = createSignal(false);
    const [editedProfile, setEditedProfile] = createSignal<Contact>({
        FirstName: "",
        LastName: "",
        Phone: "",
        Address: "",
        Email: user()?.Email || "",
    });

    const startEdit = () => {
        const u = user();
        if (u) {
            setEditedProfile({
                FirstName: u.FirstName!,
                LastName: u.LastName!,
                Phone: u.Phone!,
                Address: u.Address!,
                Email: u.Email,
            });
            setIsEditing(true);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const saveEdit = async () => {
        const profile = editedProfile();
        try {
            const res = await app.userService.changeContact(profile);
            app.authentication.refreshAuth();
            setIsEditing(false);
        } catch (error) {}
    };

    return (
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": "100%", "overflow-y": "auto", padding: "2rem" }}
        >
            <Card class="shadow rounded" style={{ width: "80vw", "max-width": "90vw", padding: "1rem" }}>
                <h2 style={{ "font-size": "2rem", "margin-bottom": "1rem", "text-align": "center" }}>
                    Profile Credentials
                </h2>

                <Card.Body class="d-flex flex-column">
                    <div class="mb-3" style={{ "font-size": "1.5rem" }}>
                        <b>Email:</b> {user()?.Email}
                    </div>
                    <hr class="my-2" />
                    {!isEditing() ? (
                        <>
                            <div class="mb-2" style={{ "font-size": "1.5rem" }}>Firstname: <b>{user()?.FirstName}</b></div>
                            <div class="mb-2" style={{ "font-size": "1.5rem" }}>Lastname: <b>{user()?.LastName}</b></div>
                            <div class="mb-2" style={{ "font-size": "1.5rem" }}>Phone: <b>{user()?.Phone}</b></div>
                            <div class="mb-2" style={{ "font-size": "1.5rem" }}>Address: <b>{user()?.Address}</b></div>
                            <Button
                                variant="info"
                                style={{ background: "#402208", color: "white", "border-color": "#402208" }}
                                onClick={startEdit}
                            >
                                Modify credentials
                            </Button>
                        </>
                    ) : (
                        <>
                            <div class="mb-2">
                                <b><label style={{ "font-size": "1.5rem" }}>Firstname</label></b>
                                <FormControl
                                    value={editedProfile().FirstName}
                                    style={{ "font-size": "1.5rem" }}
                                    onInput={(e) => setEditedProfile({ ...editedProfile(), FirstName: e.currentTarget.value })}
                                />
                            </div>
                            <div class="mb-2">
                                <b><label style={{ "font-size": "1.5rem" }}>Lastname</label></b>
                                <FormControl
                                    value={editedProfile().LastName}
                                    style={{ "font-size": "1.5rem" }}
                                    onInput={(e) => setEditedProfile({ ...editedProfile(), LastName: e.currentTarget.value })}
                                />
                            </div>
                            <div class="mb-2">
                                <b><label style={{ "font-size": "1.5rem" }}>Phone</label></b>
                                <FormControl
                                    value={editedProfile().Phone}
                                    style={{ "font-size": "1.5rem" }}
                                    onInput={(e) => setEditedProfile({ ...editedProfile(), Phone: e.currentTarget.value })}
                                />
                            </div>
                            <div class="mb-2">
                                <b><label style={{ "font-size": "1.5rem" }}>Address</label></b>
                                <FormControl
                                    value={editedProfile().Address}
                                    style={{ "font-size": "1.5rem" }}
                                    onInput={(e) => setEditedProfile({ ...editedProfile(), Address: e.currentTarget.value })}
                                />
                            </div>

                            <div class="d-flex justify-content-end gap-2">
                                <Button variant="success" onClick={saveEdit}>Save</Button>
                                <Button variant="danger" onClick={cancelEdit}>Cancel</Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};