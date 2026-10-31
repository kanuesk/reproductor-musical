<script lang="ts">
	import {
		CancionEstado,
		AlternarReproduccion,
		AlternarFavorito,
		AlternarAleatorio,
		AlternarRepetir,
		AlternarSilencio,
		EstablecerProgreso,
		EstablecerVolumen,
		EstablecerDuracion,
		BuscarProgreso,
		RegistrarElementoAudio
	} from '$lib/state/cancion.svelte.js';
	import { ConectarAnalizador, ReanudarContextoAudio } from '$lib/state/audio-analizador.js';

	let { mostrar = true }: { mostrar?: boolean } = $props();

	let audio = $state<HTMLAudioElement | undefined>();

	const pista = $derived(CancionEstado.actual);
	const titulo = $derived(pista?.title ?? 'Sin reproducción');
	const artista = $derived(pista?.artist?.name ?? 'Selecciona una pista');
	const portada = $derived(pista?.album?.image ?? pista?.artist?.image ?? '');

	const progreso = $derived(CancionEstado.progreso);
	const duracion = $derived(CancionEstado.duracion);
	const tiempoActual = $derived((progreso / 100) * duracion);

	const volumen = $derived(CancionEstado.silenciado ? 0 : CancionEstado.volumen);
	const iconoVolumen = $derived(
		CancionEstado.silenciado || CancionEstado.volumen === 0
			? 'volume_off'
			: CancionEstado.volumen < 50
				? 'volume_down'
				: 'volume_up'
	);

	function formatearTiempo(segundos: number) {
		if (!Number.isFinite(segundos) || segundos <= 0) return '00:00';
		const minutos = Math.floor(segundos / 60);
		const resto = Math.floor(segundos % 60);
		return `${minutos.toString().padStart(2, '0')}:${resto.toString().padStart(2, '0')}`;
	}

	function alternarReproduccion() {
		if (!pista) return;
		AlternarReproduccion();
	}

	function actualizarProgreso(event: Event) {
		const valor = Number((event.currentTarget as HTMLInputElement).value);
		BuscarProgreso(valor);
	}

	function actualizarVolumen(event: Event) {
		EstablecerVolumen(Number((event.currentTarget as HTMLInputElement).value));
	}

	function alCargarMetadatos() {
		if (!audio) return;
		EstablecerDuracion(audio.duration);
	}

	function alActualizarTiempo() {
		if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
		EstablecerProgreso((audio.currentTime / audio.duration) * 100);
	}

	function alTerminar() {
		if (CancionEstado.repetir && audio) {
			audio.currentTime = 0;
			void audio.play().catch(() => {
				CancionEstado.reproduciendo = false;
			});
			return;
		}

		EstablecerProgreso(0);
		CancionEstado.reproduciendo = false;
	}

	// Mantiene el elemento <audio> sincronizado con el estado global.
	$effect(() => {
		const pistaActual = pista;
		const reproduciendo = CancionEstado.reproduciendo;

		if (!audio || !pistaActual?.audio) return;

		ConectarAnalizador(audio);

		if (reproduciendo) {
			ReanudarContextoAudio();
			void audio.play().catch(() => {
				CancionEstado.reproduciendo = false;
			});
		} else {
			audio.pause();
		}
	});

	// Registra el <audio> global para que otras vistas puedan controlar la reproducción.
	$effect(() => {
		RegistrarElementoAudio(audio ?? null);
		ConectarAnalizador(audio ?? null);

		return () => {
			RegistrarElementoAudio(null);
		};
	});

	// Sincroniza el volumen (también el silencio) con el estado global.
	$effect(() => {
		if (!audio) return;
		audio.volume = volumen / 100;
	});
</script>

