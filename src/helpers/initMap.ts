import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: import.meta.env.VITE_GCP_MAP_KEY,
	version: 'weekly',
	libraries: ['places'],
});

const mapOptions: google.maps.MapOptions = {
	center: {
		lat: 0,
		lng: 0
	},
	zoom: 17,
	mapId: import.meta.env.VITE_GCP_MAP_ID,
	disableDefaultUI: true,
};

const getCurrentLocation = async () => {
	// 用 promise 方便傳出位置資訊，不用 callback
	const position = await new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
	return {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};
};

const initMap = async (options?: google.maps.MapOptions) => {
	const mapElement = document.getElementById('map');
	if (!mapElement) {
		return;
	}
	try {
		const { Map } = await loader.importLibrary('maps');
		const { AdvancedMarkerElement } = await loader.importLibrary('marker');
		const map = new Map(mapElement, options || mapOptions);
		const currentLocation = await getCurrentLocation();

		if (currentLocation) {
			map.setCenter(currentLocation);
		}

		const marker = new AdvancedMarkerElement({
			position: currentLocation,
			map
		});

		return { map, marker };
	} catch (error) {
		console.log(error);
	}
};

export default initMap;
