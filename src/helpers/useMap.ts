import { Loader } from '@googlemaps/js-api-loader';
import { colors } from '$constants/styles';
import coffeeImg from '$lib/images/coffee-filled.svg';

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

const useMap = async (options?: google.maps.MapOptions) => {
	const mapElement = document.getElementById('map');
	if (!mapElement) {
		return;
	}
	try {
		const { Map } = await loader.importLibrary('maps');
		const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
		const { Place } = await loader.importLibrary('places');

		// establish map
		const map = new Map(mapElement, options || mapOptions);
		const currentLocation = await getCurrentLocation();
		const infoWindow = new google.maps.InfoWindow();

		if (currentLocation) {
			map.setCenter(currentLocation);
		}

		// set current marker
		const setMarker = (
			data: (
				| google.maps.places.Place
				| { location: google.maps.LatLng | google.maps.LatLngLiteral; displayName?: string }
			)[],
			type?: 'cafe' | 'location'
		) => {
			if (!type) type = 'cafe';
			return data.map((item) => {
				const pin = document.createElement('img');
				pin.src = coffeeImg;
				pin.width = pin.height = 12;
				const pinSvg = new PinElement({
					glyph: pin,
					background: colors.primary.normal,
					borderColor: colors.white,
					scale: 0.8
				});

				const marker = new AdvancedMarkerElement({
					position: item.location,
					map,
					...(type === 'cafe' && { content: pinSvg.element })
				});

				marker.addListener('click', () => {
					infoWindow.setContent(item.displayName || 'You are here');
					infoWindow.open({
						anchor: marker,
						map
					});
				});

				return marker;
			});
		};

		const clearMarker = (markers: google.maps.marker.AdvancedMarkerElement[]) => {
			markers.forEach((marker) => {
				marker.map = null;
			});
		};

		const [currentMarker] = setMarker([{ location: currentLocation }], 'location');

		const searchNearby = async ({
			location,
			radius
		}: {
			location?: google.maps.LatLng;
			radius?: number;
		} = {}) => {
			const request: google.maps.places.SearchNearbyRequest = {
				fields: ['displayName', 'location', 'businessStatus'],
				locationRestriction: {
					center: location || currentLocation,
					radius: radius || 1000
				},
				includedPrimaryTypes: ['cafe']
			};

			const { places } = await Place.searchNearby(request);

			const markers = setMarker(places);

			return { places, markers };
		};

		const searchByKeyword = async (keyword: string) => {
			const request: google.maps.places.SearchByTextRequest = {
				textQuery: keyword,
				fields: ['displayName', 'location', 'businessStatus'],
				includedType: 'cafe',
				locationBias: {
					center: currentLocation,
					radius: 1000
				},
				isOpenNow: true
			};

			const { places } = await Place.searchByText(request);

			const markers = setMarker(places);

			return { places, markers };
		};

		return { map, currentMarker, searchNearby, searchByKeyword, setMarker, clearMarker };
	} catch (error) {
		console.log(error);
		return;
	}
};

export type Maps = Awaited<ReturnType<typeof useMap>>;

export default useMap;
