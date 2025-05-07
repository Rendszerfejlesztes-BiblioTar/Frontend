import { Button, Card, FormControl } from "solid-bootstrap";
import { JSX, useContext, Accessor, from, createSignal, Show } from "solid-js";
import { RegisteredUser, Contact } from "../../../interfaces/authentication.interfaces";
import { AppService } from "../../../services/app.service";
import { DIContextProvider } from "../../../services/di-context-provider.service";
import SuccessAlert from "../../utility/success-alert-util";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const [password, setPassword] = createSignal('');
    const [password2, setPassword2] = createSignal('');
    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal(false);

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        if (password() != password2()) {
            setError("Passwords don't match!");
            return;
        }

        if (password().length < 8) {
            setError("Password must be at least 8 characters!");
            return;
        }

        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        setError("");

        app.userService.changePassword({ NewPassword: password() });

    };

    return (
        <div
            class="d-flex justify-content-center"
            style={{ "max-height": "100%", "overflow-y": "auto", padding: "2rem" }}
        >
            <Card class="shadow rounded" style={{ width: "80vw", "max-width": "90vw", padding: "1rem" }}>
                <Card.Title
                    style={{
                        'animation': 'fadeInDown 0.5s ease-out',
                        "font-size": "2.5rem",
                        "margin-bottom": "1.5rem",
                        "text-align": "center",
                        "font-weight": "bold",
                        "border-bottom": "2px solid #ccc",
                        "padding-bottom": "0.5rem",
                    }}
                >
                    Change password
                </Card.Title>
                {error() && <div class="alert alert-danger">{error()}</div>}
                <Show when={success()}>
                    <SuccessAlert trigger={success()} />
                </Show>
                <Card.Body class="d-flex flex-column">
                    <form onSubmit={handleSubmit} style={{'animation': 'fadeInDown 0.5s ease-out',}}>
                        <div class="mb-2">
                            <b><label style={{ "font-size": "1.5rem" }}>Password</label></b>
                            <FormControl
                                type="password"
                                value={password()}
                                onInput={(event) => setPassword(event.currentTarget.value)}
                                style={{ "font-size": "1.5rem" }}
                            />
                        </div>

                        <div class="mb-2">
                            <b><label style={{ "font-size": "1.5rem" }}>Password again</label></b>
                            <FormControl
                                type="password"
                                value={password2()}
                                onInput={(event) => setPassword2(event.currentTarget.value)}
                                style={{ "font-size": "1.5rem" }}
                            />
                        </div>
                        <Button type="submit" variant="success">Change password</Button>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};