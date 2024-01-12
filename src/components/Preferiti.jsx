import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import FavCities from "./FavCities";

const Preferiti = () => {
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("cities");
    const initialValue = JSON.parse(savedCities);
    return initialValue || [];
  });

  const removeCity = (index) => {
    const updatedCities = [...cities];
    updatedCities.splice(index, 1);

    localStorage.setItem("cities", JSON.stringify(updatedCities));

    setCities(updatedCities);
  };

  const handleForm = () => {
    setCities([...cities, cityInput]);
    setCityInput("");
  };

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  return (
    <Container id="Preferiti" className="mt-5">
      <Row>
        <Col lg={{ span: 8, offset: 2 }}>
          <Card className="shadow-effect">
            <Card.Body>
              <Form
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleForm();
                  }
                }}
              >
                <Form.Group className="mb-3 " controlId="favourite-cities">
                  <Form.Label className="fw-bold">Aggiungi ai preferiti</Form.Label>
                  <Form.Control
                    type="text"
                    value={cityInput}
                    onChange={(e) => {
                      setCityInput(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-center ">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleForm();
                  }}
                  className="w-50"
                  variant="success"
                >
                  Save
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {cities && (
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <FavCities cities={cities} removeCity={removeCity} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Preferiti;
