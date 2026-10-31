<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import PlayerBar from '$lib/components/PlayerBar.svelte';

	let { children } = $props();

	let menuAbierto = $state(false);
	let busquedaAbierta = $state(false);

	const esReproductor = $derived(page.url.pathname === '/Reproductor');

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

<div class="dark w-full min-h-screen bg-[#131315] text-on-surface">
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

	<div class="flex">
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
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
						<span class="material-symbols-outlined text-[20px]">explore</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">EXPLORAR</span>
					</a>
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
						<span class="material-symbols-outlined text-[20px]">album</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">ÁLBUMES</span>
					</a>
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
						<span class="material-symbols-outlined text-[20px]">person</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">ARTISTAS</span>
					</a>
					<div class="h-px bg-surface-container-high my-2"></div>
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
						<span class="material-symbols-outlined text-[20px]">queue_music</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">PLAYLISTS</span>
					</a>
					<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" href="#">
						<span class="material-symbols-outlined text-[20px]">favorite</span>
						<span class="font-headline-sm text-label-md uppercase font-bold tracking-wider">FAVORITOS</span>
					</a>
				</nav>
			</div>
			<div class="p-4 border-t border-surface-container-high">
				<div class="text-[9px] font-mono text-on-surface-variant uppercase tracking-widest">[ KINETIC_OS v1.0 ]</div>
			</div>
		</aside>

		<!-- MAIN CONTENT -->
		<main class="w-full lg:ml-[280px] lg:w-[calc(100%-280px)] min-h-screen {esReproductor ? '' : 'pt-16'} pb-28 lg:pb-24">
			<div class="p-4 sm:p-6">
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
</style>
