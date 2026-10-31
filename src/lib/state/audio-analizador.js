/** @type {AudioContext | null} */
let contexto = null;

/** @type {AnalyserNode | null} */
let analizador = null;

/** @type {MediaElementAudioSourceNode | null} */
let fuente = null;

/** @type {HTMLAudioElement | null} */
let elementoConectado = null;

const obtenerContexto = () => {
	if (!contexto) {
		try {
			contexto = new AudioContext();
		} catch {
			return null;
		}
	}

	if (contexto.state === 'suspended') {
		void contexto.resume().catch(() => {});
	}

	return contexto;
};

/**
 * Prepara el contexto de audio dentro de un gesto del usuario.
 * Así el navegador no bloquea la reproducción ni el analizador.
 */
export const PrepararContextoAudio = () => {
	obtenerContexto();
};

// Los navegadores requieren un gesto del usuario para habilitar el audio.
if (typeof window !== 'undefined') {
	window.addEventListener('pointerdown', PrepararContextoAudio, { capture: true, passive: true });
	window.addEventListener('keydown', PrepararContextoAudio, { capture: true });
}

/**
 * Conecta el elemento de audio a un analizador de frecuencias.
 * Solo puede existir una fuente por elemento, por eso se reutiliza la conexión.
 * @param {HTMLAudioElement | null} elemento
 */
export const ConectarAnalizador = (elemento) => {
	if (!elemento || elemento === elementoConectado) return;

	if (fuente) {
		try {
			fuente.disconnect();
		} catch {
			// La fuente anterior ya no está disponible.
		}
		void contexto?.close().catch(() => {});
		contexto = null;
		analizador = null;
	}

	// Reutiliza el contexto creado por el gesto del usuario si todavía no hay fuente.
	const nuevoContexto = obtenerContexto();
	if (!nuevoContexto) return;

	try {
		fuente = nuevoContexto.createMediaElementSource(elemento);
	} catch {
		void nuevoContexto.close().catch(() => {});
		contexto = null;
		fuente = null;
		return;
	}

	analizador = nuevoContexto.createAnalyser();
	analizador.fftSize = 512;
	analizador.smoothingTimeConstant = 0.82;
	analizador.minDecibels = -90;
	analizador.maxDecibels = -10;

	fuente.connect(analizador);
	analizador.connect(nuevoContexto.destination);
	elementoConectado = elemento;
};

/** @returns {AnalyserNode | null} */
export const ObtenerAnalizador = () => analizador;

export const ReanudarContextoAudio = () => {
	if (contexto?.state === 'suspended') {
		void contexto.resume().catch(() => {});
	}
};
