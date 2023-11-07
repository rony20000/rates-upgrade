import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Exchange Rate App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Rate List</Nav.Link>
            <Nav.Link href="/ConvertCurrency">Convert Currency</Nav.Link>
            <Nav.Link href="/RatesHistory">Rates History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
