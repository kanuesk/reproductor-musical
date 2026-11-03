<script lang="ts">
	import { page } from '$app/state';
	import { ActualizarCancionActual } from '$lib/state/cancion.svelte.js';
	
	const nombreArtista = $derived(page.url.searchParams.get('nombre') || 'Michael Jackson');
	
	const artistasInfo: Record<string, any> = {
		'Michael Jackson': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb997cc9a4aec335d46c9481fd',
			nombre: 'MICHAEL JACKSON',
			descripcion: 'Rey del Pop. Pionero de la música pop moderna con coreografías icónicas y videos musicales revolucionarios.',
			pistas: [
				{ id: 'mj1', nombre: 'Billie Jean', duracion: '04:54', imagen: 'https://i.scdn.co/image/ab67616d00001e02d59a6abeb186a9c9c8e6e7e6', audio: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/4f124454-1aef-4fd8-a45c-32229bd4d604.webm', artist: { name: 'Michael Jackson' } },
			]
		},
		'Bad Bunny': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13',
			nombre: 'BAD BUNNY',
			descripcion: 'Artista puertorriqueño, referente del reggaetón y trap latino. Innovador y con gran impacto global.',
			pistas: [
				{ nombre: 'Tití Me Preguntó', duracion: '04:03', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Moscow Mule', duracion: '04:05', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Después de la Playa', duracion: '03:50', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Efecto', duracion: '03:33', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Neverita', duracion: '02:53', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' }
			]
		},
		'Lana Del Rey': {
			imagen: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0d6ddb2a-45f0-4827-b2ce-82f78310248b.webp',
			nombre: 'LANA DEL REY',
			descripcion: 'Cantante y compositora estadounidense, conocida por su estilo melancólico y cinematográfico.',
			pistas: [
				{ nombre: 'Summertime Sadness', duracion: '04:25', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Born to Die', duracion: '04:46', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Video Games', duracion: '04:42', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Blue Jeans', duracion: '03:30', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Young and Beautiful', duracion: '03:56', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' }
			]
		},
		'Billie Eilish': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb999f8e0b2f7b7f7b7f7b7f7b',
			nombre: 'BILLIE EILISH',
			descripcion: 'Cantante y compositora estadounidense, conocida por su estilo único y letras introspectivas.',
			pistas: [
				{ nombre: 'Bad Guy', duracion: '03:14', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'When the Party\'s Over', duracion: '03:19', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Bury a Friend', duracion: '03:13', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Happier Than Ever', duracion: '04:58', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Therefore I Am', duracion: '02:54', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' }
			]
		},
		'Radiohead': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb959527d2fabc9c64287e57b9',
			nombre: 'RADIOHEAD',
			descripcion: 'Banda británica de rock alternativo, conocida por su innovación y experimentación musical.',
			pistas: [
				{ nombre: 'Creep', duracion: '03:56', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Karma Police', duracion: '04:21', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Paranoid Android', duracion: '06:23', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'No Surprises', duracion: '03:49', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Street Spirit', duracion: '04:12', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' }
			]
		},
		'Rihanna': {
			imagen: 'https://i.scdn.co/image/ab6761610000e5ebcb565a8e684e3be458d329ac',
			nombre: 'RIHANNA',
			descripcion: 'Cantante barbadense, ícono de la música pop y R&B con gran influencia global.',
			pistas: [
				{ nombre: 'Umbrella', duracion: '04:35', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'We Found Love', duracion: '03:35', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Diamonds', duracion: '03:45', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Rude Boy', duracion: '03:43', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' },
				{ nombre: 'Work', duracion: '03:39', imagen: 'https://i.scdn.co/image/ab67616d00001e02b8b9c0c8c0c8c0c8c0c8c0c8' }
			]
		}
	};
	
	const artista = $derived(artistasInfo[nombreArtista] || artistasInfo['Michael Jackson']);
	const artistaImagen = $derived(artista.imagen);
	const pistasMasEscuchadas = $derived(artista.pistas);
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

	<!-- Contenedor Dividido: Top 5 Pistas Más Escuchadas -->
	<div class="w-full flex flex-col mb-space-xl">
		<div class="w-full flex flex-col bg-surface-container-lowest p-space-md">
			<div class="flex items-center justify-between pb-space-sm mb-space-sm">
				<div class="flex items-center gap-space-xs">
					<span class="w-2 h-2 bg-primary-container"></span>
					<h2 class="font-headline-sm text-headline-sm uppercase font-bold tracking-wider text-primary">PISTAS MÁS ESCUCHADAS</h2>
				</div>
			</div>
			<div class="flex flex-col gap-1 w-full">
				{#each pistasMasEscuchadas as pista, i}
					<div class="group flex items-center justify-between p-space-sm bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
						<div class="flex items-center gap-space-md min-w-0 flex-1">
							<div class="w-6 flex items-center justify-center shrink-0 font-mono text-[11px] text-on-surface-variant">
								{i + 1}
							</div>
							<div class="w-10 h-10 shrink-0 bg-surface-container-high overflow-hidden">
								<img class="w-full h-full object-cover contrast-125" alt={pista.nombre} src={pista.imagen} />
							</div>
							<div class="min-w-0 flex-1">
								<div class="font-headline-sm text-headline-sm text-primary uppercase truncate">{pista.nombre}</div>
								<div class="font-label-md text-label-md text-on-surface-variant uppercase truncate">{nombreArtista.toUpperCase()}</div>
							</div>
							<div class="font-label-md text-label-md text-on-surface-variant">{pista.duracion}</div>
						</div>
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
				<div class="lg:w-80 shrink-0 flex flex-col">
					<div class="relative aspect-square w-full bg-surface-container-high overflow-hidden border border-surface-container-high">
						<img alt="SYNAPSE OVERLOAD EP Cover" class="w-full h-full object-cover grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJx-BPdwOy0kn_1GAYJ2a6Adl2IHbSDbVV4TNT3JC9lyCN74LzYpfmxYLi_5jjjx6Mf-PfNIQskl9oerCVjdWPnoNf5MWCdbKfUox3UYptbRMtHEH4wz5SPhV9wiG6fz8IEVFtifdTxayXnpI_iN3uCyaB8mbqE_4o7nQgvhZa_L6zdvDhSjVoyPlsJyRPFLMAORO2AA42pYUku2KQQucHLll8LeHmxzycbYr4ww" />
						<div class="absolute bottom-2 left-2 px-1.5 py-0.5 bg-surface-container-lowest/90 font-label-sm text-[10px] text-primary-container font-mono border border-primary-container/30">SYNAPSE // 01</div>
					</div>
					<div class="mt-space-md flex flex-col gap-1">
						<span class="font-label-sm text-[10px] text-primary-container font-mono tracking-wider">REF: KNT-EP04 // EDICIÓN VINILO</span>
						<h3 class="font-headline-sm text-headline-sm uppercase font-bold text-primary">SYNAPSE OVERLOAD // EP_04</h3>
						<div class="font-label-sm text-[11px] text-on-surface-variant font-mono mt-1 flex flex-col gap-0.5">
							<span class="">ESPECTRO DE GÉNERO: CLUB DECONSTRUIDO / TECHNO INDUSTRIAL</span>
							<span class="">DURACIÓN TOTAL: 48:19 (8 PISTAS)</span>
						</div>
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
</style>
