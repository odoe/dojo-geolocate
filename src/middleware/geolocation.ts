import { create } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";

const factory = create({ icache });

type Coords = Pick<Coordinates, "latitude" | "longitude">;

// utility to get current geolocation
const getGeolocation = async (): Promise<Coords> => {
  return new Promise(resolve => {
    if (!("geolocation" in navigator)) {
      resolve({ latitude: 0, longitude: 0 });
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        resolve({ latitude, longitude });
      });
    }
  });
};

// default coordinates
const defaultCoordinates = { latitude: 0, longitude: 0 };

export const geolocation = factory(({ middleware: { icache } }) => {
  return (): Coords => {
    // get current value or default
    const coords = icache.getOrSet("coords", defaultCoordinates);
    if (coords.latitude === 0 && coords.longitude === 0) {
      // only get location if it is not the default
      getGeolocation().then(results => {
        if (
          coords.latitude !== results.latitude &&
          coords.longitude !== results.longitude
        ) {
          // only update cache if different from current value
          // this will invalidate the widget
          icache.set("coords", results);
        }
      });
    }
    return coords;
  };
});

export default geolocation;
