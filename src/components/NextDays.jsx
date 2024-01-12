import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";

const NextDays = ({ weatherData5Days, units }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedToday = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(
      2,
      "0"
    )}`;

    const newDates = [formattedToday];

    for (let i = 1; i <= 4; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const formattedDate = `${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(
        2,
        "0"
      )}`;
      newDates.push(formattedDate);
    }

    setDates(newDates);
  }, []);

  const chooseDay = (day) => {
    setSelectedDate(day);
  };

  return (
    <Row className="mt-4">
      <h3 className="text-center mb-4">Prossimi 5 giorni</h3>
      <ButtonGroup aria-label="Basic example">
        {dates.map((date) => (
          <Button
            key={date}
            variant="secondary"
            className="bg-success my-2"
            onClick={() => {
              chooseDay(date);
            }}
          >
            {date}
          </Button>
        ))}
      </ButtonGroup>
      <Col id="forecast-display" className="shadow-effect mx-2">
        {!selectedDate && (
          <ListGroup>
            {weatherData5Days.map((day) => (
              <ListGroup.Item className="border-0" key={day.dt}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center ">
                    <div className="d-flex gap-3">
                      <p>{day.dt_txt.split(" ")[0].slice(5)}</p>
                      <p>{day.dt_txt.split(" ")[1].slice(0, 5)}</p>
                      <p>{day.weather[0].main}</p>
                    </div>
                    <div>
                      <img
                        className="mb-2"
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt="icon-weather"
                        width="50%"
                      />
                    </div>
                  </div>{" "}
                  <div>
                    {day.main.temp} {units === "metric" ? "C" : "F"}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {selectedDate && (
          <ListGroup>
            {weatherData5Days.map((day) => {
              if (day.dt_txt.split(" ")[0].slice(5) === selectedDate) {
                return (
                  <ListGroup.Item className="border-0" key={day.dt}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center ">
                        <div className="d-flex gap-3">
                          <p>{day.dt_txt.split(" ")[0].slice(5)}</p>
                          <p>{day.dt_txt.split(" ")[1].slice(0, 5)}</p>
                          <p>{day.weather[0].main}</p>
                        </div>
                        <div>
                          <img
                            className="mb-2"
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt="icon-weather"
                            width="50%"
                          />
                        </div>
                      </div>{" "}
                      <div>
                        {day.main.temp} {units === "metric" ? "C" : "F"}
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              }
            })}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default NextDays;
