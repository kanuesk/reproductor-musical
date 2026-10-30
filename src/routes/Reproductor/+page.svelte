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

	<!-- HEADER -->
	<header
		class="w-full h-14 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-high px-space-lg flex items-center justify-between z-30 flex-shrink-0"
	>
		<div class="flex items-center gap-6">
			<div class="flex items-center gap-2">
				<span class="material-symbols-outlined text-primary-container text-[24px]">graphic_eq</span>
				<span class="font-display-lg text-headline-sm font-bold tracking-wider text-white uppercase">KINETIC</span>
			</div>
		</div>
		<div class="flex-1 max-w-md mx-6">
			<div class="relative flex items-center">
				<span class="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 pointer-events-none">search</span>
				<input
					class="w-full bg-surface-container-low/80 border border-surface-container-high text-on-surface text-body-sm font-mono pl-9 pr-3 py-1.5 focus:outline-none focus:border-primary-container placeholder:text-on-surface-variant/60 uppercase"
					placeholder="BUSCAR PISTAS, ARTISTAS, ARCHIVOS..."
					type="text"
				/>
			</div>
		</div>
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-2 px-2 py-1 bg-surface-container border border-surface-container-high">
				<span class="w-2 h-2 rounded-full bg-primary-container animate-pulse-subtle"></span>
			</div>
			<button aria-label="Perfil de usuario" class="flex items-center justify-center w-8 h-8 bg-surface-container hover:bg-surface-container-high border border-surface-container-high text-on-surface transition-colors">
				<span class="material-symbols-outlined text-[18px]">person</span>
			</button>
		</div>
	</header>

	<!-- MAIN IMMERSIVE 3D VIEWPORT -->
	<main class="relative w-full flex-1 overflow-hidden flex flex-col justify-between items-center px-4 md:px-12 py-4 z-10">
		<div class="absolute top-6 left-6 md:top-8 md:left-12 z-30 pointer-events-auto">
			<button aria-label="Volver" type="button" class="flex items-center justify-center p-2 text-primary-container hover:text-white transition-all hover:scale-105 group" style="color: #38bdf8;">
				<span class="material-symbols-outlined text-[28px]">arrow_back</span>
			</button>
		</div>

		<!-- Interactive Three.js 3D Background Canvas -->
		<div class="fixed inset-0 w-full h-full bg-transparent z-0 pointer-events-none" style="display:block;">
			<div id="threejs-container-ANIMATION_73" style="width:100%;height:100%"></div>
			<script>
				(function () {
					const container = document.getElementById("threejs-container-ANIMATION_73");
					if (!container) return;
					const devicePixelRatio = window.devicePixelRatio || 1;
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
						color: 0xccff00,
						wireframe: true,
						transparent: true,
						opacity: 0.45
					});
					const innerMesh = new THREE.Mesh(innerGeo, innerMat);
					mainGroup.add(innerMesh);

					const pointsMat = new THREE.PointsMaterial({
						color: 0xccff00,
						size: 0.055,
						transparent: true,
						opacity: 0.95
					});
					const points = new THREE.Points(icosaGeo, pointsMat);
					mainGroup.add(points);

					const ringGeo1 = new THREE.TorusGeometry(3.2, 0.015, 8, 120);
					const ringMat1 = new THREE.MeshBasicMaterial({
						color: 0xccff00,
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

					const clock = new THREE.Clock();

					const animate = () => {
						requestAnimationFrame(animate);
						const elapsedTime = clock.getElapsedTime();

						mouseX += (targetX - mouseX) * 0.05;
						mouseY += (targetY - mouseY) * 0.05;

						mainGroup.rotation.y = elapsedTime * 0.18 + mouseX * 0.8;
						mainGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2 + mouseY * 0.6;
						mainGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

						ring1.rotation.z = elapsedTime * 0.3;
						ring2.rotation.z = -elapsedTime * 0.2;

						const pulse = 1 + Math.sin(elapsedTime * 2.8) * 0.04;
						innerMesh.scale.set(pulse, pulse, pulse);

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

		<!-- TOP TECHNICAL BREADCRUMB & BROAD METADATA -->
		<div class="w-full flex justify-end items-center z-10 pt-2 border-b border-surface-container-high/40 pb-3">
			<div class="flex items-center gap-3">
				<span class="font-mono text-label-sm uppercase font-bold text-primary-container tracking-[0.25em] bg-primary-container/10 px-2.5 py-1 border border-primary-container/30">[ PISTA ACTUAL // CORTE 01 ]</span>
			</div>
		</div>

		<!-- CENTRAL IMMERSIVE ZONE: EXPANDED ARTWORK & MASSIVE TYPOGRAPHY -->
		<div class="w-full max-w-7xl flex flex-col items-center justify-center my-auto z-10 text-center pointer-events-none px-2">
			<!-- Expanded Prominent Vinyl / Holographic Art Container -->
			<div class="relative pointer-events-auto group mb-4">
				<div class="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-surface-container border-2 border-surface-container-high shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.15)] relative overflow-hidden transition-all duration-700 group-hover:border-primary-container/80 group-hover:scale-[1.02]">
					<img
						alt="HELIX UNIT // CYBERNETIC VOID"
						class="w-full h-full object-cover contrast-125 filter group-hover:scale-105 transition-transform duration-700"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6qhbNZQZMbQUea0B8Y_eBiAz7pUnZIR82eLkddrXp2iQcFE0e0Bg972ppriJMsa_ibFmRdzVnoRFi61pMMGGuP2LVzli8BOaNhSzg4n45SFQ5VVhkqPT2oix7zKzzHGY22OJrxq-SIzwF70rgI29sI1bviaQAHkpFJFVir5231BKIxp-ukmlxFj8mGEbT6iVw-5vpdT4-ZdoLqc42wFiWT8PZijaBgqQsdBB1EBvzZyDuAQQ_8e8"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
					<div class="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-1 bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high text-on-surface-variant font-mono text-[10px]">
						<span class="flex items-center gap-1.5 text-primary-container font-semibold"><span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>DIRECT STREAM</span>
						<span class="">24-BIT // 96kHz FLAC</span>
					</div>
				</div>
				<span class="absolute -top-2 -left-2 text-[10px] font-mono text-primary-container/80">+</span>
				<span class="absolute -top-2 -right-2 text-[10px] font-mono text-primary-container/80">+</span>
				<span class="absolute -bottom-2 -left-2 text-[10px] font-mono text-primary-container/80">+</span>
				<span class="absolute -bottom-2 -right-2 text-[10px] font-mono text-primary-container/80">+</span>
			</div>
			<!-- MASSIVE EXPANDED TYPOGRAPHY SPANNING FULL PAGE WIDTH -->
			<div class="w-full flex flex-col items-center select-none">
				<h1 class="w-full font-display-lg text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
					SYNAPSE OVERLOAD
				</h1>
				<div class="w-full flex items-center justify-center gap-3 mt-3">
					<div class="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent to-primary-container/40"></div>
					<div class="font-mono text-sm sm:text-base md:text-xl font-bold uppercase tracking-[0.35em] text-primary-container drop-shadow-sm whitespace-nowrap">
						ARCHIVO DEL OLVIDO <span class="text-white/40 font-light mx-2">//</span>
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
					class="group flex items-center gap-2.5 px-4 py-2.5 bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high hover:border-primary-container text-on-surface hover:text-black hover:bg-primary-container transition-all shadow-xl font-mono text-label-sm tracking-wider uppercase"
					type="button"
				>
					<span class="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
					<span class="">[ VOLVER / SALIR ]</span>
				</button>
			</div>
			<!-- Bottom Compact Controls & Waveform HUD -->
			<section class="w-full max-w-4xl bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high/80 p-4 md:p-5 relative flex flex-col items-center justify-center shadow-2xl">
				<!-- Audio Waveform Visualizer -->
				<div class="w-full relative">
					<div class="w-full h-12 md:h-16 flex items-end gap-[3px] p-1 overflow-hidden bg-transparent">
						<div class="flex-1 bg-primary-container/40 h-[35%]"></div>
						<div class="flex-1 bg-primary-container/50 h-[48%]"></div>
						<div class="flex-1 bg-primary-container/60 h-[62%]"></div>
						<div class="flex-1 bg-primary-container/70 h-[78%]"></div>
						<div class="flex-1 bg-primary-container/85 h-[92%]"></div>
						<div class="flex-1 bg-primary-container h-[100%] shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
						<div class="flex-1 bg-primary-container h-[85%]"></div>
						<div class="flex-1 bg-primary-container/90 h-[70%]"></div>
						<div class="flex-1 bg-primary-container/80 h-[58%]"></div>
						<div class="flex-1 bg-primary-container/70 h-[82%]"></div>
						<div class="flex-1 bg-primary-container h-[95%] shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
						<div class="flex-1 bg-primary-container h-[75%]"></div>
						<div class="flex-1 bg-primary-container/90 h-[60%]"></div>
						<div class="flex-1 bg-primary-container/70 h-[44%]"></div>
						<div class="flex-1 bg-primary-container/60 h-[52%]"></div>
						<div class="flex-1 bg-primary-container/75 h-[68%]"></div>
						<div class="flex-1 bg-primary-container/90 h-[84%]"></div>
						<div class="flex-1 bg-primary-container h-[90%] shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
						<div class="flex-1 bg-primary-container/85 h-[72%]"></div>
						<div class="flex-1 bg-primary-container/70 h-[55%]"></div>
						<div class="w-[2px] h-full bg-white relative mx-0.5">
							<div class="absolute -top-1 -left-[3px] w-2 h-2 bg-primary-container rotate-45 shadow-[0_0_6px_#38bdf8]"></div>
						</div>
						<div class="flex-1 bg-surface-container-high h-[40%]"></div>
						<div class="flex-1 bg-surface-container-high h-[50%]"></div>
						<div class="flex-1 bg-surface-container-high h-[64%]"></div>
						<div class="flex-1 bg-surface-container-high h-[45%]"></div>
						<div class="flex-1 bg-surface-container-high h-[58%]"></div>
						<div class="flex-1 bg-surface-container-high h-[76%]"></div>
						<div class="flex-1 bg-surface-container-high h-[62%]"></div>
						<div class="flex-1 bg-surface-container-high h-[48%]"></div>
						<div class="flex-1 bg-surface-container-high h-[35%]"></div>
						<div class="flex-1 bg-surface-container-high h-[52%]"></div>
						<div class="flex-1 bg-surface-container-high h-[40%]"></div>
						<div class="flex-1 bg-surface-container-high h-[30%]"></div>
						<div class="flex-1 bg-surface-container-high h-[22%]"></div>
						<div class="flex-1 bg-surface-container-high h-[18%]"></div>
					</div>
					<!-- Time Scrubber -->
					<div class="mt-2 flex items-center justify-between font-mono text-label-md">
						<span class="text-primary-container font-bold tracking-wider">02:44</span>
						<div class="flex-1 mx-space-sm relative h-1.5 bg-surface-container-high flex items-center cursor-pointer">
							<div class="h-full bg-primary-container w-[44%] shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>
							<div class="w-3 h-3 bg-white border border-black shadow"></div>
						</div>
						<span class="text-on-surface-variant tracking-wider">06:12</span>
					</div>
				</div>
				<!-- Transport Controls -->
				<div class="flex items-center justify-center gap-space-sm mt-3">
					<button aria-label="Aleatorio" class="p-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" type="button">
						<span class="material-symbols-outlined text-[20px]">shuffle</span>
					</button>
					<button aria-label="Pista anterior" class="p-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" type="button">
						<span class="material-symbols-outlined text-[22px]">skip_previous</span>
					</button>
					<button
						aria-label="Reproducir o pausar"
						class="px-space-lg py-2.5 bg-primary-container text-on-primary font-label-lg text-label-lg font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
						type="button"
					>
						<span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">pause</span>[ PAUSAR ]
					</button>
					<button aria-label="Pista siguiente" class="p-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" type="button">
						<span class="material-symbols-outlined text-[22px]">skip_next</span>
					</button>
					<button aria-label="Bucle / Repetir" class="p-2.5 bg-surface-container hover:bg-surface-container-high text-primary-container transition-colors" type="button">
						<span class="material-symbols-outlined text-[20px]">repeat</span>
					</button>
				</div>
			</section>
		</div>
	</main>
</div>
