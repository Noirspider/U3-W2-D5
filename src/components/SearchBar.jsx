import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import ShowWeather from "./ShowWeather";
import CitiesDropdown from "./CitiesDropdown";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import ChooseUnits from "./ChooseUnits";

const apiKey = "ebeddfaa6bfb4ee28824132eb2198ba1";
const pexelKey = "ZgzIt7YzzezsHIOl2LN7lj2RdWTu5fuoM25n5ZLYNR3M0B7Bbcj1tV2N";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData5Days, setWeatherData5days] = useState([]);
  const [cityImage, setCityImage] = useState("");
  const [favouriteCities, setFavouriteCities] = useState(() => {
    const saved = localStorage.getItem("cities");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [alert, setAlert] = useState(false);
  const [isItFirstLog, setIsItFirstLog] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    getCoordinates(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoordinates({
          lat: latitude,
          lon: longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    setIsItFirstLog(false);
  }, []);

  useEffect(() => {
    getCityImage(selectedCity);
  }, [selectedCity]);

  const getCoordinates = (selectedCity) => {
    setSpinner(true);
    fetch(
      selectedCity
        ? `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&limit=1&appid=${apiKey}`
        : `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=${apiKey}`
    )
      .then((res) => {
        if (res.ok) {
          setAlert(false);

          setSpinner(false);
          return res.json();
        } else {
          if (!isItFirstLog) {
            setAlert(true);
          }
          setSpinner(false);
          throw new Error("Something went wrong!");
        }
      })
      .then((data) => {
        setCoordinates({
          lat: data[0].lat,
          lon: data[0].lon,
        });
      })
      .catch((err) => {
        console.log("An error occurred:", err);
      });
  };

  const [units, setUnits] = useState("metric");
  const changeUnits = (unit) => {
    setUnits(unit.toLowerCase());
  };
  useEffect(() => {
    getWeather();
    getWeather5Days();
  }, [units]);
  const getWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${
          coordinates.lon
        }&appid=${apiKey}&units=${units ? units : "metric"}`
      );
      if (!res.ok) {
        setSpinner(false);

        throw new Error("Something went wrong!");
      }
      setAlert(false);
      setSpinner(false);

      const data = await res.json();
      console.log("Data:", data);
      setWeatherData(data);
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };

  const getWeather5Days = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${
          coordinates.lon
        }&appid=${apiKey}&units=${units ? units : "metric"}`
      );
      if (!res.ok) {
        setSpinner(false);

        throw new Error("Something went wrong!");
      }
      const data5days = await res.json();
      setAlert(false);
      setSpinner(false);

      setWeatherData5days(data5days.list);
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };

  const getCityImage = (city) => {
    fetch(`https://api.pexels.com/v1/search?query=${city}`, {
      method: "GET",
      headers: {
        Authorization: pexelKey,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("ERROR");
        }
      })

      .then((data) => {
        console.log(data.photos[0].src.landscape);
        setCityImage(data.photos[0].src.landscape);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [pollutionData, setPollutionData] = useState(null);
  const getPollutionData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
      );
      if (!res.ok) {
        setSpinner(false);

        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      setAlert(false);
      setSpinner(false);
      console.log(data.list[0], "pollution data");
      setPollutionData(data.list[0]);
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };
  useEffect(() => {
    getWeather();
    getWeather5Days();
    getPollutionData();
  }, [coordinates]);

  return (
    <div>
      {alert && (
        <Alert variant="danger" className="text-center">
          Qualcosa è andato storto. Piangi, correggi, ricomincia.
        </Alert>
      )}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          getCoordinates();
          getCityImage(searchValue);
          setInputValue("");
        }}
      >
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label className="d-flex justify-content-center">
            <h4>Cerca la tua città</h4>
          </Form.Label>

          {/* Utilizzo di Flexbox per allineare gli elementi */}
          <div className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="es. Timbuktu"
              min={1}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSearchValue(e.target.value);
              }}
              style={{ flexGrow: 1 }} // Stile aggiuntivo per la barra di ricerca
            />
            <Button
              className="bg-info mr-5" // Aggiunta di un margine a sinistra
              onClick={(e) => {
                e.preventDefault();
                getCoordinates();
                setInputValue("");
              }}
            >
              Cerca
            </Button>
          </div>
        </Form.Group>
      </Form>

      <CitiesDropdown handleCitySelect={handleCitySelect} favouriteCities={favouriteCities} />
      <ChooseUnits changeUnits={changeUnits} />
      {spinner && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>{" "}
        </div>
      )}
      {!spinner && (
        <ShowWeather
          weatherData={weatherData}
          weatherData5Days={weatherData5Days}
          pollutionData={pollutionData}
          cityImage={cityImage}
          units={units}
        />
      )}
    </div>
  );
};
export default SearchBar;
