		<script>
            import { ActualizarCancionActual } from '$lib/state/cancion.svelte.js';

            const props = $props()
        </script>
        
        
        <article class="group bg-surface-container-lowest flex flex-col p-space-sm hover:bg-surface-container-low transition-all duration-200">
			<div class="relative w-full aspect-square overflow-hidden bg-surface-container-high">
				<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="Dark aesthetic album cover" src={props.track.artist.image} />

				<button aria-label="Reproducir pista" onclick={() => ActualizarCancionActual(props.track)} class="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-[#38bdf8] text-black flex items-center justify-center shadow-lg shadow-[#38bdf8]/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-110 cursor-pointer" type="button">
					<svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
				</button>
			</div>
			<div class="flex flex-col gap-1 pt-space-sm pb-1">
				<div class="flex items-center justify-between gap-1">
					<h3 class="font-headline-sm text-headline-sm text-primary font-bold truncate group-hover:text-primary-container transition-colors">{props.track.title}</h3>
					<button type="button" aria-label="Favorito" class="p-1 text-on-surface-variant hover:text-[#38bdf8] transition-colors duration-200 cursor-pointer shrink-0 flex items-center justify-center hover:scale-110">
						<svg class="w-6 h-6 transition-transform active:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
					</button>
				</div>
				<p class="font-label-md text-label-md text-on-surface-variant truncate">{props.track.artist.name}</p>
			</div>
		</article>