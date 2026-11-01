<script>
	// Directorio de artistas destacados.
	const artistas = [
		{
			nombre: 'Michael Jackson',
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb997cc9a4aec335d46c9481fd'
		},
		{
			nombre: 'Bad Bunny',
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13'
		},
		{
			nombre: 'Lana Del Rey',
			imagen:
				'https://pj7whwrdkkgljlz7.public.blob.vercel-storage.com/0d6ddb2a-45f0-4827-b2ce-82f78310248b.webp'
		},
		{
			nombre: 'Billie Eilish',
			imagen: 'https://i.scdn.co/image/ab67616d00001e02ed317ec13d3de9e01fb99c9e'
		},
		{
			nombre: 'Radiohead',
			imagen: 'https://i.scdn.co/image/ab6761610000e5eb959527d2fabc9c64287e57b9'
		},
		{
			nombre: 'Rihanna',
			imagen: 'https://i.scdn.co/image/ab6761610000e5ebcb565a8e684e3be458d329ac'
		}
	];
</script>

<section class="flex flex-col gap-space-lg">
	<header class="flex items-end gap-3 border-b border-surface-container-high pb-3">
		<h1
			class="font-display-lg text-[clamp(3rem,9vw,7rem)] font-bold uppercase leading-[0.8] tracking-[-0.04em] text-primary"
		>
			ARTISTAS
		</h1>
	</header>

	<div class="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
		{#each artistas as artista}
			<article
				class="group relative aspect-[3/4] overflow-hidden border border-surface-container-high/70 bg-surface-container-lowest transition-colors duration-300 hover:border-primary-container/70"
			>
				<img
					class="absolute inset-0 h-full w-full object-cover contrast-125 saturate-[0.85] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
					src={artista.imagen}
					alt={`Retrato de ${artista.nombre}`}
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
				<div
					class="absolute inset-0 bg-primary-container/0 transition-colors duration-300 group-hover:bg-primary-container/10"
				></div>

				<div class="relative flex h-full flex-col justify-between p-space-md">
					<div class="flex items-center justify-end">
						<span
							class="h-1.5 w-1.5 bg-primary-container opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></span>
					</div>

					<h2
						class="font-headline-sm text-xl font-bold leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-primary-container lg:text-2xl"
					>
						{artista.nombre}
					</h2>
				</div>
			</article>
		{/each}
	</div>
</section>
