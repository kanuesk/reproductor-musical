<script lang="ts">
	import '../app.css';
	import PlayerBar from '$lib/components/PlayerBar.svelte';

	let { children } = $props();
</script>

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
	<!-- TOP HEADER -->
	<header class="fixed top-0 left-0 right-0 z-30 h-16 grid grid-cols-[280px_1fr_280px] items-center bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high">
		<!-- columna izquierda: la ocupa el sidebar -->
		<div class="h-full"></div>

		<!-- SEARCH BAR (centrada en la página) -->
		<div class="flex items-center justify-center min-w-0 px-4">
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

		<!-- PROFILE ICON -->
		<div class="flex items-center justify-end pr-6">
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

	<div class="flex">
		<!-- SIDEBAR -->
		<aside class="w-[280px] h-screen fixed left-0 top-0 bg-surface-container-lowest flex flex-col justify-between z-40 after:content-[''] after:absolute after:right-0 after:top-16 after:bottom-0 after:w-px after:bg-surface-container-high after:pointer-events-none">
			<div class="flex flex-col">
				<div class="h-16 flex items-center px-6 gap-3 border-b border-surface-container-high">
					<span class="material-symbols-outlined text-primary-container text-[28px]">graphic_eq</span>
					<span class="font-display-lg text-headline-sm font-bold tracking-wider text-white uppercase">KINETIC</span>
				</div>
				<nav class="flex flex-col p-4 gap-1">
					<a class="flex items-center gap-3 px-3 py-2 text-primary-container bg-surface-container" href="/">
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
		<main class="ml-[280px] w-[calc(100%-280px)] min-h-screen pt-16 pb-24">
			<div class="p-6">
				{@render children()}
			</div>
		</main>
	</div>

	<!-- FOOTER PLAYER (componente con estado propio) -->
	<PlayerBar />
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
