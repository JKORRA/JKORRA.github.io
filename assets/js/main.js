const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalStack = document.getElementById('modalStack');
const modalBody = document.getElementById('modalBody');
const modalLinkBtn = document.getElementById('modalLinkBtn');
const modalLinkContainer = document.getElementById('modalLinkContainer');

function openModal(cardElement) {
    if (!modal) return;
    const title = cardElement.querySelector('h3').innerText;
    const shortDesc = cardElement.querySelector('p').innerText;
    const longDescDiv = cardElement.querySelector('.long-description');
    const techStack = cardElement.querySelector('.tech-stack').innerHTML;
    const hiddenLink = cardElement.querySelector('.hidden-link');

    const longDesc = longDescDiv ? longDescDiv.innerHTML : `<p>${shortDesc}</p>`;
    const linkUrl = hiddenLink ? hiddenLink.getAttribute('href') : '#';
    const linkText = hiddenLink ? hiddenLink.innerText : 'View Project';

    modalTitle.innerText = title;
    modalStack.innerHTML = techStack;
    modalBody.innerHTML = longDesc;

    if (linkUrl && linkUrl !== "#" && linkUrl !== "") {
        modalLinkContainer.style.display = 'block';
        modalLinkBtn.href = linkUrl;
        modalLinkBtn.innerText = linkText + " \u2197";
    } else {
        modalLinkContainer.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    if (!modal) return;
    if (event.target === modal || event.target.classList.contains('modal-close') || event.target.closest('.modal-close')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener("DOMContentLoaded", function() {

    document.body.classList.add('js-enabled');

    const modelViewer = document.querySelector('model-viewer');
    const meshWrapper = document.querySelector('.mesh-wrapper');

    if (meshWrapper) {
        meshWrapper.addEventListener('wheel', function(e) {
            e.stopPropagation();
        }, { capture: true });
    }

    function revealContent() {
        const hideStyle = document.getElementById('init-hide-style');
        if (hideStyle) hideStyle.remove();
        startTyping();
        initScrollReveal();
    }

    if (modelViewer) {
        modelViewer.addEventListener('load', () => {
            modelViewer.classList.add('is-loaded');
            revealContent();
        });
        setTimeout(() => {
            modelViewer.classList.add('is-loaded');
            revealContent();
        }, 3000);
    } else {
        setTimeout(revealContent, 300);
    }

    const dragHint = document.getElementById('dragHint');
    if (dragHint && modelViewer) {
        modelViewer.addEventListener('camera-change', (event) => {
            if (event.detail.source === 'user-interaction') {
                dragHint.style.opacity = '0';
                dragHint.style.visibility = 'hidden';
            }
        });
    }

    const textToType = "Hi, I'm Jacopo !";
    const typingElement = document.getElementById("typing-text");
    let charIndex = 0;
    const typingSpeed = 100;

    function type() {
        if (typingElement && charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }

    function startTyping() {
        setTimeout(type, 200);
    }

    function initScrollReveal() {
        const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        if (revealEls.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    }

    initLazyModelViewer();
    initLazyD3();

    function initLazyModelViewer() {
        const aboutSection = document.querySelector('.about-scroll-section');
        if (!aboutSection) return;

        const script = document.querySelector('script[src*="model-viewer.min.js"]');
        if (script) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const s = document.createElement('script');
                    s.type = 'module';
                    s.src = 'assets/js/model-viewer.min.js';
                    document.head.appendChild(s);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        observer.observe(aboutSection);
    }

    function initLazyD3() {
        const graphContainer = document.getElementById('d3-graph-container');
        if (!graphContainer) return;

        const existing = document.querySelector('script[src*="d3.v7"]');
        if (existing) {
            initD3Graph();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const s = document.createElement('script');
                    s.src = 'https://d3js.org/d3.v7.min.js';
                    s.onload = initD3Graph;
                    document.body.appendChild(s);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    function initD3Graph() {
        const container = document.getElementById("d3-graph-container");
        if (!container || container.hasAttribute('data-d3-initialized')) return;
        container.setAttribute('data-d3-initialized', 'true');

        const isMobile = () => window.innerWidth < 768;

        const colors = {
            blue: "#0A84FF", purple: "#BF5AF2", cyan: "#64D2FF",
            green: "#30D158", yellow: "#FFD60A", orange: "#FF9F0A", default: "#86868b"
        };

        const graphData = {
            nodes: [
                { id: "Python", group: "blue", val: 3. },
                { id: "Machine Learning", group: "blue", val: 2 },
                { id: "Data Science", group: "blue", val: 2 },
                { id: "NLP", group: "blue", val: 2 },
                { id: "Java", group: "purple", val: 3 },
                { id: "Kotlin", group: "purple", val: 2.5 },
                { id: "Dart", group: "purple", val: 2.5 },
                { id: "Compose", group: "purple", val: 2 },
                { id: "Flutter", group: "purple", val: 2.5 },
                { id: "C", group: "purple", val: 2 },
                { id: "Go", group: "purple", val: 2 },
                { id: "SQL", group: "cyan", val: 2 },
                { id: "PostgreSQL", group: "cyan", val: 2.2 },
                { id: "OS", group: "green", val: 3 },
                { id: "Linux", group: "green", val: 2.5 },
                { id: "Debian", group: "green", val: 2 },
                { id: "Windows", group: "green", val: 1.8 },
                { id: "macOS", group: "green", val: 1.8 },
                { id: "Tools", group: "yellow", val: 2.5 },
                { id: "Git", group: "yellow", val: 2.2 },
                { id: "LaTeX", group: "yellow", val: 2 },
                { id: "Soft Skills", group: "orange", val: 2.5 },
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
                { source: "Dart", target: "Flutter" },
                { source: "Dart", target: "Kotlin" },
                { source: "Kotlin", target: "Flutter" },
                { source: "Python", target: "SQL" },
                { source: "Python", target: "PostgreSQL" },
                { source: "SQL", target: "PostgreSQL" },
                { source: "OS", target: "Linux" },
                { source: "OS", target: "Windows" },
                { source: "OS", target: "macOS" },
                { source: "Linux", target: "Debian" },
                { source: "Tools", target: "Git" },
                { source: "Tools", target: "LaTeX" },
                { source: "Tools", target: "OS" },
                { source: "Git", target: "OS" },
                { source: "Python", target: "C" },
                { source: "C", target: "Linux" },
                { source: "Soft Skills", target: "Italian" },
                { source: "Soft Skills", target: "English" }
            ]
        };

        const wrapper = document.querySelector(".graph-wrapper");
        let width = container.clientWidth;
        let height = container.clientHeight;

        const svg = d3.select("#d3-graph-container").append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", [0, 0, width, height]);

        const chargeStrength = isMobile() ? -2500 : -800;
        const linkDistance = isMobile() ? 180 : 110;
        const collisionIter = isMobile() ? 5 : 2;

        const simulation = d3.forceSimulation(graphData.nodes)
            .force("link", d3.forceLink(graphData.links)
                .id(d => d.id)
                .distance(linkDistance))
            .force("charge", d3.forceManyBody().strength(chargeStrength))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide()
                .radius(d => (d.val * 25) + 35)
                .iterations(collisionIter));

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

        node.on("click", function(event, d) {
            event.stopPropagation();
            activateNode(d);
            if (isMobile()) {
                setTimeout(resetActive, 3000);
            }
        });

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

        window.addEventListener('resize', () => {
            width = container.clientWidth;
            height = container.clientHeight;

            svg.attr("viewBox", [0, 0, width, height]);

            const newCharge = isMobile() ? -2500 : -800;
            const newDist = isMobile() ? 180 : 110;

            simulation.force("center", d3.forceCenter(width / 2, height / 2));
            simulation.force("charge", d3.forceManyBody().strength(newCharge));
            simulation.force("link", d3.forceLink(graphData.links).id(d => d.id).distance(newDist));

            simulation.alpha(0.3).restart();
        });
    }
});
