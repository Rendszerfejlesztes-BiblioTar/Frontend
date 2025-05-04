import {
    Accessor,
    from,
    JSX,
    Show,
    useContext
} from "solid-js";
import { Container, Nav, Navbar } from "solid-bootstrap";

import { DIContextProvider } from "../../services/di-context-provider.service";
import { AppService } from "../../services/app.service";

import { RegisteredUser } from "../../interfaces/authentication.interfaces";

export default (): JSX.Element => {
    const app: AppService = useContext(DIContextProvider)!.resolve(AppService);

    const token: Accessor<string | undefined> = from(app.authentication.token$);
    const user: Accessor<RegisteredUser | undefined> = from(app.authentication.user$);

    return <Navbar  variant="dark" expand="lg" style={{ background: '#402208'}}>
        <Container>
            <Navbar.Brand>Bibliotár</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav class="me-auto">
                    {/* Base pages */}
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/books">Books</Nav.Link>

                    {/* Role specific pages */}
                    <Show when={user()!.Privilege < 2}>
                        <Nav.Link href="/librarian">Manage Library</Nav.Link>
                    </Show>
                    <Show when={user()!.Privilege === 0}>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                    </Show>

                    {/* User profile */}
                    <Show when={user() !== undefined}>
                        <Nav.Link href="/profile">User Profile</Nav.Link>
                    </Show>

                    {/* Authentication */}
                    <Show when={user()!.Privilege !== 3}>
                        <Nav.Link href="/" onClick={(): void => {
                            app.authentication.logout();
                        }}>Logout</Nav.Link>
                    </Show>
                    <Show when={token() === undefined || token() === ''}>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Show>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}