import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";

import geolocation from "../middleware/geolocation";

import * as css from "./styles/Geolocate.m.css";

interface GeolcateProperties {
  hidden?: boolean;
}

const factory = create({ geolocation, icache }).properties<GeolcateProperties>();

const Geolocate = factory(function ({ middleware: { geolocation, icache }, properties }) {
  const { hidden } = properties();
  const isHidden = icache.getOrSet('isHidden', hidden);

  const { latitude, longitude } = geolocation();
  const content = isHidden ? [] : <label>Lat: {latitude.toFixed(3)} | Lon: {longitude.toFixed(3)}</label>;
  return (
    <div classes={[css.root]}>
      <span classes={[css.span]} onclick={() => {
        icache.set('isHidden', !isHidden);
      }}>
        <svg classes={[css.icon]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M15.5 0C10.806 0 7 1.817 7 6.543v16.901L15.5 32l8.5-8.556V6.543C24 1.817 20.194 0 15.5 0zm0 15.1a4.6 4.6 0 1 1 4.6-4.6 4.599 4.599 0 0 1-4.6 4.6z"/></svg>
      </span>
      {content}
    </div>
  );
});

export default Geolocate;
