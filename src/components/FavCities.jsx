import { ListGroup, Button } from "react-bootstrap";

const FavCities = ({ cities, removeCity }) => (
  <div className="">
    <ListGroup className="mt-4 ">
      <h4 className="text-center ">Preferiti</h4>
      {cities.map((city, i) => (
        <ListGroup.Item
          key={i}
          className="d-flex justify-content-between align-items-center rounded mb-2 shadow-effect "
        >
          <div>{city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}</div>
          <div>
            <Button className="btn-sm btn-danger" onClick={() => removeCity(i)}>
              X
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default FavCities;
