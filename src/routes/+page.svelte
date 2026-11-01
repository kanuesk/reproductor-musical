<script>
	import axios from "axios";
    import CardSound from "../lib/components/CardSound.svelte";


    const { data } = $props()
  
</script>




<!-- SECTION 1: RECENTLY PLAYED -->
<section class="flex flex-col gap-space-md mt-2">
	<div class="flex flex-wrap items-center justify-between gap-2 pb-space-xs">
		<div class="flex items-baseline gap-space-sm">
			<h2 class="font-headline-md text-headline-md uppercase font-bold tracking-tight text-[#38bdf8]">ESCUCHADOS RECIENTEMENTE</h2>
		</div>
		<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary-container uppercase tracking-wider transition-colors flex items-center gap-1 group" href="#">
			<span class="">VER TODO</span>
			<span class="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
		</a>
	</div>
	<div class="barra-deslizante flex gap-space-md overflow-x-auto pb-4 snap-x snap-mandatory overscroll-x-contain">

			{#each data.tracks as track}
			   <div class="w-40 sm:w-48 lg:w-52 shrink-0 snap-start">
			   	   <CardSound {track}></CardSound>
			   </div>
			{/each}
	</div>
</section>

<!-- SECTION 2: PLAYLISTS -->
<section class="flex flex-col gap-space-md mt-8">
	<div class="flex flex-wrap items-center justify-between gap-2 pb-space-xs">
		<div class="flex items-baseline gap-space-sm">
			<h2 class="font-headline-md text-headline-md uppercase font-bold tracking-tight text-[#38bdf8]">PLAYLISTS</h2>
		</div>
		<button class="px-3 py-1.5 bg-primary-container hover:bg-surface-tint text-on-primary font-label-md text-label-md font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="material-symbols-outlined text-[16px]">add_box</span>
			<span class="">CREAR NUEVA +</span>
		</button>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
		<!-- Playlist 1 -->
		<article class="p-space-md bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 flex flex-col justify-between gap-space-md group">
			<div class="flex gap-space-md items-start">
				<div class="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container shrink-0 relative overflow-hidden">
					<div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style="background-image: url('https://i1.sndcdn.com/artworks-CYLuLi5HpbuHNGVD-H5jnhw-t500x500.jpg')"></div>
					<div class="absolute inset-0 bg-primary-container/10 mix-blend-color"></div>
				</div>
				<div class="flex flex-col gap-1 min-w-0 flex-1">
					<h3 class="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight truncate group-hover:text-primary-container transition-colors">PARA BAILAR Y CANTAR</h3>
					<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">42 PISTAS // DURACIÓN: 03:48:12 // SÍNTESIS ANALÓGICA DIRECTA</p>
				</div>
			</div>
			<div class="flex items-center pt-space-xs bg-surface-container-lowest/50 justify-end">
				<button class="px-3 py-1 bg-surface-container hover:bg-primary-container hover:text-on-primary font-label-sm text-label-sm uppercase font-semibold transition-colors text-[#38bdf8]" type="button">[ CARGAR EN COLA ]</button>
			</div>
		</article>
		<!-- Playlist 2 -->
		<article class="p-space-md bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 flex flex-col justify-between gap-space-md group">
			<div class="flex gap-space-md items-start">
				<div class="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container shrink-0 relative overflow-hidden">
					<div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style="background-image: url('https://hips.hearstapps.com/hmg-prod/images/mejores-canciones-90s-heroes-silencio-1622141746.jpg')"></div>
					<div class="absolute inset-0 bg-primary-container/10 mix-blend-color"></div>
				</div>
				<div class="flex flex-col gap-1 min-w-0 flex-1">
					<h3 class="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight truncate group-hover:text-primary-container transition-colors">CLASICOS DE LOS 90's</h3>
					<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">28 PISTAS // DURACIÓN: 02:15:40 // FRECUENCIAS SUB-GRAVES</p>
				</div>
			</div>
			<div class="flex items-center pt-space-xs bg-surface-container-lowest/50 justify-end">
				<button class="px-3 py-1 bg-surface-container hover:bg-primary-container hover:text-on-primary font-label-sm text-label-sm uppercase font-semibold transition-colors text-[#38bdf8]" type="button">[ CARGAR EN COLA ]</button>
			</div>
		</article>
		<!-- Playlist 3 -->
		<article class="p-space-md bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 flex flex-col justify-between gap-space-md group">
			<div class="flex gap-space-md items-start">
				<div class="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container shrink-0 relative overflow-hidden">
					<div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style="background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm9b3z3Q6YQxy1IzoewmLlg0Y5N_bUgpKeXhecCWW-iGTuda0zMJrqjRyd&s=10')"></div>
					<div class="absolute inset-0 bg-primary-container/10 mix-blend-color"></div>
				</div>
				<div class="flex flex-col gap-1 min-w-0 flex-1">
					<h3 class="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight truncate group-hover:text-primary-container transition-colors">AMBIENTE PARA MANEJAR</h3>
					<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">35 PISTAS // DURACIÓN: 02:50:18 // MICROTONAL &amp; DECAY</p>
				</div>
			</div>
			<div class="flex items-center pt-space-xs bg-surface-container-lowest/50 justify-end">
				<button class="px-3 py-1 bg-surface-container hover:bg-primary-container hover:text-on-primary font-label-sm text-label-sm uppercase font-semibold transition-colors text-[#38bdf8]" type="button">[ CARGAR EN COLA ]</button>
			</div>
		</article>
		<!-- Playlist 4 -->
		<article class="p-space-md bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 flex flex-col justify-between gap-space-md group">
			<div class="flex gap-space-md items-start">
				<div class="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container shrink-0 relative overflow-hidden">
					<div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAi71x-DxCmN_YeYa0-25XiK0Rb0QIAZMAXh1B682qHARwOt0vdM0QAc_XrMZhxG6uKd2SgPZOKMOIJj7sWLCe78sairfdpBSaR3ip9SgIgjeOGcxcl7mCnUJ1agVldUwBVq5WfA-mmZevFHvFVwSh2MQWtq1LeCe6KPq-ikrp9LWbMM0pwStM1ki4oktAlROOlRomZmO1V6bYN_xw__zQ6iKEY77vAVPvazpXBjw')"></div>
					<div class="absolute inset-0 bg-primary-container/10 mix-blend-color"></div>
				</div>
				<div class="flex flex-col gap-1 min-w-0 flex-1">
					<h3 class="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight truncate group-hover:text-primary-container transition-colors">LOFI HIP-HOP</h3>
					<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">19 PISTAS // DURACIÓN: 01:32:05 // C-60 CASSETTE CASING</p>
				</div>
			</div>
			<div class="flex items-center pt-space-xs bg-surface-container-lowest/50 justify-end">
				<button class="px-3 py-1 bg-surface-container hover:bg-primary-container hover:text-on-primary font-label-sm text-label-sm uppercase font-semibold transition-colors text-[#38bdf8]" type="button">[ CARGAR EN COLA ]</button>
			</div>
		</article>
	</div>
</section>

<!-- SECTION 3: FAVORITE ARTISTS -->
<section class="flex flex-col gap-space-md mt-8">
	<div class="flex items-center justify-between pb-space-xs">
		<div class="flex items-baseline gap-space-sm">
			<h2 class="font-headline-md text-headline-md uppercase font-bold tracking-tight text-[#38bdf8]">TUS ARTISTAS FAVORITOS</h2>
		</div>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-md">
		<!-- Artist 1 -->
		<article class="p-space-md bg-surface-container-lowest flex flex-col items-center text-center gap-space-sm group hover:bg-surface-container-low transition-colors duration-200">
			<div class="relative w-24 h-24 rounded-full overflow-hidden p-1 bg-surface-container-high group-hover:bg-primary-container transition-colors duration-300">
				<div class="w-full h-full rounded-full overflow-hidden bg-surface-dim">
					<img class="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-transform duration-300" data-alt="Artist" src="https://i.scdn.co/image/ab6761610000e5eb997cc9a4aec335d46c9481fd" />
				</div>
			</div>
			<div class="flex flex-col gap-0.5 w-full">
				<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">Michael Jackson</h3>
			</div>
			<button class="mt-2 w-full py-1.5 bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary font-label-sm text-label-sm uppercase font-semibold tracking-wider transition-colors duration-200" type="button">IR AL ARTISTA</button>
		</article>
		<!-- Artist 2 -->
		<article class="p-space-md bg-surface-container-lowest flex flex-col items-center text-center gap-space-sm group hover:bg-surface-container-low transition-colors duration-200">
			<div class="relative w-24 h-24 rounded-full overflow-hidden p-1 bg-surface-container-high group-hover:bg-primary-container transition-colors duration-300">
				<div class="w-full h-full rounded-full overflow-hidden bg-surface-dim">
					<img class="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-transform duration-300" data-alt="Artist" src="https://i.scdn.co/image/ab67616d00001e02ed317ec13d3de9e01fb99c9e" />
				</div>
			</div>
			<div class="flex flex-col gap-0.5 w-full">
				<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">Billie Eilish</h3>
			</div>
			<button class="mt-2 w-full py-1.5 bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary font-label-sm text-label-sm uppercase font-semibold tracking-wider transition-colors duration-200" type="button">IR AL ARTISTA</button>
		</article>
		<!-- Artist 3 -->
		<article class="p-space-md bg-surface-container-lowest flex flex-col items-center text-center gap-space-sm group hover:bg-surface-container-low transition-colors duration-200">
			<div class="relative w-24 h-24 rounded-full overflow-hidden p-1 bg-surface-container-high group-hover:bg-primary-container transition-colors duration-300">
				<div class="w-full h-full rounded-full overflow-hidden bg-surface-dim">
					<img class="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-transform duration-300" data-alt="Artist" src="https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13" />
				</div>
			</div>
			<div class="flex flex-col gap-0.5 w-full">
				<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">Bad Bunny</h3>
			</div>
			<button class="mt-2 w-full py-1.5 bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary font-label-sm text-label-sm uppercase font-semibold tracking-wider transition-colors duration-200" type="button">IR AL ARTISTA</button>
		</article>
		<!-- Artist 4 -->
		<article class="p-space-md bg-surface-container-lowest flex flex-col items-center text-center gap-space-sm group hover:bg-surface-container-low transition-colors duration-200">
			<div class="relative w-24 h-24 rounded-full overflow-hidden p-1 bg-surface-container-high group-hover:bg-primary-container transition-colors duration-300">
				<div class="w-full h-full rounded-full overflow-hidden bg-surface-dim">
					<img class="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-transform duration-300" data-alt="Artist" src="https://i.scdn.co/image/ab6761610000e5ebcb565a8e684e3be458d329ac" />
				</div>
			</div>
			<div class="flex flex-col gap-0.5 w-full">
				<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">Rihanna</h3>
			</div>
			<button class="mt-2 w-full py-1.5 bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary font-label-sm text-label-sm uppercase font-semibold tracking-wider transition-colors duration-200" type="button">IR AL ARTISTA</button>
		</article>
		<!-- Artist 5 -->
		<article class="p-space-md bg-surface-container-lowest flex flex-col items-center text-center gap-space-sm group hover:bg-surface-container-low transition-colors duration-200">
			<div class="relative w-24 h-24 rounded-full overflow-hidden p-1 bg-surface-container-high group-hover:bg-primary-container transition-colors duration-300">
				<div class="w-full h-full rounded-full overflow-hidden bg-surface-dim">
					<img class="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-transform duration-300" data-alt="Artist" src="https://i.scdn.co/image/ab6761610000e5eb959527d2fabc9c64287e57b9" />
				</div>
			</div>
			<div class="flex flex-col gap-0.5 w-full">
				<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">Radiohead</h3>
			</div>
			<button class="mt-2 w-full py-1.5 bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-primary font-label-sm text-label-sm uppercase font-semibold tracking-wider transition-colors duration-200" type="button">IR AL ARTISTA</button>
		</article>
	</div>
</section>

<style>
	/* Barra de desplazamiento horizontal visible para escritorio. */
	.barra-deslizante {
		scrollbar-width: thin;
		scrollbar-color: #38bdf8 #2a2a2c;
	}

	.barra-deslizante::-webkit-scrollbar {
		display: block;
		height: 8px;
	}

	.barra-deslizante::-webkit-scrollbar-track {
		background: #2a2a2c;
		border-radius: 0;
	}

	.barra-deslizante::-webkit-scrollbar-thumb {
		background: #38bdf8;
		border-radius: 0;
	}

	.barra-deslizante::-webkit-scrollbar-thumb:hover {
		background: #7dd3fc;
	}

	/* En pantallas táctiles se mantiene oculta (se desliza con el dedo). */
	@media (pointer: coarse) {
		.barra-deslizante {
			scrollbar-width: none;
		}

		.barra-deslizante::-webkit-scrollbar {
			display: none;
		}
	}
</style>
