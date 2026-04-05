// Definiamo le variabili della modale
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalStack = document.getElementById('modalStack');
const modalBody = document.getElementById('modalBody');
const modalLinkBtn = document.getElementById('modalLinkBtn');
const modalLinkContainer = document.getElementById('modalLinkContainer');

/**
 * Apre la modale popolandola con i dati della card cliccata
 * @param {HTMLElement} cardElement - L'elemento .card cliccato
 */
function openModal(cardElement) {
    if (!modal) return; // Sicurezza se il DOM non è pronto

    // Recupero dati dalla card
    const title = cardElement.querySelector('h3').innerText;
    const shortDesc = cardElement.querySelector('p').innerText;
    const longDescDiv = cardElement.querySelector('.long-description');
    const techStack = cardElement.querySelector('.tech-stack').innerHTML;
    const hiddenLink = cardElement.querySelector('.hidden-link');

    // Gestione descrizione (lunga se esiste, altrimenti usa la corta)
    const longDesc = longDescDiv ? longDescDiv.innerHTML : `<p>${shortDesc}</p>`;

    // Gestione Link
    const linkUrl = hiddenLink ? hiddenLink.getAttribute('href') : '#';
    const linkText = hiddenLink ? hiddenLink.innerText : 'View Project';

    // Popolamento Modale
    modalTitle.innerText = title;
    modalStack.innerHTML = techStack;
    modalBody.innerHTML = longDesc;

    if (linkUrl && linkUrl !== "#" && linkUrl !== "") {
        modalLinkContainer.style.display = 'block';
        modalLinkBtn.href = linkUrl;
        modalLinkBtn.innerText = linkText + " ↗";
    } else {
        modalLinkContainer.style.display = 'none';
    }

    // Mostra modale e blocca scroll pagina
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Chiude la modale
 * @param {Event} event - L'evento click
 */
function closeModal(event) {
    if (!modal) return;
    
    // Chiude se clicco fuori (overlay), sul bottone X, o se invocato manualmente
    if (event.target === modal || event.target.classList.contains('modal-close') || event.target.closest('.modal-close')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener("DOMContentLoaded", function() {

    // --- A. TYPING EFFECT ---
    const textToType = "Hi, I'm Jacopo !";
    const typingElement = document.getElementById("typing-text");
    const typingSpeed = 100;
    let charIndex = 0;

    function type() {
        if (typingElement && charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    // Avvia l'effetto dopo mezzo secondo
    // Verrà avviato dinamicamente dopo lo splash screen
    function startTyping() {
        setTimeout(type, 200);
    }

    // --- A2. SPLINE VIEWER + SPLASH SCREEN (Three.js Procedural Clouds) ---
    const splineViewer = document.querySelector('spline-viewer');
    const splineWrapper = document.querySelector('.spline-wrapper');
    const splashScreen = document.getElementById('splashScreen');

    if (splineWrapper) {
        // Block wheel zoom — only drag-to-rotate allowed
        splineWrapper.addEventListener('wheel', function(e) {
            e.stopPropagation();
        }, { capture: true });
    }

    let isSplashActive = splashScreen !== null;
    let splashReqId, scene, camera, renderer, cloudSystem;

    if (isSplashActive && typeof THREE !== 'undefined') {
        // Billboard Cloud System customized for dark/mysterious look
        class BillboardCloudSystem {
            constructor(scene, camera, options = {}) {
                this.scene = scene;
                this.camera = camera;
                this.count = options.count ?? 40;
                this.spread = options.spread ?? 350;
                this.altitude = options.altitude ?? 0;
                this.clouds = [];
            }
            
            seededRandom(seed) {
                const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
                return s - Math.floor(s);
            }

            generate(seed = 0) {
                const texture = this._generateCloudTexture(256); // reduced size since it's just a soft gradient now

                for (let i = 0; i < this.count; i++) {
                    const material = new THREE.SpriteMaterial({
                        map: texture,
                        transparent: true,
                        // Opacity variation for depth
                        opacity: 0.3 + this.seededRandom(seed + i * 5) * 0.5,
                        depthWrite: false,
                        // Mysterious dark blue/slate color
                        color: new THREE.Color().setHSL(0.65, 0.25, 0.12 + this.seededRandom(seed + i * 7) * 0.08),
                        blending: THREE.NormalBlending
                    });

                    const sprite = new THREE.Sprite(material);
                    const sx = 80 + this.seededRandom(seed + i * 11) * 120; // slightly larger to compensate for smooth edges
                    sprite.scale.set(sx, sx * (0.6 + this.seededRandom(seed + i * 13) * 0.4), 1);
                    
                    // Distribute around the camera, mostly deeper on Z
                    sprite.position.set(
                        (this.seededRandom(seed + i * 2) - 0.5) * this.spread,
                        this.altitude + (this.seededRandom(seed + i * 3) - 0.5) * 80,
                        (this.seededRandom(seed + i * 4) - 0.5) * 150 - 50
                    );

                    // Random initial rotation
                    material.rotation = this.seededRandom(seed + i * 8) * Math.PI * 2;

                    this.scene.add(sprite);
                    // Store rotation speed
                    this.clouds.push({ sprite, rotSpeed: (this.seededRandom(seed + i) - 0.5) * 0.002 });
                }
            }

            _generateCloudTexture(size) {
                const canvas = document.createElement('canvas');
                canvas.width = canvas.height = size;
                const ctx = canvas.getContext('2d');

                const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
                grad.addColorStop(0, 'rgba(255,255,255,0.8)');
                grad.addColorStop(0.4, 'rgba(255,255,255,0.4)');
                grad.addColorStop(0.7, 'rgba(255,255,255,0.1)');
                grad.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, size, size);

                const tex = new THREE.CanvasTexture(canvas);
                tex.needsUpdate = true;
                return tex;
            }

            update(time, windSpeed = 5) {
                for (const cloud of this.clouds) {
                    // Drift horizontally
                    cloud.sprite.position.x += windSpeed * 0.08;
                    // Slowly approach the camera on Z axis for 3D depth
                    cloud.sprite.position.z += windSpeed * 0.05;
                    
                    // Gentle vertical bobbing based on time and a random offset (using sprite.id)
                    cloud.sprite.position.y += Math.sin(time * 0.8 + cloud.sprite.id) * 0.05;

                    cloud.sprite.material.rotation += cloud.rotSpeed * 3.0; // Faster swirl

                    // Wrap horizontally
                    if (cloud.sprite.position.x > this.spread / 2) {
                        cloud.sprite.position.x -= this.spread;
                    }
                    // Wrap depth: if it passes the camera (Z=50), send it deep into the background
                    if (cloud.sprite.position.z > 60) {
                        cloud.sprite.position.z = -150 - Math.random() * 50; 
                    }
                }
            }

            dispose() {
                for (const c of this.clouds) {
                    this.scene.remove(c.sprite); 
                    if (c.sprite.material.map) c.sprite.material.map.dispose();
                    c.sprite.material.dispose();
                }
                this.clouds = [];
            }
        }

        // Initialize Scene
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 50);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        splashScreen.appendChild(renderer.domElement);

        cloudSystem = new BillboardCloudSystem(scene, camera);
        cloudSystem.generate(88);

        let flyThroughActive = false;
        let flySpeed = 0;

        const clock = new THREE.Clock();
        function animateSplash() {
            if (!isSplashActive) return;
            splashReqId = requestAnimationFrame(animateSplash);
            
            const t = clock.getElapsedTime();
            cloudSystem.update(t, 5.0); // Increased ambient wind drift
            
            if (flyThroughActive) {
                // Accelerate camera forward
                flySpeed += 0.04;
                camera.position.z -= flySpeed;
                // Add a slight tilt to the camera during fly-through
                camera.rotation.z += 0.001;
            }

            renderer.render(scene, camera);
        }
        animateSplash();

        function onWindowResize() {
            if (!isSplashActive) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize, false);

        let dismissed = false;
        function dismissSplash() {
            if (dismissed) return;
            dismissed = true;
            
            // Trigger fly-through and cross-fade out
            flyThroughActive = true;
            splashScreen.classList.add('exit');
            
            // Wait for transition to finish then rigorously clean up
            setTimeout(() => {
                isSplashActive = false;
                cancelAnimationFrame(splashReqId);
                cloudSystem.dispose();
                renderer.dispose();
                window.removeEventListener('resize', onWindowResize);
                splashScreen.remove();
                startTyping();
            }, 2500); // Wait for the new 2.5s CSS transition
        }

        // Synchronization with Spline loading event
        if (splineViewer) {
            function onModelReady() { dismissSplash(); }
            splineViewer.addEventListener('load', onModelReady);
            
            // Canvas polling fallback
            var readyCheck = setInterval(() => {
                if (splineViewer.shadowRoot && splineViewer.shadowRoot.querySelector('canvas')) {
                    clearInterval(readyCheck);
                    setTimeout(onModelReady, 300);
                }
            }, 500);
            
            // Hard timeout fallbacks
            setTimeout(onModelReady, 4500);
            setTimeout(() => clearInterval(readyCheck), 15000);
        } else {
            setTimeout(dismissSplash, 2000);
        }

    } else {
        // Lightweight Fallback
        if (splashScreen) {
            splashScreen.classList.add('exit');
            setTimeout(() => { splashScreen.remove(); startTyping(); }, 2500);
        } else {
            startTyping();
        }
    }


    // --- B. GRAFICO D3.JS ---
    
    // Verifica che il container esista prima di eseguire D3
    const container = document.getElementById("d3-graph-container");
    if (!container) return;

    // DATI DEL GRAFO
    const graphData = {
        nodes: [

	    { id: "Python", group: "blue", val: 3. },
            { id: "Machine Learning", group: "blue", val: 2 },
            { id: "Data Science", group: "blue", val: 2 },
            { id: "NLP", group: "blue", val: 2 },
            
            // Mobile/Lang Group (Purple)
            { id: "Java", group: "purple", val: 3 },
            { id: "Kotlin", group: "purple", val: 2.5 },
            { id: "Dart", group: "purple", val: 2.5 }, 
            { id: "Compose", group: "purple", val: 2 },
            { id: "Flutter", group: "purple", val: 2.5 },
            { id: "C", group: "purple", val: 2 },
            { id: "Go", group: "purple", val: 2 },

            // DB Group (Cyan)
            { id: "SQL", group: "cyan", val: 2 },
            { id: "PostgreSQL", group: "cyan", val: 2.2 },

            // OS Group (Green)
            { id: "OS", group: "green", val: 3 }, 
            { id: "Linux", group: "green", val: 2.5 },
            { id: "Debian", group: "green", val: 2 },
            { id: "Windows", group: "green", val: 1.8 },
            { id: "macOS", group: "green", val: 1.8 },
            
            // Tools Group (Yellow)
            { id: "Tools", group: "yellow", val: 2.5 }, 
            { id: "Git", group: "yellow", val: 2.2 },
            { id: "LaTeX", group: "yellow", val: 2 },

            // Soft Skills (Orange)
            { id: "Soft Skills", group: "orange", val: 2.5 }, 
            { id: "Italian", group: "orange", val: 1.5 },
            { id: "English", group: "orange", val: 1.5 }

        ],
        links: [
		// AI Cluster
            { source: "Python", target: "Machine Learning" },
            { source: "Python", target: "Data Science" },
            { source: "Python", target: "NLP" },
            { source: "Machine Learning", target: "Data Science" },

            // Mobile/Lang Cluster
            { source: "Java", target: "Kotlin" },
            { source: "Kotlin", target: "Compose" },
            { source: "Java", target: "C" },
            { source: "C", target: "Go" },

            // Flutter Cluster
            { source: "Dart", target: "Flutter" },
            { source: "Dart", target: "Kotlin" },
            { source: "Kotlin", target: "Flutter" },

            // Data & DB
            { source: "Python", target: "SQL" },
            { source: "Python", target: "PostgreSQL" },
            { source: "SQL", target: "PostgreSQL" },

            // OS Cluster
            { source: "OS", target: "Linux" },
            { source: "OS", target: "Windows" },
            { source: "OS", target: "macOS" },
            { source: "Linux", target: "Debian" },

            // Tools Cluster
            { source: "Tools", target: "Git" },
            { source: "Tools", target: "LaTeX" },
            { source: "Tools", target: "OS" },
            { source: "Git", target: "OS" },

            // Cross-Cluster & Bridges
            { source: "Python", target: "C" },
            { source: "C", target: "Linux" }, // CRITICAL LINK: Connects the two main islands

            // Soft Skills
            { source: "Soft Skills", target: "Italian" },
            { source: "Soft Skills", target: "English" }
        ]
    };

    const colors = {
        blue: "#0A84FF", purple: "#BF5AF2", cyan: "#64D2FF",
        green: "#30D158", yellow: "#FFD60A", orange: "#FF9F0A", default: "#86868b"
    };

    const wrapper = document.querySelector(".graph-wrapper");
    let width = container.clientWidth;
    let height = container.clientHeight;

    const svg = d3.select("#d3-graph-container").append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [0, 0, width, height]);

    // Helper per mobile (move this UP if it's currently below the simulation code)
    const isMobile = () => window.innerWidth < 768;

    // DEFINISCI I PARAMETRI IN BASE AL DISPOSITIVO
    // Su mobile aumentiamo la distanza e la repulsione per sfruttare lo scroll orizzontale
    const chargeStrength = isMobile() ? -2500 : -800; // Molto più forte su mobile
    const linkDistance = isMobile() ? 180 : 110;      // Link più lunghi su mobile
    const collisionIter = isMobile() ? 5 : 2;         // Più iterazioni per evitare sovrapposizioni

    // CONFIGURAZIONE SIMULAZIONE FISICA
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links)
            .id(d => d.id)
            .distance(linkDistance)) // Usa variabile dinamica
        .force("charge", d3.forceManyBody().strength(chargeStrength)) // Usa variabile dinamica
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide()
            .radius(d => (d.val * 25) + 35) // Aumentato leggermente il padding (+35)
            .iterations(collisionIter));    // Più calcoli per evitare compenetrazione

    // Creazione Elementi Grafici
    const linkBase = svg.append("g")
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("class", "link-base");

    const linkFlow = svg.append("g")
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("class", "link-flow")
        .style("stroke", d => colors[d.source.group] || colors.default);

    const node = svg.append("g")
        .selectAll("g")
        .data(graphData.nodes)
        .join("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", d => 25 + (d.val * 10))
        .style("stroke", d => colors[d.group] || colors.default)
        .style("color", d => colors[d.group] || colors.default);

    node.append("text")
        .text(d => d.id)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-size", d => Math.max(11, d.val * 4) + "px")
        .call(wrapText);


    // --- GESTIONE INTERAZIONE (Mouse + Touch) ---

    node.on("click", function(event, d) {
        event.stopPropagation();
        activateNode(d);
    });

    // Hover solo su desktop
    node.on("mouseover", function(event, d) {
        if (!isMobile()) activateNode(d);
    });
    
    node.on("mouseout", function() {
        if (!isMobile()) resetActive();
    });

    svg.on("click", function() {
        resetActive();
    });

    function activateNode(d) {
        wrapper.classList.add("has-active");
        
        node.classed("active", false).classed("neighbor", false);
        linkFlow.classed("active", false);

        const currentNode = node.filter(n => n.id === d.id);
        currentNode.classed("active", true);

        const neighbors = new Set();
        graphData.links.forEach(l => {
            if (l.source.id === d.id) neighbors.add(l.target.id);
            if (l.target.id === d.id) neighbors.add(l.source.id);
        });

        node.classed("neighbor", n => neighbors.has(n.id));
        linkFlow.classed("active", l => l.source.id === d.id || l.target.id === d.id);
    }

    function resetActive() {
        wrapper.classList.remove("has-active");
        node.classed("active", false).classed("neighbor", false);
        linkFlow.classed("active", false);
    }

    // Aggiornamento continuo posizioni (Tick)
    simulation.on("tick", () => {
        const padding = 20; 
        
        node.attr("transform", d => {
            const radius = 25 + (d.val * 10);
            d.x = Math.max(radius + padding, Math.min(width - radius - padding, d.x));
            d.y = Math.max(radius + padding, Math.min(height - radius - padding, d.y));
            return `translate(${d.x},${d.y})`;
        });

        linkBase
            .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
            
        linkFlow
            .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    });

    // Helper: Wrap Text
    function wrapText(text) {
        text.each(function() {
            const t = d3.select(this);
            const words = t.text().split(/\s+/).reverse();
            if (words.length > 1) {
                t.text(null);
                t.append("tspan").attr("x", 0).attr("dy", "-0.4em").text(words.pop());
                t.append("tspan").attr("x", 0).attr("dy", "1.2em").text(words.pop());
            }
        });
    }

    // Helper: Dragging
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // Resize Listener
    window.addEventListener('resize', () => {
       width = container.clientWidth;
       height = container.clientHeight;

       svg.attr("viewBox", [0, 0, width, height]);

       // Re-calculate dynamic parameters on resize
       const newCharge = isMobile() ? -2500 : -800;
       const newDist = isMobile() ? 180 : 110;

       // Apply new center AND new forces
       simulation.force("center", d3.forceCenter(width / 2, height / 2));
       simulation.force("charge", d3.forceManyBody().strength(newCharge));
       simulation.force("link", d3.forceLink(graphData.links).id(d => d.id).distance(newDist));

       simulation.alpha(0.3).restart();
    });
});
