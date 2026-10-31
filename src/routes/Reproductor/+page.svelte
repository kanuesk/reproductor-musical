<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		CancionEstado,
		AlternarReproduccion,
		AlternarAleatorio,
		AlternarRepetir,
		BuscarProgreso,
		ObtenerProgresoActual
	} from '$lib/state/cancion.svelte.js';
	import { ObtenerAnalizador } from '$lib/state/audio-analizador.js';

	// Puente para que el script de Three.js pueda leer el analizador de audio.
	if (typeof window !== 'undefined') {
		(window as any).__reproductorObtenerAnalizador = ObtenerAnalizador;
	}

	const pista = $derived(CancionEstado.actual);
	const titulo = $derived(pista?.title ?? 'Sin reproducción');
	const artista = $derived(pista?.artist?.name ?? 'Selecciona una pista');
	const portada = $derived(
		pista?.album?.image ??
			pista?.artist?.image ??
			'https://lh3.googleusercontent.com/aida-public/AB6AXuC6qhbNZQZMbQUea0B8Y_eBiAz7pUnZIR82eLkddrXp2iQcFE0e0Bg972ppriJMsa_ibFmRdzVnoRFi61pMMGGuP2LVzli8BOaNhSzg4n45SFQ5VVhkqPT2oix7zKzzHGY22OJrxq-SIzwF70rgI29sI1bviaQAHkpFJFVir5231BKIxp-ukmlxFj8mGEbT6iVw-5vpdT4-ZdoLqc42wFiWT8PZijaBgqQsdBB1EBvzZyDuAQQ_8e8'
	);

	const progreso = $derived(CancionEstado.progreso);
	const duracion = $derived(CancionEstado.duracion);
	const tiempoActual = $derived((progreso / 100) * duracion);

	const TOTAL_BARRAS = 34;

	const patronReposo = Array.from({ length: TOTAL_BARRAS }, (_, i) => ({
		altura: 18 + Math.abs(Math.sin(i * 0.72)) * 54,
		nivel: 0.35
	}));

	let barras = $state(patronReposo.map((barra) => ({ ...barra })));
	let progresoVisual = $state(0);

	const barrasVisibles = $derived(
		barras.map((barra, i) => ({
			...barra,
			azul: ((i + 0.5) / TOTAL_BARRAS) * 100 <= progresoVisual
		}))
	);

	$effect(() => {
		let frame = 0;
		let datos = new Uint8Array(0);
		let modo = '';

		const actualizar = () => {
			const analizador = ObtenerAnalizador();

			if (CancionEstado.reproduciendo && analizador) {
				if (datos.length !== analizador.frequencyBinCount) {
					datos = new Uint8Array(analizador.frequencyBinCount);
				}

				analizador.getByteFrequencyData(datos);
				barras = Array.from({ length: TOTAL_BARRAS }, (_, i) => {
					const inicio = Math.floor(Math.pow(i / TOTAL_BARRAS, 1.7) * datos.length * 0.65);
					const fin = Math.floor(Math.pow((i + 1) / TOTAL_BARRAS, 1.7) * datos.length * 0.65);
					const limite = Math.max(inicio + 1, fin);
					let suma = 0;
					let cuentas = 0;

					for (let j = inicio; j < limite && j < datos.length; j++) {
						suma += datos[j];
						cuentas++;
					}

					const nivelCrudo = cuentas > 0 ? suma / cuentas / 255 : 0;
					const nivel = Math.min(1, Math.pow(nivelCrudo, 0.6) * 1.35);
					return { altura: 8 + nivel * 92, nivel };
				});
				modo = 'audio';
			} else if (modo !== 'reposo') {
				barras = patronReposo.map((barra) => ({ ...barra }));
				modo = 'reposo';
			}

			progresoVisual = ObtenerProgresoActual();
			frame = requestAnimationFrame(actualizar);
		};

		frame = requestAnimationFrame(actualizar);
		return () => cancelAnimationFrame(frame);
	});

	function formatearTiempo(segundos: number) {
		if (!Number.isFinite(segundos) || segundos <= 0) return '00:00';
		const minutos = Math.floor(segundos / 60);
		const resto = Math.floor(segundos % 60);
		return `${minutos.toString().padStart(2, '0')}:${resto.toString().padStart(2, '0')}`;
	}

	function actualizarProgreso(event: Event) {
		BuscarProgreso(Number((event.currentTarget as HTMLInputElement).value));
	}

	function volver() {
		void goto('/');
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
	<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>
</svelte:head>

<div class="dark w-full min-h-screen relative overflow-hidden flex flex-col" style="background: #131315;">

	<!-- MAIN IMMERSIVE 3D VIEWPORT -->
	<main class="relative w-full flex-1 overflow-hidden flex flex-col justify-between items-center px-4 md:px-12 py-4 z-10">
		<div class="absolute top-6 left-6 md:top-8 md:left-12 z-30 pointer-events-auto">
			<button aria-label="Volver" type="button" onclick={volver} class="flex items-center justify-center p-2 text-primary-container hover:text-white transition-all hover:scale-105 group cursor-pointer" style="color: #38bdf8;">
				<span class="material-symbols-outlined text-[28px]">arrow_back</span>
			</button>
		</div>

		<!-- Interactive Three.js 3D Background Canvas (confinado al marco del reproductor) -->
		<div class="absolute inset-0 w-full h-full bg-transparent z-0 pointer-events-none" style="display:block;">
			<div id="threejs-container-ANIMATION_73" style="width:100%;height:100%"></div>
			<script>
				(function iniciarAnimacion(intentos = 0) {
					const container = document.getElementById("threejs-container-ANIMATION_73");
					if (!container || !container.isConnected) return;

					// Espera a que Three.js y el marco del reproductor tengan tamaño real.
					if (typeof THREE === "undefined" || container.clientWidth === 0 || container.clientHeight === 0) {
						if (intentos < 200) {
							window.setTimeout(() => iniciarAnimacion(intentos + 1), 50);
						}
						return;
					}

					const width = container.clientWidth || window.innerWidth || 1200;
					const height = container.clientHeight || window.innerHeight || 800;

					const scene = new THREE.Scene();
					const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
					camera.position.z = 7;

					const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
					renderer.setSize(width, height);
					renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
					renderer.setClearColor(0x000000, 0);
					container.appendChild(renderer.domElement);

					const mainGroup = new THREE.Group();
					scene.add(mainGroup);

					const icosaGeo = new THREE.IcosahedronGeometry(2.35, 3);
					const wireframeGeo = new THREE.WireframeGeometry(icosaGeo);
					const wireframeMat = new THREE.LineBasicMaterial({
						color: 0xffffff,
						transparent: true,
						opacity: 0.75,
						linewidth: 1
					});
					const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
					mainGroup.add(wireframeMesh);

					const innerGeo = new THREE.IcosahedronGeometry(1.5, 2);
					const innerMat = new THREE.MeshBasicMaterial({
						color: 0x38bdf8,
						wireframe: true,
						transparent: true,
						opacity: 0.45
					});
					const innerMesh = new THREE.Mesh(innerGeo, innerMat);
					mainGroup.add(innerMesh);

					const pointsMat = new THREE.PointsMaterial({
						color: 0xb8c3ff,
						size: 0.055,
						transparent: true,
						opacity: 0.95
					});
					const points = new THREE.Points(icosaGeo, pointsMat);
					mainGroup.add(points);

					const ringGeo1 = new THREE.TorusGeometry(3.2, 0.015, 8, 120);
					const ringMat1 = new THREE.MeshBasicMaterial({
						color: 0x38bdf8,
						transparent: true,
						opacity: 0.65
					});
					const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
					ring1.rotation.x = Math.PI / 2.3;
					ring1.rotation.y = 0.2;
					mainGroup.add(ring1);

					const ringGeo2 = new THREE.TorusGeometry(3.6, 0.01, 8, 120);
					const ringMat2 = new THREE.MeshBasicMaterial({
						color: 0xffffff,
						transparent: true,
						opacity: 0.3
					});
					const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
					ring2.rotation.x = Math.PI / 1.7;
					ring2.rotation.z = 0.4;
					mainGroup.add(ring2);

					const particleCount = 280;
					const particleGeo = new THREE.BufferGeometry();
					const particlePositions = new Float32Array(particleCount * 3);
					for (let i = 0; i < particleCount * 3; i += 3) {
						particlePositions[i] = (Math.random() - 0.5) * 16;
						particlePositions[i + 1] = (Math.random() - 0.5) * 11;
						particlePositions[i + 2] = (Math.random() - 0.5) * 10;
					}
					particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
					const particleMat = new THREE.PointsMaterial({
						color: 0x888888,
						size: 0.035,
						transparent: true,
						opacity: 0.6
					});
					const particleField = new THREE.Points(particleGeo, particleMat);
					scene.add(particleField);

					// Datos del analizador para que el conjunto 3D responda al ritmo.
					let datosFrecuencia = null;
					let datosFrecuenciaAnterior = null;
					let ultimoFlujo = 0;
					let promedioLento = 0;
					let pulsoGraves = 0;
					let ultimoGolpe = 0;

					const obtenerAnalizadorAudio = () => {
						const puente = window.__reproductorObtenerAnalizador;
						return typeof puente === "function" ? puente() : null;
					};

					let mouseX = 0,
						mouseY = 0;
					let targetX = 0,
						targetY = 0;

					const onMouseMove = (event) => {
						const rect = container.getBoundingClientRect();
						const x = (event.clientX - rect.left) / rect.width - 0.5;
						const y = (event.clientY - rect.top) / rect.height - 0.5;
						targetX = x * 1.5;
						targetY = y * 1.2;
					};
					window.addEventListener("mousemove", onMouseMove);

					const onResize = () => {
						const w = container.clientWidth || window.innerWidth;
						const h = container.clientHeight || window.innerHeight;
						camera.aspect = w / h;
						camera.updateProjectionMatrix();
						renderer.setSize(w, h);
					};
					window.addEventListener("resize", onResize);

					// Mantiene el render sincronizado con el tamaño real del marco del reproductor.
					if (typeof ResizeObserver !== "undefined") {
						new ResizeObserver(onResize).observe(container);
					}
					requestAnimationFrame(onResize);

					const clock = new THREE.Clock();

					const animate = () => {
						if (!container.isConnected) return;
						requestAnimationFrame(animate);

						const deltaTiempo = Math.min(clock.getDelta(), 0.05);
						const elapsedTime = clock.elapsedTime;

						mouseX += (targetX - mouseX) * 0.05;
						mouseY += (targetY - mouseY) * 0.05;

						// Energía de graves: es la que marca los golpes del ritmo.
						const analizador = obtenerAnalizadorAudio();
						let energiaGraves = 0;
						ultimoFlujo = 0;

						if (analizador) {
							if (!datosFrecuencia || datosFrecuencia.length !== analizador.frequencyBinCount) {
								datosFrecuencia = new Uint8Array(analizador.frequencyBinCount);
								datosFrecuenciaAnterior = new Uint8Array(analizador.frequencyBinCount);
							}

							analizador.getByteFrequencyData(datosFrecuencia);
							let suma = 0;
							let cuentas = 0;
							let flujo = 0;
							const limite = Math.min(12, datosFrecuencia.length);

							for (let i = 1; i < limite; i++) {
								const diferencia = datosFrecuencia[i] - datosFrecuenciaAnterior[i];
								if (diferencia > 0) flujo += diferencia;
								suma += datosFrecuencia[i];
								cuentas++;
							}

							energiaGraves = cuentas > 0 ? suma / cuentas / 255 : 0;
							ultimoFlujo = cuentas > 0 ? flujo / cuentas / 255 : 0;
							datosFrecuenciaAnterior.set(datosFrecuencia);
						}

						// El promedio arranca con el nivel actual para no disparar en cada beat.
						if (promedioLento === 0 && energiaGraves > 0) {
							promedioLento = energiaGraves;
						}

						// Solo los picos claramente por encima del promedio activan el salto.
						const umbralPico = Math.max(0.3, promedioLento * 1.2);
						const hayGolpe =
							energiaGraves > umbralPico &&
							ultimoFlujo > 0.015 &&
							elapsedTime - ultimoGolpe > 1.4;

						if (hayGolpe) {
							pulsoGraves = Math.min(1, pulsoGraves + 0.5);
							ultimoGolpe = elapsedTime;
						}

						const factorPromedio = 1 - Math.exp(-deltaTiempo / 5);
						promedioLento += (energiaGraves - promedioLento) * factorPromedio;
						pulsoGraves = Math.max(0, pulsoGraves * Math.exp(-2.6 * deltaTiempo));

						mainGroup.rotation.y = elapsedTime * 0.18 + mouseX * 0.8;
						mainGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2 + mouseY * 0.6;
						mainGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

						// El grupo entero respira suavemente y salta solo en los picos.
						const respiracion = Math.sin(elapsedTime * 2.2) * 0.012;
						const escalaGrupo = 1 + respiracion + pulsoGraves * 0.07;
						mainGroup.scale.set(escalaGrupo, escalaGrupo, escalaGrupo);
						mainGroup.position.y = pulsoGraves * 0.12;

						ring1.rotation.z = elapsedTime * 0.3;
						ring2.rotation.z = -elapsedTime * 0.2;
						ring1.scale.setScalar(1 + pulsoGraves * 0.1);
						ring2.scale.setScalar(1 + pulsoGraves * 0.15);

						const pulse = 1 + Math.sin(elapsedTime * 2.8) * 0.03 + pulsoGraves * 0.12;
						innerMesh.scale.set(pulse, pulse, pulse);

						particleMat.size = 0.035 + pulsoGraves * 0.008;
						particleField.scale.setScalar(1 + pulsoGraves * 0.035);
						particleField.rotation.y = -elapsedTime * 0.025;

						renderer.render(scene, camera);
					};

					animate();
				})();
			</script>
		</div>

		<!-- Subtle Radial Glow & Vignette -->
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none z-[1]"></div>
		<div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none z-[1]"></div>

		<!-- CENTRAL IMMERSIVE ZONE: EXPANDED ARTWORK & MASSIVE TYPOGRAPHY -->
		<div class="w-full max-w-7xl flex flex-col items-center justify-center my-auto z-10 text-center pointer-events-none px-2">
			<!-- Expanded Prominent Vinyl / Holographic Art Container -->
			<div class="relative pointer-events-auto group mb-4">
				<div class="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-surface-container border-2 border-surface-container-high shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.15)] relative overflow-hidden transition-all duration-700 group-hover:border-primary-container/80 group-hover:scale-[1.02]">
					<img
						alt={`Portada de ${titulo}`}
						class="w-full h-full object-cover contrast-125 filter group-hover:scale-105 transition-transform duration-700"
						src={portada}
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
				</div>
				<span class="absolute -top-2 -left-2 text-[10px] font-mono text-primary-container/80">+</span>
				<span class="absolute -top-2 -right-2 text-[10px] font-mono text-primary-container/80">+</span>
				<span class="absolute -bottom-2 -left-2 text-[10px] font-mono text-primary-container/80">+</span>
				<span class="absolute -bottom-2 -right-2 text-[10px] font-mono text-primary-container/80">+</span>
			</div>
			<!-- MASSIVE EXPANDED TYPOGRAPHY SPANNING FULL PAGE WIDTH -->
			<div class="w-full flex flex-col items-center select-none">
				<h1 class="w-full font-display-lg text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] break-words">
					{titulo}
				</h1>
				<div class="w-full flex items-center justify-center gap-3 mt-3">
					<div class="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent to-primary-container/40"></div>
					<div class="font-mono text-sm sm:text-base md:text-xl font-bold uppercase tracking-[0.35em] text-primary-container drop-shadow-sm text-center break-words">
						{artista}
					</div>
					<div class="h-[1px] flex-1 max-w-xs bg-gradient-to-l from-transparent to-primary-container/40"></div>
				</div>
			</div>
		</div>

		<!-- BOTTOM ZONE: EXIT BUTTON (LEFT) AND COMPACT CONTROLS & WAVEFORM HUD (CENTER) -->
		<div class="w-full relative flex items-end justify-center z-20 mb-2">
			<!-- Exit / Back Button (Bottom Left) -->
			<div class="absolute left-0 bottom-0 pointer-events-auto">
				<button
					aria-label="Volver o salir del visualizador"
					class="group flex items-center gap-2.5 px-4 py-2.5 bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high hover:border-primary-container text-on-surface hover:text-black hover:bg-primary-container transition-all shadow-xl font-mono text-label-sm tracking-wider uppercase cursor-pointer"
					type="button"
					onclick={volver}
				>
					<span class="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
					<span class="">[ VOLVER / SALIR ]</span>
				</button>
			</div>
			<!-- Bottom Compact Controls & Waveform HUD -->
			<section class="w-full max-w-4xl bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high/80 p-4 md:p-5 relative flex flex-col items-center justify-center shadow-2xl">
				<!-- Audio Waveform Visualizer -->
				<div class="w-full relative">
					<div
						class="w-full h-12 md:h-16 flex items-end gap-[3px] p-1 overflow-hidden bg-transparent"
						aria-hidden="true"
					>
						{#each barrasVisibles as barra}
							<div
								class="flex-1 min-w-0 transition-colors duration-150 {barra.azul
									? 'bg-primary-container'
									: 'bg-surface-container-high'}"
								style={`height: ${barra.altura}%; opacity: ${barra.azul
									? 0.45 + barra.nivel * 0.55
									: 0.65}; ${barra.azul && barra.nivel > 0.55
									? 'box-shadow: 0 0 8px rgba(56,189,248,0.8);'
									: ''}`}
							></div>
						{/each}
						<div
							class="absolute inset-y-0 w-[2px] bg-white pointer-events-none"
							style={`left: calc(${progresoVisual}% - 1px);`}
						>
							<div class="absolute -top-1 -left-[3px] w-2 h-2 bg-primary-container rotate-45 shadow-[0_0_6px_#38bdf8]"></div>
						</div>
					</div>
					<!-- Time Scrubber -->
					<div class="mt-2 flex items-center justify-between font-mono text-label-md">
						<span class="text-primary-container font-bold tracking-wider">{formatearTiempo(tiempoActual)}</span>
						<div class="flex-1 mx-space-sm relative h-1.5 bg-surface-container-high flex items-center">
							<div
								class="h-full bg-primary-container shadow-[0_0_8px_rgba(56,189,248,0.5)]"
								style={`width: ${progreso}%`}
							></div>
							<div
								class="absolute w-3 h-3 bg-white border border-black shadow pointer-events-none"
								style={`left: calc(${progreso}% - 0.375rem)`}
							></div>
							<input
								class="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-6 opacity-0 cursor-pointer disabled:cursor-not-allowed"
								type="range"
								min="0"
								max="100"
								step="0.1"
								value={progreso}
								oninput={actualizarProgreso}
								aria-label="Progreso de la canción"
								disabled={!pista}
							/>
						</div>
						<span class="text-on-surface-variant tracking-wider">{formatearTiempo(duracion)}</span>
					</div>
				</div>
				<!-- Transport Controls -->
				<div class="flex items-center justify-center gap-space-sm mt-3">
					<button
						aria-label="Aleatorio"
						aria-pressed={CancionEstado.aleatorio}
						class="p-2.5 bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer {CancionEstado.aleatorio
							? 'text-primary-container'
							: 'text-on-surface-variant hover:text-on-surface'}"
						type="button"
						onclick={AlternarAleatorio}
					>
						<span class="material-symbols-outlined text-[20px]">shuffle</span>
					</button>
					<button aria-label="Pista anterior" class="p-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" type="button">
						<span class="material-symbols-outlined text-[22px]">skip_previous</span>
					</button>
					<button
						aria-label={CancionEstado.reproduciendo ? 'Pausar' : 'Reproducir'}
						class="px-space-lg py-2.5 bg-primary-container text-on-primary font-label-lg text-label-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
						type="button"
						onclick={AlternarReproduccion}
						disabled={!pista}
					>
						<span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;"
							>{CancionEstado.reproduciendo ? 'pause' : 'play_arrow'}</span
						>[ {CancionEstado.reproduciendo ? 'PAUSAR' : 'REPRODUCIR'} ]
					</button>
					<button aria-label="Pista siguiente" class="p-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" type="button">
						<span class="material-symbols-outlined text-[22px]">skip_next</span>
					</button>
					<button
						aria-label="Bucle / Repetir"
						aria-pressed={CancionEstado.repetir}
						class="p-2.5 bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer {CancionEstado.repetir
							? 'text-primary-container'
							: 'text-on-surface-variant hover:text-on-surface'}"
						type="button"
						onclick={AlternarRepetir}
					>
						<span class="material-symbols-outlined text-[20px]">repeat</span>
					</button>
				</div>
			</section>
		</div>
	</main>
</div>
