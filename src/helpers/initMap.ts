import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: import.meta.env.VITE_GCP_MAP_KEY,
	version: 'weekly',
	libraries: ['places']
});

const mapOptions = {
	center: {
		lat: 0,
		lng: 0
	},
	zoom: 4
};

const initMap = async () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        return;
    }
	try {
		const { Map } = await loader.importLibrary('maps');
		const map = new Map(mapElement, mapOptions);
		return map;
	} catch (error) {
		console.log(error);
	}
};

export default initMap;
