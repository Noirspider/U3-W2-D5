import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CitiesDropdown = ({ favouriteCities, handleCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    handleCitySelect(city);
  };

  return (
    <div className="mb-3 ">
      <h4 className="text-center mt-3">Le tue città preferite</h4>
      <Form.Select aria-label="Default select example" onChange={handleCityChange}>
        <option>-</option>
        {favouriteCities.map((city, i) => (
          <option key={i}>{city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}</option>
        ))}
      </Form.Select>
    </div>
  );
};

export default CitiesDropdown;
