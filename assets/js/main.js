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
    setTimeout(type, 500);


    // --- B. GRAFICO D3.JS ---
    
    // Verifica che il container esista prima di eseguire D3
    const container = document.getElementById("d3-graph-container");
    if (!container) return;

    // DATI DEL GRAFO
    const graphData = {
        nodes: [
            // AI Group
            { id: "Python", group: "blue", val: 3 },
            { id: "Machine Learning", group: "blue", val: 2 },
            { id: "Data Science", group: "blue", val: 2 },
            { id: "NLP", group: "blue", val: 2 },
            
            // Mobile/Lang Group
            { id: "Java", group: "purple", val: 3 },
            { id: "Kotlin", group: "purple", val: 2 },
            { id: "Compose", group: "purple", val: 2 },
            { id: "Flutter", group: "purple", val: 2 },
            { id: "C", group: "purple", val: 2 },
            { id: "Go", group: "purple", val: 2 },

            // DB Group
            { id: "SQL", group: "cyan", val: 2 },
            { id: "PostgreSQL", group: "cyan", val: 2 },

            // OS Group
            { id: "Linux", group: "green", val: 3 },
            { id: "Debian", group: "green", val: 2 },
            { id: "Windows", group: "green", val: 2 },
            { id: "macOS", group: "green", val: 2 },
            
            // Tools Group
            { id: "Git", group: "yellow", val: 2 },
            { id: "LaTeX", group: "yellow", val: 2 },

            // Languages Group
            { id: "Italian", group: "orange", val: 1.5 },
            { id: "English", group: "orange", val: 1.5 }
        ],
        links: [
            { source: "Python", target: "Machine Learning" },
            { source: "Python", target: "Data Science" },
            { source: "Python", target: "NLP" },
            { source: "Machine Learning", target: "Data Science" },
            
            { source: "Java", target: "Kotlin" },
            { source: "Kotlin", target: "Compose" },
            { source: "Java", target: "C" },
            { source: "C", target: "Go" },
            { source: "Kotlin", target: "Flutter" },

            { source: "Python", target: "SQL" },
            { source: "SQL", target: "PostgreSQL" },

            { source: "Linux", target: "Debian" },
            { source: "Linux", target: "Windows" },
            { source: "Linux", target: "macOS" },
            { source: "Linux", target: "Git" },
            { source: "Git", target: "LaTeX" },
            
            { source: "Python", target: "C" },
            { source: "Italian", target: "English" }
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

    // Helper per mobile
    const isMobile = () => window.innerWidth < 768;

    // CONFIGURAZIONE SIMULAZIONE FISICA
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(110)) 
        .force("charge", d3.forceManyBody().strength(-800))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => (d.val * 25) + 30).iterations(2));

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
       simulation.force("center", d3.forceCenter(width / 2, height / 2));
       simulation.alpha(0.3).restart();
    });
});
