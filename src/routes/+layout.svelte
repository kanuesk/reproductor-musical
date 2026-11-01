<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import PlayerBar from '$lib/components/PlayerBar.svelte';
	import { ActualizarCancionActual, CancionEstado } from '$lib/state/cancion.svelte.js';

	let { children } = $props();

	let menuAbierto = $state(false);
	let busquedaAbierta = $state(false);

	const esReproductor = $derived(page.url.pathname === '/Reproductor');

	// Canciones de ejemplo para la lista de reproducción del menú lateral.
	const cancionesEjemplo = [
		{
			id: '01KTMB25AR3AJ9D1KJW8Z5QVBC',
			title: 'Born To Die',
			audio: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/acb09874-e214-4edd-81ac-2db00d0c138a.webm',
			artist: {
				name: 'Lana Del Rey',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0d6ddb2a-45f0-4827-b2ce-82f78310248b.webp'
			},
			album: {
				title: 'Born To Die',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/68ff7360-fe6e-4ba2-8c66-e6ca81b32662.webp'
			},
			duracion: '03:50'
		},
		{
			id: '01KTMCD6DSDSNAY794V43FFP0Q',
			title: 'Thriller',
			audio: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/4f124454-1aef-4fd8-a45c-32229bd4d604.webm',
			artist: {
				name: 'Michael Jackson',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/8f93e53b-d152-4e78-a5a1-00368ff59a47.webp'
			},
			album: {
				title: 'Thriller',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0566bf4c-9919-4571-b0b5-0177319b6211.webp'
			},
			duracion: '05:57'
		},
		{
			id: '01KTMHTZAWK8487FSDEY3Z24D0',
			title: 'Cinnamon Girl',
			audio: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/c49e1073-8c21-4723-8300-abd357d93bed.webm',
			artist: {
				name: 'Lana Del Rey',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0d6ddb2a-45f0-4827-b2ce-82f78310248b.webp'
			},
			album: {
				title: 'Norman Fucking Rockwell!',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/a8655e24-ce4f-4520-8d83-df6ea24f2cf0.webp'
			},
			duracion: '05:00'
		},
		{
			id: '01KTMHXTATSSMSZW2E684Y22DD',
			title: 'West Coast',
			audio: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/cc30b904-45ac-4f60-9158-9701d702cb8d.webm',
			artist: {
				name: 'Lana Del Rey',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0d6ddb2a-45f0-4827-b2ce-82f78310248b.webp'
			},
			album: {
				title: 'Ultraviolence',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/67f794c7-9bbe-40f2-aca9-3fa017d6c450.webp'
			},
			duracion: '04:16'
		},
		{
			id: '01KVDQS8FPEEEW7GAXM4GZDXJP',
			title: 'Bad',
			audio: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0d03bc7e-be7a-48ab-99f5-a816f0d61a2f.webm',
			artist: {
				name: 'Michael Jackson',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/8f93e53b-d152-4e78-a5a1-00368ff59a47.webp'
			},
			album: {
				title: 'Bad',
				image: 'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/4852abfc-591f-49f3-87af-e6b7bc847924.webp'
			},
			duracion: '04:07'
		}
	];

	// La vista del reproductor es inmersiva: no muestra el header global ni sus buscadores.
	$effect(() => {
		if (!esReproductor) return;
		menuAbierto = false;
		busquedaAbierta = false;
	});

	// Transición suave entre la vista principal y el reproductor (View Transitions API).
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Bloquea el scroll del fondo mientras el menú móvil está abierto.
	$effect(() => {
		document.body.style.overflow = menuAbierto ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') {
			menuAbierto = false;
			busquedaAbierta = false;
		}
	}}
	onresize={() => {
		if (window.innerWidth >= 1024) menuAbierto = false;
		if (window.innerWidth >= 768) busquedaAbierta = false;
	}}
/>

