
import {Navbar,Nav,Container,NavDropdown,Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useNavigate } from 'react-router-dom';
function Header() {
  const history=useNavigate();
  const user=JSON.parse(localStorage.getItem('user-info'));
function logout(){
  localStorage.clear();
  history('/add');
}
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Ecommerce Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 navbar_wrapper"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/">Home</Link>
            {
              
             localStorage.getItem('user-info') ?
              <>
              <Link to="/add">Register</Link>
              <Link to="/update">Update</Link>
              <Link to="/logout"></Link>
              </>
            :
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              </>
            }
            
          </Nav>

          <Nav style={{ marginRight: '12px' }} >
          {localStorage.getItem('user-info')?
            <Nav className='col-sm-12 offset-sm-12'>
                <NavDropdown title={user.name}>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            :null
          }
          </Nav>
          
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          
          
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Header;