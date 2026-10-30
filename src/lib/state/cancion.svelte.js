/**
 * @typedef {object} Cancion
 * @property {string} [id]
 * @property {string} [title]
 * @property {string | null} [audio]
 * @property {{ name?: string, image?: string }} [artist]
 * @property {{ title?: string, image?: string } | null} [album]
 */

/**
 * @typedef {object} EstadoReproductor
 * @property {Cancion | null} actual
 * @property {boolean} reproduciendo
 * @property {number} progreso
 * @property {number} duracion
 * @property {number} volumen
 * @property {boolean} silenciado
 * @property {boolean} favorito
 * @property {boolean} aleatorio
 * @property {boolean} repetir
 */

/** @type {EstadoReproductor} */
export const CancionEstado = $state({
	actual: null,
	reproduciendo: false,
	progreso: 0,
	duracion: 0,
	volumen: 70,
	silenciado: false,
	favorito: false,
	aleatorio: false,
	repetir: false
});

/** @param {Cancion | null} nuevaCancion */
export const ActualizarCancionActual = (nuevaCancion) => {
	if (!nuevaCancion) return;

	if (CancionEstado.actual?.id === nuevaCancion.id) {
		AlternarReproduccion();
		return;
	}

	CancionEstado.actual = nuevaCancion;
	CancionEstado.progreso = 0;
	CancionEstado.duracion = 0;
	CancionEstado.favorito = false;
	CancionEstado.reproduciendo = true;
};

export const AlternarReproduccion = () => {
	if (!CancionEstado.actual) return;
	CancionEstado.reproduciendo = !CancionEstado.reproduciendo;
};

/** @param {number} porcentaje */
export const EstablecerProgreso = (porcentaje) => {
	CancionEstado.progreso = Math.min(100, Math.max(0, porcentaje));
};

/** @param {number} segundos */
export const EstablecerDuracion = (segundos) => {
	CancionEstado.duracion = Number.isFinite(segundos) && segundos > 0 ? segundos : 0;
};

/** @param {number} porcentaje */
export const EstablecerVolumen = (porcentaje) => {
	CancionEstado.volumen = Math.min(100, Math.max(0, porcentaje));
	if (CancionEstado.volumen > 0) CancionEstado.silenciado = false;
};

export const AlternarSilencio = () => {
	CancionEstado.silenciado = !CancionEstado.silenciado;
};

export const AlternarFavorito = () => {
	CancionEstado.favorito = !CancionEstado.favorito;
};

export const AlternarAleatorio = () => {
	CancionEstado.aleatorio = !CancionEstado.aleatorio;
};

export const AlternarRepetir = () => {
	CancionEstado.repetir = !CancionEstado.repetir;
};
