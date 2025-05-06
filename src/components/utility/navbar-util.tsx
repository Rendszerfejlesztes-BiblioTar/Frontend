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

    return (
        <Navbar variant="dark" expand="lg" style={{ background: '#402208' }}>
            <Container fluid>
                <Navbar.Brand class="me-auto">Bibliotár</Navbar.Brand>
                <div class="vr mx-3"></div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav class="me-auto">
                        {/* Normal paths */}
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/books">Books</Nav.Link>
    
                        {/* Authenticated paths */}
                        <Show when={user()!.Privilege < 2}>
                            <Nav.Link href="/librarian">Manage Library</Nav.Link>
                        </Show>
                        <Show when={user()!.Privilege === 0}>
                            <Nav.Link href="/admin">Admin</Nav.Link>
                        </Show>
                        <Show when={user()!.Privilege === 3}>
                            <Nav.Link href="/profile">User Profile</Nav.Link>
                        </Show>
                    </Nav>
                    
                    {/* Login/Logout */}
                    <Nav class="ms-auto">
                        <Show when={user()!.Privilege !== 3}>
                            <Navbar.Text>Signed in as: {user()!.Email} ({user()!.PrivilegeString})</Navbar.Text>
                            <div class="vr mx-3"></div>
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
    );    
}