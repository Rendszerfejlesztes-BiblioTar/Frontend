import { JSX } from "solid-js";
import { Container, Nav, Navbar } from "solid-bootstrap";

export default (): JSX.Element => {

    return <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand>Bibliotár</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav class="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/books">Books</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    {/* TODO!!! make these show up only when logged in and user is Admin/Librarian */}
                    <Nav.Link href="/admin">Admin</Nav.Link>
                    <Nav.Link href="/librarian">Manage Library</Nav.Link>
                    <Nav.Link href="/profile">User Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}