<svelte:head>
	<link href="https://fonts.googleapis.com" rel="preconnect" />
	<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="dark w-full {esReproductor ? 'h-dvh overflow-hidden' : 'min-h-screen'} bg-[#131315] text-on-surface">
	{#if !esReproductor}
		<!-- TOP HEADER -->
		<header class="fixed top-0 left-0 right-0 z-30 h-16 flex items-center gap-2 px-3 sm:px-4 lg:px-0 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high">
		<!-- IZQUIERDA: menú móvil / espacio del sidebar -->
		<div class="flex items-center gap-2 lg:w-[280px] lg:pl-6">
			<button
				class="lg:hidden w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-[#38bdf8] transition-colors cursor-pointer"
				type="button"
				aria-label="Abrir menú"
				aria-expanded={menuAbierto}
				onclick={() => {
					busquedaAbierta = false;
					menuAbierto = true;
				}}
			>
				<span class="material-symbols-outlined text-[24px]">menu</span>
			</button>
			<div class="lg:hidden flex items-center gap-2">
				<span class="material-symbols-outlined text-primary-container text-[24px]">graphic_eq</span>
				<span class="font-display-lg text-headline-sm font-bold tracking-wider text-white uppercase">KINETIC</span>
			</div>
		</div>

		<!-- SEARCH BAR (centrada en pantallas medianas y grandes) -->
		<div class="hidden md:flex flex-1 items-center justify-center min-w-0 px-2 lg:px-4">
			<div class="group flex items-center gap-2 w-full max-w-[20rem] h-10 px-3 bg-surface-container hover:bg-surface-container-high border border-transparent focus-within:bg-surface-container-lowest focus-within:border-[#38bdf8]/60 transition-colors">
				<span class="material-symbols-outlined text-[18px] text-on-surface-variant group-focus-within:text-[#38bdf8] transition-colors select-none">search</span>
				<input
					type="search"
					aria-label="Buscar en Kinetic"
					placeholder="BUSCAR..."
					class="flex-1 min-w-0 bg-transparent border-0 outline-none font-label-md text-label-md uppercase tracking-wider text-on-surface placeholder:text-on-surface-variant/70"
				/>
			</div>
		</div>

		<!-- DERECHA: buscar (móvil) + perfil -->
		<div class="flex items-center justify-end gap-1 sm:gap-2 lg:w-[280px] lg:pr-6">
			<button
				class="md:hidden w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-[#38bdf8] transition-colors cursor-pointer"
				type="button"
				aria-label={busquedaAbierta ? 'Cerrar búsqueda' : 'Buscar'}
				aria-expanded={busquedaAbierta}
				onclick={() => (busquedaAbierta = !busquedaAbierta)}
			>
				<span class="material-symbols-outlined text-[22px]">{busquedaAbierta ? 'close' : 'search'}</span>
			</button>
			<button
				class="group relative w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-surface-container border border-surface-container-high hover:border-[#38bdf8]/70 text-on-surface-variant hover:text-[#38bdf8] transition-colors duration-150 cursor-pointer"
				type="button"
				aria-label="Perfil de usuario"
			>
				<span class="material-symbols-outlined text-[20px]">person</span>
				<span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#38bdf8] border-2 border-surface-container-lowest"></span>
			</button>
		</div>
	</header>

	<!-- BUSCADOR MÓVIL -->
	{#if busquedaAbierta}
		<div class="fixed top-16 left-0 right-0 z-20 md:hidden p-3 bg-surface-container-lowest border-b border-surface-container-high">
			<div class="flex items-center gap-2 w-full h-10 px-3 bg-surface-container border border-surface-container-high focus-within:border-[#38bdf8]/60 transition-colors">
				<span class="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
				<input
					type="search"
					aria-label="Buscar en Kinetic"
					placeholder="BUSCAR..."
					class="flex-1 min-w-0 bg-transparent border-0 outline-none font-label-md text-label-md uppercase tracking-wider text-on-surface placeholder:text-on-surface-variant/70"
				/>
			</div>
		</div>
	{/if}
	{/if}

	<!-- BACKDROP DEL MENÚ MÓVIL -->
	{#if menuAbierto}
		<button
			class="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
			type="button"
			aria-label="Cerrar menú"
			onclick={() => (menuAbierto = false)}
		></button>
	{/if}

	<div class="flex {esReproductor ? 'h-full' : ''}">
		<!-- SIDEBAR (drawer en móvil) -->
		<aside
			class="w-[280px] h-screen fixed left-0 top-0 bg-surface-container-lowest flex flex-col justify-between z-[60] lg:z-40 transition-transform duration-300 ease-out lg:translate-x-0 lg:visible overflow-y-auto overscroll-contain {menuAbierto
				? 'translate-x-0 visible'
				: '-translate-x-full invisible'} after:content-[''] after:absolute after:right-0 after:top-16 after:bottom-0 after:w-px after:bg-surface-container-high after:pointer-events-none"
			aria-label="Navegación principal"
		>
			<div class="flex flex-col">
				<div class="h-16 flex items-center justify-between px-6 border-b border-surface-container-high">
					<div class="flex items-center gap-3">
						<span class="material-symbols-outlined text-primary-container text-[28px]">graphic_eq</span>
						<span class="font-display-lg text-headline-sm font-bold tracking-wider text-white uppercase">KINETIC</span>
					</div>
					<button
						class="lg:hidden w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-[#38bdf8] transition-colors cursor-pointer"
						type="button"
						aria-label="Cerrar menú"
						onclick={() => (menuAbierto = false)}
					>
						<span class="material-symbols-outlined text-[22px]">close</span>
					</button>
				</div>
				<nav class="flex flex-col p-4 gap-1">
					<a class="flex items-center gap-3 px-3 py-2 text-primary-container bg-surface-container" href="/" onclick={() => (menuAbierto = false)}>
						<span class="material-symbols-outlined text-[20px]">home</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">INICIO</span>
					</a>
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="/Explorar" onclick={() => (menuAbierto = false)}>
						<span class="material-symbols-outlined text-[20px]">explore</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">EXPLORAR</span>
					</a>
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="/Artistas" onclick={() => (menuAbierto = false)}>
						<span class="material-symbols-outlined text-[20px]">person</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">ARTISTAS</span>
					</a>
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="/Cintas%20Guardadas" onclick={() => (menuAbierto = false)}>
						<svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">CINTAS GUARDADAS</span>
					</a>
					<div class="h-px bg-surface-container-high my-2"></div>
				</nav>

				<!-- LISTA DE REPRODUCCIÓN VERTICAL -->
				<section class="px-4 pb-2" aria-label="Lista de reproducción">
					<div class="flex items-center justify-between pb-2">
						<h2 class="font-headline-sm text-label-md uppercase font-bold tracking-wider text-on-surface-variant">
							LISTA DE REPRODUCCIÓN
						</h2>
						<span class="font-mono text-[10px] text-primary-container">
							{cancionesEjemplo.length.toString().padStart(2, '0')}
						</span>
					</div>
					<div class="lista-canciones max-h-60 overflow-y-auto overscroll-contain flex flex-col gap-1 pr-1">
						{#each cancionesEjemplo as cancion, i}
							<button
								type="button"
								class="group flex w-full items-center gap-2 p-1.5 text-left transition-colors cursor-pointer {CancionEstado.actual?.id ===
								cancion.id
									? 'bg-surface-container'
									: 'hover:bg-surface-container'}"
								aria-label={`Reproducir ${cancion.title}`}
								onclick={() => ActualizarCancionActual(cancion)}
							>
								<span class="w-4 shrink-0 font-mono text-[10px] text-on-surface-variant/70">
									{String(i + 1).padStart(2, '0')}
								</span>
								<img
									class="w-9 h-9 shrink-0 object-cover bg-surface-container-high"
									src={cancion.album.image}
									alt={`Portada de ${cancion.album.title}`}
									loading="lazy"
								/>
								<span class="min-w-0 flex-1">
									<span
										class="block truncate font-headline-sm text-label-md font-bold transition-colors {CancionEstado.actual?.id ===
										cancion.id
											? 'text-primary-container'
											: 'text-primary group-hover:text-primary-container'}"
									>
										{cancion.title}
									</span>
									<span class="block truncate font-label-md text-[10px] text-on-surface-variant">
										{cancion.artist.name}
									</span>
								</span>
								<span class="shrink-0 font-mono text-[10px] text-on-surface-variant">{cancion.duracion}</span>
							</button>
						{/each}
					</div>
				</section>
			</div>
			<div class="p-4 border-t border-surface-container-high">
				<div class="text-[9px] font-mono text-on-surface-variant uppercase tracking-widest">[ KINETIC_OS v1.0 ]</div>
			</div>
		</aside>

		<!-- MAIN CONTENT -->
		<main class="w-full lg:ml-[280px] lg:w-[calc(100%-280px)] {esReproductor
			? 'h-full overflow-hidden'
			: 'min-h-screen pt-16 pb-28 lg:pb-24'}">
			<div class={esReproductor ? 'h-full' : 'p-4 sm:p-6'}>
				{@render children()}
			</div>
		</main>
	</div>

	<!-- FOOTER PLAYER (se oculta en la vista inmersiva; el audio sigue activo) -->
	<PlayerBar mostrar={!esReproductor} />
