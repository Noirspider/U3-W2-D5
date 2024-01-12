import { useState } from "react";
import { Form } from "react-bootstrap";

const ChooseUnits = ({ changeUnits }) => {
  const [unit, setUnit] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.value;
    setUnit(selectedUnit);
    changeUnits(selectedUnit);
  };

  return (
    <div>
      <h5 className="text-center">Unità</h5>
      <Form.Select onChange={handleUnitsChange} aria-label="Default select example">
        <option>Metrico</option>
        <option>Imperiale</option>
      </Form.Select>
    </div>
  );
};

export default ChooseUnits;
