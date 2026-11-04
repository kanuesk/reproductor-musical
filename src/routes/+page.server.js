import axios from 'axios';

export const load = async () => {
	try {
		const respuestaCanciones = await axios.get('https://leonardoapi.vercel.app/api/tracks', {
			timeout: 10000
		});

		return {
			tracks: respuestaCanciones.data.tracks ?? []
		};
	} catch (error) {
		console.error('No se pudieron cargar las canciones:', error);
		return {
			tracks: []
		};
	}
};
