<script lang="ts">
	import { page } from '$app/state';
	import { ActualizarCancionActual, CancionEstado } from '$lib/state/cancion.svelte.js';
	import { albumesPorArtista } from '$lib/data/albumes';

	let { data } = $props();

	let alturaColumnaAlbum = $state(0);

	const nombreArtista = $derived(page.url.searchParams.get('nombre') || 'Michael Jackson');

	const artistasInfo: Record<string, any> = {
		'Michael Jackson': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb997cc9a4aec335d46c9481fd',
			nombre: 'MICHAEL JACKSON',
			descripcion: 'Rey del Pop. Pionero de la música pop moderna con coreografías icónicas y videos musicales revolucionarios.'
		},
		'Bad Bunny': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13',
			nombre: 'BAD BUNNY',
			descripcion: 'Artista puertorriqueño, referente del reggaetón y trap latino. Innovador y con gran impacto global.'
		},
		'Lana Del Rey': {
			imagen: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0d6ddb2a-45f0-4827-b2ce-82f78310248b.webp',
			nombre: 'LANA DEL REY',
			descripcion: 'Cantante y compositora estadounidense, conocida por su estilo melancólico y cinematográfico.'
		},
		'Billie Eilish': {
			imagen: 'https://www.impericon.com/cdn/shop/articles/20251211_BEtrailerscreenshot_1_52fddf51-601c-49c2-af5d-df79da40fb82.jpg?v=1765455896&width=1475',
			nombre: 'BILLIE EILISH',
			descripcion: 'Cantante y compositora estadounidense, conocida por su estilo único y letras introspectivas.'
		},
		'Radiohead': {
			imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAMezSLeaj6VmnS-VMnJ1Tsu0npep6Wd1cVztLO4LwAeO3hyqBlfcush4&s=10',
			nombre: 'RADIOHEAD',
			descripcion: 'Banda británica de rock alternativo, conocida por su innovación y experimentación musical.'
		},
		'Rihanna': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5ebcb565a8e684e3be458d329ac',
			nombre: 'RIHANNA',
			descripcion: 'Cantante barbadense, ícono de la música pop y R&B con gran influencia global.'
		}
	};

	const normalizar = (texto: string) =>
		texto
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.trim()
			.toLowerCase();

	const artista = $derived(artistasInfo[nombreArtista] || artistasInfo['Michael Jackson']);

	const album = $derived(
		albumesPorArtista[nombreArtista] ?? albumesPorArtista['Michael Jackson']
	);

	// Solo se muestran las pistas que existen en el catálogo registrado.
	const pistasMasEscuchadas = $derived(
		(data.tracks ?? []).filter(
			(track: any) => normalizar(track.artist?.name ?? '') === normalizar(nombreArtista)
		)
	);

	const artistaImagen = $derived(pistasMasEscuchadas[0]?.artist?.image ?? artista.imagen);

	const imagenPista = (pista: any) =>
		pista.album?.image ??
		pista.album?.thumbnail ??
		pista.artist?.image ??
		pista.artist?.thumbnail ??
		artistaImagen;

	function reproducir(pista: any) {
		ActualizarCancionActual(pista);
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com" rel="preconnect" />
	<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
		rel="stylesheet"
	/>
</svelte:head>

<div class="w-full">
	<!-- Cabecera Superior de Navegación y Retorno -->
	<div class="flex items-center justify-between py-space-sm mb-space-md">
		<div class="flex items-center gap-space-sm">
			<a
				class="inline-flex items-center gap-space-xs px-space-md py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-primary-container font-label-md text-label-md uppercase tracking-wider transition-colors"
				href="/Artistas"
			>
				<span class="material-symbols-outlined text-[16px]">arrow_back</span>
				VOLVER AL DIRECTORIO
			</a>
		</div>
		<div class="flex items-center gap-space-md"></div>
	</div>

	<!-- Fila de Perfil Principal: Hero Brutalista Modular -->
	<div class="relative w-full bg-surface-container-lowest p-space-lg mb-space-lg shadow-xl overflow-hidden">
		<!-- Luz ambiental sutil de fondo -->
		<div class="absolute -right-24 -top-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
		<div class="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
		<div class="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-space-xl">
			<!-- Avatar Circular del Artista con Botón de Reproducción Superpuesto -->
			<div class="relative group shrink-0">
				<div class="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden p-1 bg-surface-container-high transition-transform duration-500 group-hover:scale-[1.02]">
					<img
						class="w-full h-full object-cover rounded-full contrast-125 filter group-hover:contrast-150 transition-all duration-500"
						alt={nombreArtista}
						src={artistaImagen}
					/>
				</div>
			</div>
			<!-- Metadatos de Artista e Identidad -->
			<div class="flex-1 flex flex-col justify-between items-center lg:items-start text-center lg:text-left min-w-0">
				<div class="w-full">
					<div class="flex flex-wrap items-center justify-center lg:justify-start gap-space-sm mb-space-xs"></div>
					<div class="flex items-center justify-center lg:justify-start gap-space-md mt-1 mb-space-xs">
						<h1 class="font-display-lg text-display-lg font-black uppercase tracking-tight text-primary neon-glow-title leading-none">
							{artista.nombre}
						</h1>
					</div>
					<p class="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1 mb-space-md">
						{artista.descripcion}
					</p>
				</div>
				<!-- Acciones Principales y Métricas de Cinta -->
				<div class="w-full flex flex-col sm:flex-row items-center gap-space-md pt-space-sm justify-start">
					<div class="flex items-center gap-space-sm w-full sm:w-auto justify-start">
						<button class="flex-1 sm:flex-none flex items-center justify-center gap-space-xs px-space-md py-2.5 bg-primary text-background hover:bg-primary/90 font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors cursor-pointer">
							<span class="material-symbols-outlined text-[18px]">shuffle</span>ALEATORIO
						</button>
						<button class="flex-1 sm:flex-none flex items-center justify-center gap-space-xs px-space-md py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors">
							<span class="material-symbols-outlined text-[18px]">bookmark_add</span>
							SEGUIR ARTISTA
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Contenedor Dividido: Pistas Más Escuchadas (catálogo registrado) -->
	<div class="w-full flex flex-col mb-space-xl">
		<div class="w-full flex flex-col bg-surface-container-lowest p-space-md">
			<div class="flex items-center justify-between pb-space-sm mb-space-sm">
				<div class="flex items-center gap-space-xs">
					<span class="w-2 h-2 bg-primary-container"></span>
					<h2 class="font-headline-sm text-headline-sm uppercase font-bold tracking-wider text-primary">PISTAS MÁS ESCUCHADAS</h2>
				</div>
				<span class="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
					{pistasMasEscuchadas.length.toString().padStart(2, '0')} PISTAS
				</span>
			</div>
			<div class="flex flex-col gap-1 w-full">
				{#each pistasMasEscuchadas as pista, i (pista.id)}
					{@const esActual = CancionEstado.actual?.id === pista.id}
					<button
						type="button"
						class="group flex w-full items-center justify-between gap-space-sm p-space-sm text-left transition-colors cursor-pointer {esActual
							? 'bg-surface-container'
							: 'bg-surface-container-low hover:bg-surface-container'}"
						aria-label={`${esActual && CancionEstado.reproduciendo ? 'Pausar' : 'Reproducir'} ${pista.title}`}
						onclick={() => reproducir(pista)}
					>
						<div class="flex items-center gap-space-md min-w-0 flex-1">
							<div class="w-6 flex items-center justify-center shrink-0 font-mono text-[11px] text-on-surface-variant">
								{#if esActual && CancionEstado.reproduciendo}
									<span class="material-symbols-outlined text-[16px] text-primary-container">equalizer</span>
								{:else}
									{i + 1}
								{/if}
							</div>
							<div class="w-10 h-10 shrink-0 bg-surface-container-high overflow-hidden">
								<img
									class="w-full h-full object-cover contrast-125"
									alt={`Portada de ${pista.album?.title ?? pista.title}`}
									src={imagenPista(pista)}
									loading="lazy"
								/>
							</div>
							<div class="min-w-0 flex-1">
								<div
									class="font-headline-sm text-headline-sm uppercase truncate transition-colors {esActual
										? 'text-primary-container'
										: 'text-primary group-hover:text-primary-container'}"
								>
									{pista.title}
								</div>
								<div class="font-label-md text-label-md text-on-surface-variant uppercase truncate">
									{pista.artist?.name ?? nombreArtista}
									{#if pista.album?.title}
										<span class="text-on-surface-variant/60"> // {pista.album.title}</span>
									{/if}
								</div>
							</div>
						</div>
						<span
							class="material-symbols-outlined shrink-0 text-[22px] transition-colors {esActual
								? 'text-primary-container'
								: 'text-on-surface-variant group-hover:text-primary-container'}"
							style={esActual && CancionEstado.reproduciendo
								? "font-variation-settings: 'FILL' 1;"
								: ''}
						>
							{esActual && CancionEstado.reproduciendo ? 'pause' : 'play_arrow'}
						</span>
					</button>
				{:else}
					<div
						class="flex items-center gap-space-sm p-space-md bg-surface-container-low font-label-md text-label-md uppercase tracking-wider text-on-surface-variant"
					>
						<span class="material-symbols-outlined text-[20px]">music_off</span>
						AÚN NO HAY CANCIONES REGISTRADAS PARA ESTE ARTISTA
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Sección de Discografía y Lanzamientos: Grilla Simétrica Idéntica al Directorio -->
	<div class="flex flex-col w-full mb-space-xl">
		<div class="flex flex-col sm:flex-row sm:items-end justify-between pb-space-sm mb-space-lg gap-space-sm">
			<div class="flex items-center gap-space-xs">
				<span class="w-2.5 h-2.5 bg-primary-container"></span>
				<h2 class="font-headline-lg text-headline-lg uppercase font-bold tracking-tight text-primary">ÁLBUMES</h2>
			</div>
		</div>
		<div class="w-full bg-surface-container-lowest p-space-lg mb-space-lg border border-surface-container-high/60">
			<div class="flex flex-col lg:flex-row gap-space-xl">
				<!-- Portada e información del álbum más reciente -->
				<div class="lg:w-80 shrink-0 flex flex-col lg:self-start" bind:clientHeight={alturaColumnaAlbum}>
					<div class="relative aspect-square w-full bg-surface-container-high overflow-hidden border border-surface-container-high">
						<img
							alt={`Portada de ${album.titulo}`}
							class="w-full h-full object-cover contrast-125"
							src={album.imagen}
							loading="lazy"
						/>
					</div>
					<div class="mt-space-md flex flex-col gap-1">
						<span class="font-label-sm text-[10px] text-primary-container font-mono tracking-wider">
							{album.fecha}
						</span>
						<h3 class="font-headline-sm text-headline-sm uppercase font-bold text-primary break-words">
							{album.titulo}
						</h3>
						<p class="font-label-sm text-[11px] text-on-surface-variant font-mono mt-1">
							{album.descripcion}
						</p>
					</div>
				</div>

				<!-- Listado vertical de canciones del álbum -->
				<div
					class="w-full min-w-0 flex flex-col lg:flex-1"
					style={alturaColumnaAlbum > 0 ? `height: ${alturaColumnaAlbum}px` : undefined}
				>
					<ol class="tracklist-scroll flex-1 min-h-0 overflow-y-auto flex flex-col gap-1 w-full pr-1">
						{#each album.canciones as cancion, i}
							<li
								class="group flex items-center gap-space-md p-2 bg-surface-container-low hover:bg-surface-container transition-colors"
							>
								<span class="w-6 shrink-0 text-center font-mono text-[11px] text-on-surface-variant">
									{i + 1}
								</span>
								<span
									class="flex-1 min-w-0 font-label-md text-label-md uppercase text-primary group-hover:text-primary-container transition-colors break-words"
								>
									{cancion.titulo}
								</span>
								<span class="shrink-0 font-mono text-[11px] text-on-surface-variant">
									{cancion.duracion}
								</span>
							</li>
						{/each}
					</ol>
					<div class="flex justify-end pt-space-sm mt-space-xs shrink-0">
						<span class="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
							{album.canciones.length.toString().padStart(2, '0')} CANCIONES
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.neon-glow-title {
		text-shadow: 0 0 12px rgba(204, 255, 0, 0.6), 0 0 30px rgba(204, 255, 0, 0.4), 0 0 60px rgba(204, 255, 0, 0.25);
		transition: text-shadow 0.3s ease, filter 0.3s ease;
	}
	.neon-glow-title:hover {
		text-shadow: 0 0 18px rgba(204, 255, 0, 0.9), 0 0 45px rgba(204, 255, 0, 0.7), 0 0 85px rgba(204, 255, 0, 0.5);
		filter: brightness(1.15);
	}

	.tracklist-scroll {
		scrollbar-width: thin;
		scrollbar-color: var(--color-primary-container, #ccff00) var(--color-surface-container, #1c1c1c);
	}

	.tracklist-scroll::-webkit-scrollbar {
		width: 6px;
	}

	.tracklist-scroll::-webkit-scrollbar-track {
		background: var(--color-surface-container, #1c1c1c);
	}

	.tracklist-scroll::-webkit-scrollbar-thumb {
		background: var(--color-primary-container, #ccff00);
		border-radius: 9999px;
	}

	.tracklist-scroll::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary, #ffffff);
	}
</style>
