import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import {
  ArrowsCollapse,
  CloudsFill,
  DropletFill,
  EyeFill,
  SunriseFill,
  SunsetFill,
  ThermometerHalf,
  Wind,
} from "react-bootstrap-icons";

const MoreInfo = ({ weatherData, units }) => {
  const formatTime = (num) => (num < 10 ? "0" + num : num);
  const timestamp = weatherData.sys.sunrise * 1000;
  const timestamp2 = weatherData.sys.sunset * 1000;
  const date = new Date(timestamp);
  const date2 = new Date(timestamp2);

  const hours = formatTime(date.getHours());
  const hours2 = formatTime(date2.getHours());
  const minutes = formatTime(date.getMinutes());
  const minutes2 = formatTime(date2.getMinutes());

  return (
    <Container fluid className="mt-2 rounded-2">
      <Row>
        <Col xs={12}>
          <div className="mt-4">
            <h3 className="text-center">Weather today</h3>
          </div>
        </Col>

        <Col xs={12} md={6} className="my-3 py-1">
          <ListGroup className="shadow-effect">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <DropletFill className="mb-1" /> Humidity:
              </span>{" "}
              <span>{weatherData.main.humidity} %</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <ArrowsCollapse className="mb-1" /> Pressure:
              </span>{" "}
              <span>{weatherData.main.pressure} hPa</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <EyeFill className="mb-1 me-1 " />
                Visibility:
              </span>{" "}
              <span>{weatherData.visibility / 1000} km</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <SunriseFill className="mb-1 me-1 " />
                Sunrise:
              </span>{" "}
              <span>
                {hours}:{minutes}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={12} md={6} className="my-3 py-1">
          <ListGroup className="shadow-effect">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <CloudsFill className="mb-1 me-1" />
                Cloudiness:
              </span>{" "}
              <span>{weatherData.clouds.all} %</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <Wind className="mb-1 me-1" />
                Wind:
              </span>{" "}
              <span>
                {weatherData.wind.speed} {units === "metric" ? "m/s" : "MPH"}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <ThermometerHalf className="mb-1 me-1" />
                Feels like:
              </span>{" "}
              <span>
                {" "}
                {weatherData.main.feels_like} {units === "metric" ? "C" : "F"}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <span>
                <SunsetFill className="mb-1 me-1" />
                Sunset:
              </span>
              <span>
                {hours2}:{minutes2}
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MoreInfo;
