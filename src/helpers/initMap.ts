import { Loader } from '@googlemaps/js-api-loader';

export type Maps = {
	map: google.maps.Map;
	marker: google.maps.marker.AdvancedMarkerElement;
	searchNearby: ({
		location,
		radius
	}?: {
		location?: google.maps.LatLng;
		radius?: number;
	}) => google.maps.places.PlaceResult[];
	searchByKeyword: (keyword: string) => google.maps.places.PlaceResult[];
};

const loader = new Loader({
	apiKey: import.meta.env.VITE_GCP_MAP_KEY,
	version: 'weekly',
	libraries: ['places']
});

const mapOptions: google.maps.MapOptions = {
	center: {
		lat: 0,
		lng: 0
	},
	zoom: 15,
	mapId: import.meta.env.VITE_GCP_MAP_ID,
	disableDefaultUI: true
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

const useMap = async (options?: google.maps.MapOptions): Promise<Maps | undefined> => {
	const mapElement = document.getElementById('map');
	if (!mapElement) {
		return;
	}
	try {
		const { Map } = await loader.importLibrary('maps');
		const { AdvancedMarkerElement } = await loader.importLibrary('marker');
		const { PlacesService } = await loader.importLibrary('places');

		// establish map
		const map = new Map(mapElement, options || mapOptions);
		const currentLocation = await getCurrentLocation();

		if (currentLocation) {
			map.setCenter(currentLocation);
		}

		// set current marker
		const marker = new AdvancedMarkerElement({
			position: currentLocation,
			map
		});

		// set places service
		const placesService = new PlacesService(map);
		const searchNearby = ({
			location,
			radius
		}: {
			location?: google.maps.LatLng;
			radius?: number;
		} = {}) => {
			let places: google.maps.places.PlaceResult[] = [];
			placesService.nearbySearch(
				{
					location: location || currentLocation,
					radius: radius || 500,
					keyword: 'coffee'
				},
				(result, status) => {
					if (status === 'OK') {
						places = result || [];
						result?.forEach((place) => {
							new AdvancedMarkerElement({
								position: place.geometry?.location,
								map,
								title: place.name
							});
						});
					}
				}
			);
			return places;
		};

		const searchByKeyword = (keyword: string) => {
			let places: google.maps.places.PlaceResult[] = [];
			placesService.textSearch(
				{
					query: keyword,
					location: currentLocation,
					radius: 500
				},
				(result, status) => {
					if (status === 'OK') {
						places = result || [];
						result?.forEach((place) => {
							new AdvancedMarkerElement({
								position: place.geometry?.location,
								map,
								title: place.name
							});
						});
					}
				}
			);
			return places;
		};

		return { map, marker, searchNearby, searchByKeyword };
	} catch (error) {
		console.log(error);
		return;
	}
};

export default useMap;
