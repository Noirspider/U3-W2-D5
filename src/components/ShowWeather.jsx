import MainInfo from "./MainInfo";
import MoreInfo from "./MoreInfo";
import NextDays from "./NextDays";

const ShowWeather = ({ weatherData, weatherData5Days, cityImage, units, pollutionData }) => {
  return (
    <div>
      <div>
        <div className="mt-3">
          {weatherData && (
            <MainInfo weatherData={weatherData} pollutionData={pollutionData} cityImage={cityImage} units={units} />
          )}
          {weatherData && <MoreInfo weatherData={weatherData} units={units} />}
          {weatherData5Days && weatherData && <NextDays weatherData5Days={weatherData5Days} units={units} />}
        </div>
      </div>
    </div>
  );
};

export default ShowWeather;
