<script lang="ts">
	import '../app.css';
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
	<script src="https://cdn.tailwindcss.com"></script>
	<script id="tailwind-config">
		tailwind.config = {
			darkMode: "class",
			theme: {
				extend: {
					colors: {
						"on-tertiary-fixed-variant": "#46464e",
						"surface-container": "#201f21",
						"secondary-fixed-dim": "#b8c3ff",
						"on-tertiary-fixed": "#1a1b22",
						"inverse-on-surface": "#303032",
						"surface-variant": "#353437",
						"on-secondary": "#002387",
						"inverse-surface": "#e5e1e4",
						"on-tertiary-container": "#63646c",
						"tertiary-fixed-dim": "#c6c5cf",
						"primary-container": "#c3f400",
						"surface-container-low": "#1b1b1d",
						"on-tertiary": "#2f3038",
						"tertiary-container": "#e3e1ec",
						"inverse-primary": "#506600",
						"tertiary": "#ffffff",
						"surface-bright": "#39393b",
						error: "#ffb4ab",
						"primary-fixed": "#c3f400",
						background: "#131315",
						"surface-dim": "#131315",
						"on-primary-fixed-variant": "#3c4d00",
						"tertiary-fixed": "#e3e1ec",
						"on-secondary-fixed-variant": "#0035bd",
						"on-primary": "#283500",
						"surface-container-highest": "#353437",
						"surface-container-lowest": "#0e0e10",
						outline: "#8e9379",
						"on-surface": "#e5e1e4",
						"outline-variant": "#444933",
						"on-primary-fixed": "#161e00",
						primary: "#ffffff",
						"on-secondary-container": "#c6cfff",
						"surface-tint": "#abd600",
						"primary-fixed-dim": "#abd600",
						"on-background": "#e5e1e4",
						"secondary-fixed": "#dde1ff",
						"secondary-container": "#0044eb",
						"on-primary-container": "#556d00",
						secondary: "#b8c3ff",
						"on-error-container": "#ffdad6",
						"on-surface-variant": "#c4c9ac",
						"on-secondary-fixed": "#001355",
						"on-error": "#690005",
						"error-container": "#93000a",
						surface: "#131315",
						"surface-container-high": "#2a2a2c"
					},
					borderRadius: {
						DEFAULT: "0.25rem",
						lg: "0.5rem",
						xl: "0.75rem",
						full: "9999px"
					},
					spacing: {
						gutter: "1rem",
						"space-lg": "1.5rem",
						"space-sm": "0.5rem",
						margin: "1rem",
						"space-xl": "2.5rem",
						"margin-desktop": "2rem",
						"space-xs": "0.25rem",
						"gutter-desktop": "1.5rem",
						"space-md": "1rem"
					},
					fontFamily: {
						"headline-md": ["Space Grotesk"],
						"headline-lg-mobile": ["Space Grotesk"],
						"body-md": ["Inter"],
						"body-lg": ["Inter"],
						"display-lg-mobile": ["Space Grotesk"],
						"label-lg": ["JetBrains Mono"],
						"label-sm": ["JetBrains Mono"],
						"label-md": ["JetBrains Mono"],
						"display-lg": ["Space Grotesk"],
						"headline-sm": ["Space Grotesk"],
						"headline-lg": ["Space Grotesk"],
						"display-md": ["Space Grotesk"],
						"display-sm": ["Space Grotesk"],
						"body-sm": ["Inter"]
					}
				}
			}
		};
	</script>
</svelte:head>

<div class="dark w-full min-h-screen bg-[#131315] text-on-surface">
	<div class="flex">
		<!-- SIDEBAR -->
		<aside class="w-[280px] h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-surface-container-high flex flex-col justify-between z-40">
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
		<main class="ml-[280px] w-[calc(100%-280px)] min-h-screen pb-24">
			<div class="p-6">
				{@render children()}
			</div>
		</main>
	</div>

	<!-- FOOTER PLAYER -->
	<footer class="fixed bottom-0 left-0 right-0 h-24 bg-surface-container-lowest z-50 flex items-center justify-between px-space-md border-t border-surface-container-high">
		<div class="flex items-center gap-space-md w-1/4 min-w-[240px]">
			<div class="w-14 h-14 bg-surface-container shrink-0 flex items-center justify-center font-label-sm text-label-sm text-primary-container">CRUDO</div>
			<div class="overflow-hidden">
				<div class="font-headline-sm text-headline-sm text-primary truncate">Yellow</div>
				<div class="font-label-md text-label-md text-on-surface-variant truncate">Coldplay</div>
			</div>
			<div class="flex items-center gap-1">
				<button class="p-1 text-on-surface-variant hover:text-primary-container" type="button"><span class="material-symbols-outlined text-[20px]">favorite</span></button>
			</div>
		</div>
		<div class="flex flex-col items-center justify-center flex-1 max-w-2xl px-space-md">
			<div class="flex items-center gap-space-md mb-2">
				<button class="text-on-surface-variant hover:text-on-surface" type="button"><span class="material-symbols-outlined text-[18px]">shuffle</span></button>
				<button class="text-on-surface-variant hover:text-on-surface" type="button"><span class="material-symbols-outlined text-[22px]">skip_previous</span></button>
				<button class="w-9 h-9 bg-primary-container text-on-primary flex items-center justify-center" type="button"><span class="material-symbols-outlined text-[24px]">play_arrow</span></button>
				<button class="text-on-surface-variant hover:text-on-surface" type="button"><span class="material-symbols-outlined text-[22px]">skip_next</span></button>
				<button class="text-on-surface-variant hover:text-on-surface" type="button"><span class="material-symbols-outlined text-[18px]">repeat</span></button>
			</div>
			<div class="w-full flex items-center gap-space-sm">
				<span class="font-label-sm text-label-sm text-primary-container">02:44</span>
				<div class="flex-1 h-1 bg-surface-container-high relative">
					<div class="h-full bg-primary-container w-[44%]"></div>
					<div class="absolute top-1/2 -translate-y-1/2 left-[44%] w-2 h-2 bg-white"></div>
				</div>
				<span class="font-label-sm text-label-sm text-on-surface-variant">06:12</span>
			</div>
		</div>
		<div class="flex items-center gap-space-md w-1/4 min-w-[240px] justify-end">
			<button class="text-on-surface-variant hover:text-on-surface" type="button"><span class="material-symbols-outlined text-[20px]">volume_up</span></button>
			<div class="w-24 h-1 bg-surface-container-high relative">
				<div class="h-full bg-primary-container w-[70%]"></div>
				<div class="absolute top-1/2 -translate-y-1/2 left-[70%] w-2 h-2 bg-white"></div>
			</div>
			<button class="text-on-surface-variant hover:text-on-surface" type="button"><span class="material-symbols-outlined text-[20px]">queue_music</span></button>
		</div>
	</footer>
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
		text-shadow: 0 0 12px rgba(204, 255, 0, 0.6), 0 0 30px rgba(204, 255, 0, 0.4), 0 0 60px rgba(204, 255, 0, 0.25);
		transition: text-shadow 0.3s ease, filter 0.3s ease;
	}
	.neon-glow-title:hover {
		text-shadow: 0 0 18px rgba(204, 255, 0, 0.9), 0 0 45px rgba(204, 255, 0, 0.7), 0 0 85px rgba(204, 255, 0, 0.5);
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