{#if pista?.audio}
	<audio
		bind:this={audio}
		crossorigin="anonymous"
		src={pista.audio}
		preload="metadata"
		onloadedmetadata={alCargarMetadatos}
		ontimeupdate={alActualizarTiempo}
		onended={alTerminar}
	></audio>
{/if}

<!-- El <audio> permanece montado aunque la barra esté oculta, para no cortar la reproducción. -->
{#if mostrar && pista}
<footer class="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest border-t border-surface-container-high">
	<div class="flex h-16 lg:h-24 items-center justify-between gap-2 px-3 lg:px-space-md">
		<!-- INFO DE LA PISTA -->
		<div class="flex flex-1 lg:flex-none items-center gap-3 lg:gap-space-md min-w-0 lg:w-1/4 lg:min-w-[240px]">
			<div class="w-11 h-11 lg:w-14 lg:h-14 shrink-0 overflow-hidden bg-surface-container flex items-center justify-center">
				{#if portada}
					<img class="w-full h-full object-cover" src={portada} alt={`Portada de ${titulo}`} loading="lazy" />
				{:else}
					<span class="material-symbols-outlined text-[22px] lg:text-[24px] text-on-surface-variant">music_note</span>
				{/if}
			</div>
			<a
				href="/Reproductor"
				class="group/titulo block min-w-0 overflow-hidden"
				title="Abrir la vista del reproductor"
			>
				<div class="font-headline-sm text-sm lg:text-base text-primary truncate transition-colors group-hover/titulo:text-primary-container">
					{titulo}
				</div>
				<div class="font-label-md text-xs lg:text-sm text-on-surface-variant truncate transition-colors group-hover/titulo:text-on-surface">
					{artista}
				</div>
			</a>
			<div class="hidden sm:flex items-center gap-1">
				<button
					class="p-1 transition-colors cursor-pointer hover:text-primary-container {CancionEstado.favorito
						? 'text-primary-container'
						: 'text-on-surface-variant'}"
					aria-label="Marcar como favorita"
					aria-pressed={CancionEstado.favorito}
					onclick={AlternarFavorito}
					type="button"
				>
					<span
						class="material-symbols-outlined text-[20px]"
						style={CancionEstado.favorito ? "font-variation-settings: 'FILL' 1;" : ''}>favorite</span
					>
				</button>
			</div>
		</div>

		<!-- CONTROLES MÓVILES -->
		<div class="flex lg:hidden items-center gap-1 shrink-0">
			<button
				class="w-10 h-10 bg-primary-container text-on-primary flex items-center justify-center transition-colors hover:bg-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
				aria-label={CancionEstado.reproduciendo ? 'Pausar' : 'Reproducir'}
				onclick={alternarReproduccion}
				disabled={!pista}
				type="button"
			>
				<span class="material-symbols-outlined text-[24px]">{CancionEstado.reproduciendo ? 'pause' : 'play_arrow'}</span>
			</button>
			<button
				class="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
				aria-label="Pista siguiente"
				type="button"
			>
				<span class="material-symbols-outlined text-[24px]">skip_next</span>
			</button>
		</div>

		<!-- CONTROLES ESCRITORIO -->
		<div class="hidden lg:flex flex-col items-center justify-center flex-1 max-w-2xl px-space-md">
			<div class="flex items-center gap-space-md mb-2">
				<button
					class="transition-colors cursor-pointer hover:text-on-surface {CancionEstado.aleatorio
						? 'text-primary-container'
						: 'text-on-surface-variant'}"
					aria-label="Modo aleatorio"
					aria-pressed={CancionEstado.aleatorio}
					onclick={AlternarAleatorio}
					type="button"
				>
					<span class="material-symbols-outlined text-[18px]">shuffle</span>
				</button>
				<button
					class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
					aria-label="Pista anterior"
					type="button"
				>
					<span class="material-symbols-outlined text-[22px]">skip_previous</span>
				</button>
				<button
					class="w-9 h-9 bg-primary-container text-on-primary flex items-center justify-center transition-colors hover:bg-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
					aria-label={CancionEstado.reproduciendo ? 'Pausar' : 'Reproducir'}
					onclick={alternarReproduccion}
					disabled={!pista}
					type="button"
				>
					<span class="material-symbols-outlined text-[24px]"
						>{CancionEstado.reproduciendo ? 'pause' : 'play_arrow'}</span
					>
				</button>
				<button
					class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
					aria-label="Pista siguiente"
					type="button"
				>
					<span class="material-symbols-outlined text-[22px]">skip_next</span>
				</button>
				<button
					class="transition-colors cursor-pointer hover:text-on-surface {CancionEstado.repetir
						? 'text-primary-container'
						: 'text-on-surface-variant'}"
					aria-label="Repetir"
					aria-pressed={CancionEstado.repetir}
					onclick={AlternarRepetir}
					type="button"
				>
					<span class="material-symbols-outlined text-[18px]">repeat</span>
				</button>
			</div>
			<div class="w-full flex items-center gap-space-sm">
				<span class="font-label-sm text-label-sm text-primary-container">{formatearTiempo(tiempoActual)}</span>
				<input
					class="barra-rango flex-1"
					style={`--relleno: ${progreso}%`}
					type="range"
					min="0"
					max="100"
					step="0.1"
					value={progreso}
					oninput={actualizarProgreso}
					aria-label="Progreso de la canción"
					disabled={!pista}
				/>
				<span class="font-label-sm text-label-sm text-on-surface-variant">{formatearTiempo(duracion)}</span>
			</div>
		</div>

		<!-- VOLUMEN ESCRITORIO -->
		<div class="hidden lg:flex items-center gap-space-md w-1/4 min-w-[240px] justify-end">
			<button
				class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
				aria-label={CancionEstado.silenciado ? 'Activar sonido' : 'Silenciar'}
				aria-pressed={CancionEstado.silenciado}
				onclick={AlternarSilencio}
				type="button"
			>
				<span class="material-symbols-outlined text-[20px]">{iconoVolumen}</span>
			</button>
			<input
				class="barra-rango w-24"
				style={`--relleno: ${volumen}%`}
				type="range"
				min="0"
				max="100"
				step="1"
				value={volumen}
				oninput={actualizarVolumen}
				aria-label="Volumen"
			/>
			<button
				class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
				aria-label="Cola de reproducción"
				type="button"
			>
				<span class="material-symbols-outlined text-[20px]">queue_music</span>
			</button>
		</div>
	</div>

	<!-- PROGRESO MÓVIL -->
	<div class="lg:hidden flex items-center gap-2 px-3 pb-2">
		<span class="font-label-sm text-[10px] text-primary-container">{formatearTiempo(tiempoActual)}</span>
		<input
			class="barra-rango flex-1"
			style={`--relleno: ${progreso}%`}
			type="range"
			min="0"
			max="100"
			step="0.1"
			value={progreso}
			oninput={actualizarProgreso}
			aria-label="Progreso de la canción"
			disabled={!pista}
		/>
		<span class="font-label-sm text-[10px] text-on-surface-variant">{formatearTiempo(duracion)}</span>
	</div>
</footer>
{/if}

<style>
	.barra-rango {
		-webkit-appearance: none;
		appearance: none;
		height: 1rem;
		background: transparent;
		cursor: pointer;
	}

	.barra-rango:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.barra-rango::-webkit-slider-runnable-track {
		height: 4px;
		background: linear-gradient(to right, #38bdf8 var(--relleno, 0%), #2a2a2c var(--relleno, 0%));
	}

	.barra-rango::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 8px;
		height: 8px;
		margin-top: -2px;
		background: #ffffff;
		border: none;
		border-radius: 0;
	}

	.barra-rango::-moz-range-track {
		height: 4px;
		background: #2a2a2c;
	}

	.barra-rango::-moz-range-progress {
		height: 4px;
		background: #38bdf8;
	}

	.barra-rango::-moz-range-thumb {
		width: 8px;
		height: 8px;
		background: #ffffff;
		border: none;
		border-radius: 0;
	}

	.barra-rango:focus-visible {
		outline: 1px solid #38bdf8;
		outline-offset: 4px;
	}
</style>
