import { create, tsx } from "@dojo/framework/core/vdom";

import geolocation from "../middleware/geolocation";

const factory = create({ geolocation });

const Geolocate = factory(function ({ middleware: { geolocation } }) {
  const { latitude, longitude } = geolocation();
  return (
    <label>Lat: {latitude.toFixed(3)} | Lon: {longitude.toFixed(3)}</label>
  );
});

export default Geolocate;
