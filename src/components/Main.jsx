import SearchBar from "./SearchBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Main = () => {
  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col xs={12} lg={{ span: 6, offset: 3 }}>
            <SearchBar />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
