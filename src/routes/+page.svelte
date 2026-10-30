<script>
	import axios from "axios";
    import CardSound from "../lib/components/CardSound.svelte";


    const { data } = $props()
  
</script>



<!-- HEADER / TECHNICAL DASHBOARD STATUS -->
<section class="flex flex-col gap-3 p-space-md bg-surface-container-lowest border border-surface-container-high/60 relative overflow-hidden">
	<div class="flex items-center gap-2 overflow-x-auto pb-1 select-none">
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">HOUSE</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">POP</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">Rock</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">Vallenato</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">Reggaeton</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">Salsa</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">Rock Alternativo</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">
			<span class="">Metalcore</span>
		</button>
		<button class="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high hover:border-[#38bdf8]/60 text-on-surface hover:text-[#38bdf8] border border-transparent font-headline-sm text-label-md uppercase font-bold tracking-wider transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5" type="button">

			<span class="">Electronica</span>
		</button>
	</div>
</section>

<!-- SECTION 1: RECENTLY PLAYED -->
<section class="flex flex-col gap-space-md mt-8">
	<div class="flex items-center justify-between pb-space-xs">
		<div class="flex items-baseline gap-space-sm">
			<h2 class="font-headline-md text-headline-md uppercase font-bold tracking-tight text-[#38bdf8]">ESCUCHADOS RECIENTEMENTE</h2>
		</div>
		<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary-container uppercase tracking-wider transition-colors flex items-center gap-1 group" href="#">
			<span class="">VER TODO</span>
			<span class="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
		</a>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">

			{#each data.tracks as track}
			   <CardSound {track}></CardSound>
			   
			{/each}
		<!-- Card 1 -->
		<article class="group bg-surface-container-lowest flex flex-col p-space-sm hover:bg-surface-container-low transition-all duration-200">
			<div class="relative w-full aspect-square overflow-hidden bg-surface-container-high">
				<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="Dark aesthetic album cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwisQDby9e64YhZQITfcBWjVEoZw5w6No1cUPb4d7A3CAIlzqhb2esgb5g&s=10" />

				<button aria-label="Reproducir pista" class="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-[#38bdf8] text-black flex items-center justify-center shadow-lg shadow-[#38bdf8]/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 cursor-pointer" type="button">
					<svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
				</button>
			</div>
			<div class="flex flex-col gap-1 pt-space-sm pb-1">
				<div class="flex items-center justify-between gap-1">
					<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">World Hold On</h3>
					<button type="button" aria-label="Favorito" class="p-1 text-on-surface-variant hover:text-[#38bdf8] transition-colors duration-200 cursor-pointer shrink-0 flex items-center justify-center hover:scale-110">
						<svg class="w-6 h-6 transition-transform active:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
					</button>
				</div>
				<p class="font-label-md text-label-md text-on-surface-variant truncate">Bob Sinclar</p>
			</div>
		</article>
		<!-- Card 2 -->
		<article class="group bg-surface-container-lowest flex flex-col p-space-sm hover:bg-surface-container-low transition-all duration-200">
			<div class="relative w-full aspect-square overflow-hidden bg-surface-container-high">
				<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="Cassette tape" src="https://cdn-images.dzcdn.net/images/cover/64efde12017fb5ed7bdc3d429c175e39/0x1900-000000-80-0-0.jpg" />

				<button aria-label="Reproducir pista" class="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-[#38bdf8] text-black flex items-center justify-center shadow-lg shadow-[#38bdf8]/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 cursor-pointer" type="button">
					<svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
				</button>
			</div>
			<div class="flex flex-col gap-1 pt-space-sm pb-1">
				<div class="flex items-center justify-between gap-1">
					<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">I Could Be the One (Nicktim)</h3>
					<button type="button" aria-label="Favorito" class="p-1 text-on-surface-variant hover:text-[#38bdf8] transition-colors duration-200 cursor-pointer shrink-0 flex items-center justify-center hover:scale-110">
						<svg class="w-6 h-6 transition-transform active:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
					</button>
				</div>
				<p class="font-label-md text-label-md text-on-surface-variant truncate">Avicii</p>
			</div>
		</article>
		<!-- Card 3 -->
		<article class="group bg-surface-container-lowest flex flex-col p-space-sm hover:bg-surface-container-low transition-all duration-200">
			<div class="relative w-full aspect-square overflow-hidden bg-surface-container-high">
				<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="Industrial album" src="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" />

				<button aria-label="Reproducir pista" class="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-[#38bdf8] text-black flex items-center justify-center shadow-lg shadow-[#38bdf8]/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 cursor-pointer" type="button">
					<svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
				</button>
			</div>
			<div class="flex flex-col gap-1 pt-space-sm pb-1">
				<div class="flex items-center justify-between gap-1">
					<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">Smooth Criminal</h3>
					<button type="button" aria-label="Favorito" class="p-1 text-on-surface-variant hover:text-[#38bdf8] transition-colors duration-200 cursor-pointer shrink-0 flex items-center justify-center hover:scale-110">
						<svg class="w-6 h-6 transition-transform active:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
					</button>
				</div>
				<p class="font-label-md text-label-md text-on-surface-variant truncate">Michael Jackson</p>
			</div>
		</article>
		<!-- Card 4 -->
		<article class="group bg-surface-container-lowest flex flex-col p-space-sm hover:bg-surface-container-low transition-all duration-200">
			<div class="relative w-full aspect-square overflow-hidden bg-surface-container-high">
				<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="Underground dark ambient" src="https://i.scdn.co/image/ab67616d0000b273932fe6d260177091a0e115ba" />

				<button aria-label="Reproducir pista" class="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-[#38bdf8] text-black flex items-center justify-center shadow-lg shadow-[#38bdf8]/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 cursor-pointer" type="button">
					<svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
				</button>
			</div>
			<div class="flex flex-col gap-1 pt-space-sm pb-1">
				<div class="flex items-center justify-between gap-1">
					<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">¿Dónde es el after?</h3>
					<button type="button" aria-label="Favorito" class="p-1 text-on-surface-variant hover:text-[#38bdf8] transition-colors duration-200 cursor-pointer shrink-0 flex items-center justify-center hover:scale-110">
						<svg class="w-6 h-6 transition-transform active:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
					</button>
				</div>
				<p class="font-label-md text-label-md text-on-surface-variant truncate">Rawayana</p>
			</div>
		</article>
	</div>
</section>

<!-- SECTION 2: PLAYLISTS -->
<section class="flex flex-col gap-space-md mt-8">
	<div class="flex items-center justify-between pb-space-xs">
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
				<div class="w-24 h-24 bg-surface-container shrink-0 relative overflow-hidden">
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
				<div class="w-24 h-24 bg-surface-container shrink-0 relative overflow-hidden">
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
				<div class="w-24 h-24 bg-surface-container shrink-0 relative overflow-hidden">
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
				<div class="w-24 h-24 bg-surface-container shrink-0 relative overflow-hidden">
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