</div>

<style>
	@layer base {
		html,
		body {
			margin: 0;
			padding: 0;
		}
		body {
			overscroll-behavior: none;
		}
	}
	::-webkit-scrollbar {
		display: none;
	}
	.neon-glow-title {
		text-shadow: 0 0 12px rgba(56, 189, 248, 0.6), 0 0 30px rgba(56, 189, 248, 0.4), 0 0 60px rgba(56, 189, 248, 0.25);
		transition: text-shadow 0.3s ease, filter 0.3s ease;
	}
	.neon-glow-title:hover {
		text-shadow: 0 0 18px rgba(56, 189, 248, 0.9), 0 0 45px rgba(56, 189, 248, 0.7), 0 0 85px rgba(56, 189, 248, 0.5);
		filter: brightness(1.15);
	}
	@keyframes smokeBillow1 {
		0% {
			transform: translate(-8%, 10%) rotate(0deg) scale(1.05);
		}
		33% {
			transform: translate(6%, -12%) rotate(4deg) scale(1.18);
		}
		66% {
			transform: translate(-4%, -5%) rotate(-3deg) scale(1.12);
		}
		100% {
			transform: translate(8%, -15%) rotate(5deg) scale(1.22);
		}
	}
	@keyframes smokeBillow2 {
		0% {
			transform: translate(10%, -6%) rotate(0deg) scale(1.15);
		}
		33% {
			transform: translate(-8%, 12%) rotate(-5deg) scale(1.05);
		}
		66% {
			transform: translate(6%, -10%) rotate(3deg) scale(1.25);
		}
		100% {
			transform: translate(-10%, 8%) rotate(-4deg) scale(1.1);
		}
	}
	@keyframes smokePulseSlow {
		0%,
		100% {
			opacity: 0.75;
			filter: blur(36px);
		}
		50% {
			opacity: 0.95;
			filter: blur(48px);
		}
	}
	@keyframes smokePulseFast {
		0%,
		100% {
			opacity: 0.6;
			filter: blur(28px);
		}
		50% {
			opacity: 0.85;
			filter: blur(38px);
		}
	}
	/* Barra de desplazamiento vertical de la lista de reproducción. */
	.lista-canciones {
		scrollbar-width: thin;
		scrollbar-color: #38bdf8 #2a2a2c;
	}
	.lista-canciones::-webkit-scrollbar {
		display: block;
		width: 6px;
	}
	.lista-canciones::-webkit-scrollbar-track {
		background: #2a2a2c;
		border-radius: 0;
	}
	.lista-canciones::-webkit-scrollbar-thumb {
		background: #38bdf8;
		border-radius: 0;
	}
	.lista-canciones::-webkit-scrollbar-thumb:hover {
		background: #7dd3fc;
	}
	@media (pointer: coarse) {
		.lista-canciones {
			scrollbar-width: none;
		}
		.lista-canciones::-webkit-scrollbar {
			display: none;
		}
	}
</style>
