---
layout: default
title: Jacopo Corrao
---

<style>
  /* --- 1. CORE VARIABLES & RESET --- */
  header.site-header, footer.site-footer { display: none !important; }
  .wrapper { max-width: 100% !important; padding: 0 !important; }

  :root {
    --apple-bg: #000000;
    --apple-card: #1c1c1e;
    --apple-text: #f5f5f7;
    --apple-subtext: #86868b;
    --apple-blue: #2997ff;
    --apple-border: #333333;
    
    /* Graph Cluster Colors */
    --c-python: #2997ff;  /* Blue */
    --c-prog: #bf5af2;    /* Purple */
    --c-db: #64d2ff;      /* Cyan */
    --c-tools: #ffcc00;   /* Yellow */
    --c-os: #30d158;      /* Green */
    --c-lang: #ff9f0a;    /* Orange */
  }

  html { scroll-behavior: smooth; overflow-x: hidden; }
  
  body {
    background-color: var(--apple-bg);
    color: var(--apple-text);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    margin: 0; padding: 0;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--apple-blue); text-decoration: none; transition: 0.2s; }

  /* --- 2. LAYOUT --- */
  .main-container { max-width: 980px; margin: 0 auto; padding: 40px 20px; }

  /* Header */
  .nav-header {
    display: flex; justify-content: space-between; align-items: center;
    padding-bottom: 20px; margin-bottom: 60px;
    position: relative; z-index: 100;
  }
  .nav-name { font-weight: 600; font-size: 1.1rem; color: #fff; white-space: nowrap; }
  .nav-links { display: flex; gap: 20px; }
  .nav-links a { font-size: 0.9rem; color: var(--apple-subtext); white-space: nowrap; }
  .nav-links a:hover { color: #fff; }

  /* Hero */
  .hero {
    text-align: center; padding: 80px 20px 40px 20px; min-height: 400px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  #typing-text { font-size: 4rem; font-weight: 700; letter-spacing: -1.5px; color: #fff; line-height: 1.1; }
  .cursor {
    display: inline-block; width: 5px; height: 4rem;
    background-color: var(--apple-blue); margin-left: 5px;
    vertical-align: text-bottom; animation: blink 1s infinite;
  }
  .hero p { font-size: 1.6rem; color: var(--apple-subtext); max-width: 720px; margin: 20px auto; animation: fadeIn 1s ease-in forwards; animation-delay: 2.2s; opacity: 0; }
  .scroll-indicator { margin-top: 40px; color: var(--apple-subtext); animation: fadeIn 1s ease-in forwards 2.5s, bounce 2s infinite 2.5s; opacity: 0; cursor: pointer; }

  h2 { font-size: 2rem; font-weight: 600; margin-top: 100px; margin-bottom: 30px; color: #fff; scroll-margin-top: 80px; }

  /* --- 3. DYNAMIC GRAPH STYLES --- */
  #graph-container {
    position: relative;
    width: 100%;
    height: 700px; /* Altezza area grafo */
    background: radial-gradient(circle at center, rgba(28,28,30,0.4) 0%, transparent 70%);
    border-radius: 30px;
    overflow: hidden; /* Nasconde ciò che sborda, ma la fisica lo impedirà */
    margin: 40px auto;
    touch-action: none; 
    border: 1px solid var(--apple-border); /* Bordo per vedere i limiti */
  }

  /* SVG Lines Layer */
  .links-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
  
  .graph-link {
    stroke-width: 2px;
    stroke-opacity: 0.6;
    fill: none;
  }

  /* HTML Nodes Layer (Divs) */
  .graph-node {
    position: absolute;
    /* Non usiamo translate qui perché D3 gestisce left/top direttamente nel tick */
    border-radius: 50%;
    display: flex; justify-content: center; align-items: center;
    text-align: center;
    font-weight: 500;
    color: var(--apple-text);
    background: rgba(28, 28, 30, 0.85); /* Leggermente più opaco */
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    cursor: grab;
    user-select: none;
    transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s; /* Animazione fluida hover */
    z-index: 1;
    /* Importante per centrare il nodo sulla coordinata D3 */
    margin-left: -50px; /* Metà larghezza node-lg default */
    margin-top: -50px;  /* Metà altezza node-lg default */
  }

  /* Override margin per dimensioni diverse */
  .node-lg { width: 100px; height: 100px; margin-left: -50px; margin-top: -50px; font-size: 1rem; font-weight: 600; }
  .node-md { width: 85px; height: 85px; margin-left: -42.5px; margin-top: -42.5px; font-size: 0.85rem; }
  .node-sm { width: 70px; height: 70px; margin-left: -35px; margin-top: -35px; font-size: 0.75rem; }

  .graph-node:active { cursor: grabbing; transform: scale(1.1); }
  .graph-node:hover { z-index: 10; background: rgba(255,255,255,0.15); border-color: #fff; transform: scale(1.1); }

  /* Cluster Colors (Border & Glow) */
  .c-python { border-color: var(--c-python); box-shadow: 0 0 15px rgba(41, 151, 255, 0.15); }
  .c-prog   { border-color: var(--c-prog);   box-shadow: 0 0 15px rgba(191, 90, 242, 0.15); }
  .c-db     { border-color: var(--c-db);     box-shadow: 0 0 15px rgba(100, 210, 255, 0.15); }
  .c-tools  { border-color: var(--c-tools);  box-shadow: 0 0 15px rgba(255, 204, 0, 0.15); }
  .c-os     { border-color: var(--c-os);     box-shadow: 0 0 15px rgba(48, 209, 88, 0.15); }
  .c-lang   { border-color: var(--c-lang);   box-shadow: 0 0 15px rgba(255, 159, 10, 0.15); }

  /* --- 4. CARDS & OTHER --- */
  .featured-card {
    background: linear-gradient(145deg, #1c1c1e 0%, #161618 100%);
    border: 1px solid #333; border-left: 4px solid var(--apple-blue);
    border-radius: 20px; padding: 40px; margin-bottom: 40px;
    transition: transform 0.3s ease;
  }
  .featured-card:hover { transform: scale(1.01); border-color: #555; }
  .featured-title { font-size: 1.8rem; font-weight: 700; color: #fff; margin: 0; }
  .featured-subtitle { color: var(--apple-blue); font-size: 1rem; font-weight: 600; display: block; margin-top: 5px; }
  .featured-desc { font-size: 1.1rem; color: var(--apple-subtext); margin-bottom: 20px; }
  
  .card-footer {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);
    flex-wrap: wrap; gap: 15px;
  }
  
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px; }
  .card {
    background-color: var(--apple-card); border-radius: 20px; padding: 30px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid transparent; display: flex; flex-direction: column;
    position: relative; min-height: 250px; cursor: pointer;
  }
  .card:hover { transform: scale(1.02); border-color: #444; background-color: #262629; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
  .card h3 { margin: 0 0 10px 0; font-size: 1.4rem; color: #fff; padding-right: 30px; }
  .card p { color: var(--apple-subtext); margin: 0; }
  .project-card .card-footer { margin-top: auto; margin-top: 30px; }
  
  .tech-stack { display: flex; flex-wrap: wrap; gap: 8px; }
  .badge {
    font-size: 0.75rem; padding: 6px 12px; border-radius: 8px;
    background: rgba(41, 151, 255, 0.1); color: var(--apple-blue);
    font-weight: 600; border: 1px solid rgba(41, 151, 255, 0.2);
  }
  .card-expand-icon { position: absolute; top: 30px; right: 30px; width: 24px; height: 24px; color: #444; transition: all 0.3s ease; opacity: 0.5; }
  .card:hover .card-expand-icon { color: var(--apple-blue); opacity: 1; transform: translate(2px, -2px); }

  .btn-linkedin {
    display: inline-flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 500;
    color: #fff; padding: 8px 16px; border-radius: 20px;
    background-color: rgba(0, 119, 181, 0.2); border: 1px solid rgba(0, 119, 181, 0.3);
  }
  .btn-linkedin:hover { background-color: rgba(0, 119, 181, 0.4); border-color: #0077b5; text-decoration: none; }

  /* Contact & Footer */
  .contact-section {
    text-align: center; padding: 80px 20px; margin-top: 80px;
    background: linear-gradient(180deg, transparent 0%, rgba(28,28,30,0.5) 100%);
    border-radius: 20px; border: 1px solid #222;
  }
  .btn-contact {
    display: inline-block; margin-top: 20px; padding: 12px 30px; border-radius: 980px;
    font-size: 1rem; font-weight: 600; background-color: var(--apple-blue); color: #000;
    transition: transform 0.2s;
  }
  .btn-contact:hover { transform: scale(1.05); background-color: #fff; text-decoration: none; color: #000; }
  .social-links { margin-top: 30px; display: flex; justify-content: center; gap: 20px; }
  .social-link { color: var(--apple-subtext); transition: color 0.2s; }
  .social-link:hover { color: #fff; }
  footer { text-align: center; margin-top: 60px; padding: 40px 0; border-top: 1px solid #222; color: #555; font-size: 0.8rem; }

  /* Modal */
  .modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    z-index: 1000; opacity: 0; visibility: hidden; transition: all 0.3s ease;
    display: flex; justify-content: center; align-items: center; padding: 10px;
  }
  .modal-overlay.active { opacity: 1; visibility: visible; }
  .modal-content {
    background: #1c1c1e; width: 95%; max-width: 700px; max-height: 80vh;
    border-radius: 20px; border: 1px solid #333; padding: 30px;
    position: relative; overflow-y: auto; transform: scale(0.95);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  .modal-overlay.active .modal-content { transform: scale(1); }
  .modal-close {
    position: absolute; top: 15px; right: 15px;
    background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px;
    border-radius: 50%; font-size: 1.1rem; cursor: pointer; transition: background 0.2s;
    display: flex; align-items: center; justify-content: center; z-index: 10;
  }
  .modal-close:hover { background: rgba(255,255,255,0.2); }
  .modal-title { font-size: 2rem; font-weight: 700; margin: 0 0 10px 0; color: #fff; padding-right: 40px; }
  .modal-subtitle { font-size: 1.1rem; color: var(--apple-blue); margin-bottom: 25px; display: block; }
  .modal-body { font-size: 1.1rem; line-height: 1.8; color: #ccc; }
  .btn-modal {
    display: inline-block; padding: 10px 24px; border-radius: 980px;
    background: var(--apple-blue); color: #000; font-weight: 600; margin-top: 10px;
  }
  .btn-modal:hover { background: #fff; color: #000; text-decoration: none; }
  .long-description, .hidden-link { display: none; }

  /* Media Queries */
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-10px);} 60% {transform: translateY(-5px);} }

  @media (max-width: 768px) {
    .nav-header { flex-direction: column; align-items: flex-start; gap: 15px; }
    .nav-links { width: 100%; overflow-x: auto; padding-bottom: 10px; justify-content: flex-start; -webkit-overflow-scrolling: touch; }
    .nav-links::-webkit-scrollbar { display: none; }
    #typing-text { font-size: 2.5rem; } .cursor { height: 2.5rem; }
    .grid { grid-template-columns: 1fr; }
    .featured-card { padding: 25px; }
    .card-footer { flex-direction: column; align-items: flex-start; }
    .btn-linkedin { width: auto; }
    .modal-content { padding: 25px; }
    .modal-title { font-size: 1.6rem; }
    #graph-container { height: 500px; } /* Meno alto su mobile */
  }
</style>

<script src="https://d3js.org/d3.v7.min.js"></script>

<div class="main-container">
  
  <div class="nav-header">
    <div class="nav-name">Jacopo Corrao</div>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#featured">Featured</a>
      <a href="#projects">Projects</a>
      <a href="#education">Education</a>
      <a href="#contact">Contact</a>
    </div>
  </div>

  <div class="hero">
    <div><span id="typing-text"></span><span class="cursor"></span></div>
    <p>Master's Student in Computer Science at University of Trento.</p>
    <a href="#about" class="scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
    </a>
  </div>

  <section id="about">
    <h2>About Me</h2>
    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--apple-subtext);">
      My academic journey began in <strong>Varese</strong>, where I earned my Bachelor's degree in Computer Science. Driven by a passion for data and innovation, I moved to <strong>Trento</strong> to pursue a Master's degree specializing in <strong>Data Science</strong>.</p>
  </section>

  <section id="skills">
    <h2>Skills Graph</h2>
    <p style="text-align:center; color: var(--apple-subtext); margin-bottom: 20px;">
      Interactive ecosystem. Drag nodes to play.
    </p>
    <div id="graph-container"></div>
  </section>

  <section id="featured">
    <h2>Featured Achievement</h2>
    <div class="featured-card">
      <div class="featured-header">
        <h3 class="featured-title">Public AI Challenge 2025</h3>
        <span class="featured-subtitle">Innovation Project for Trentino School of Management (TSM)</span>
      </div>
      <p class="featured-desc">
        Selected to participate in an Open Innovation initiative by HIT (Hub Innovazione Trentino). I worked in a team to innovate educational processes using AI.
      </p>
      <ul style="color: var(--apple-subtext); padding-left: 20px; line-height: 1.8;">
        <li><strong>Challenge:</strong> Personalize training pathways for public sector employees using unstructured data.</li>
        <li><strong>Solution:</strong> Developed a hybrid recommender system leveraging the <strong>ESCO taxonomy</strong>, text embeddings, and FAISS.</li>
        <li><strong>Outcome:</strong> Delivered a functional Proof of Concept (PoC) API for semantic search and personalized course suggestions.</li>
      </ul>
      <div class="card-footer">
        <div class="tech-stack" style="margin: 0;">
            <span class="badge">Semantic Search</span>
            <span class="badge">Recommender Systems</span>
            <span class="badge">FAISS</span>
            <span class="badge">Python</span>
            <span class="badge">RDF</span>
        </div>
        <a href="https://www.linkedin.com/feed/update/urn:li:activity:7421559785721929728/" target="_blank" class="btn-linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
            View Post
        </a>
      </div>
    </div>
  </section>

  <section id="projects">
    <h2>Selected Projects</h2>
    <div class="grid">
      <div class="card project-card clickable" onclick="openModal(this)">
        <svg class="card-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        <div style="flex-grow: 1;">
            <h3>Quadrifinder App</h3>
            <p>Mobile application using AI Computer Vision to find four-leaf clovers.</p>
        </div>
        <div class="card-footer">
            <div class="tech-stack"><span class="badge">Computer Vision</span><span class="badge">Machine Learning</span><span class="badge">Android</span></div>
        </div>
        <div class="long-description">
            <p>Quadrifinder is a mobile application developed during the "Programming Mobile Devices" course. The goal is simple yet innovative: helping users spot four-leaf clovers in real-time using Artificial Intelligence.</p>
            <p><strong>Highlights:</strong></p>
            <ul>
                <li>Developed as a native mobile application.</li>
                <li>Utilizes Computer Vision to distinguish clovers in real-time.</li>
                <li>Currently in the process of being published on the <strong>Google Play Store</strong>.</li>
            </ul>
            <p>The <strong>University of Insubria</strong> selected this project as a showcase example to promote the computer science course to new students.</p>
        </div>
        <a href="https://quadrifinder.pappacoda.it" class="hidden-link">View Website</a>
      </div>

      <div class="card project-card clickable" onclick="openModal(this)">
        <svg class="card-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        <div style="flex-grow: 1;">
            <h3>Climate Monitoring System</h3>
            <p>Full-stack desktop system for climate centers with Clean Architecture.</p>
        </div>
        <div class="card-footer">
            <div class="tech-stack"><span class="badge">Java</span><span class="badge">Jetpack Compose</span><span class="badge">API RESTful</span></div>
        </div>
        <div class="long-description">
            <p>Developed for the "Interdisciplinary Laboratory" course, this project is a comprehensive management system designed for climate monitoring centers.</p>
            <p><strong>Tech Stack Details:</strong></p>
            <ul>
                <li><strong>Frontend:</strong> Modern UI built with <strong>Jetpack Compose</strong> for Desktop, ensuring a reactive user experience.</li>
                <li><strong>Backend:</strong> A robust RESTful API developed in <strong>Java</strong>, handling data persistence and client requests.</li>
            </ul>
        </div>
        <a href="https://git.sr.ht/~tachi/ClimateMonitoring" class="hidden-link">View Source Code</a>
      </div>

      <div class="card project-card clickable" onclick="openModal(this)">
        <svg class="card-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        <div style="flex-grow: 1;">
            <h3>Local LLM Agent</h3>
            <p>Privacy-first GenAI tool for task automation and Function Calling.</p>
        </div>
        <div class="card-footer">
            <div class="tech-stack"><span class="badge">GenAI</span><span class="badge">Local Inference</span><span class="badge">Function Calling</span></div>
        </div>
        <div class="long-description">
            <p>My undergraduate internship focused on the cutting edge of Generative AI: running Large Language Models (LLMs) locally.</p>
            <p>The objective was to create an agent capable of <strong>Function Calling</strong>—interacting with external tools—without sending data to external cloud providers.</p>
            <p>This project addressed key challenges in privacy, latency, and hardware constraints, demonstrating how GenAI can be effectively deployed in sensitive local environments.</p>
        </div>
        <a href="#" class="hidden-link"></a>
      </div>
    </div>
  </section>

  <section id="education">
    <h2>Education Path</h2>
    <div class="grid">
      <div class="card" style="background: rgba(28,28,30,0.6); cursor: default;">
        <span style="color: var(--apple-blue); font-weight:bold; font-size: 0.8rem; text-transform: uppercase;">Current • Since Sep 2024</span>
        <h3 style="margin-top: 10px;">University of Trento</h3>
        <p>Master in Computer Science<br><strong>Path: Data Science</strong></p>
      </div>
      <div class="card" style="background: rgba(28,28,30,0.6); cursor: default;">
        <span style="color: #666; font-weight:bold; font-size: 0.8rem; text-transform: uppercase;">Graduated • Oct 2024</span>
        <h3 style="margin-top: 10px;">University of Insubria</h3>
        <p>Bachelor's Degree in Computer Science<br><em>Varese, Italy</em></p>
      </div>
    </div>
  </section>

  <section id="contact">
    <div class="contact-section">
        <h2 style="margin-top: 0; margin-bottom: 15px; color:white;">Let's Connect</h2>
        <p style="color: var(--apple-subtext); max-width: 500px; margin: 0 auto 30px auto;">
            I am always open to new opportunities!
        </p>
        <a href="mailto:jacopo.corrao@gmail.com" class="btn-contact">Send an Email</a>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/jacopo-corrao-88149834a/" target="_blank" class="social-link">LinkedIn</a>
            <a href="https://github.com/JKORRA" target="_blank" class="social-link">GitHub</a>
        </div>
    </div>
  </section>

  <footer>
    <p>Jacopo Corrao</p>
    <p style="opacity: 0.4; margin-top: 10px;"><3</p>
  </footer>

</div>

<div class="modal-overlay" id="projectModal" onclick="closeModal(event)">
    <div class="modal-content">
        <button class="modal-close" onclick="closeModal(event)">✕</button>
        <h3 class="modal-title" id="modalTitle">Title</h3>
        <span class="modal-subtitle" id="modalStack">Stack</span>
        <div class="modal-body" id="modalBody"></div>
        <div style="margin-top: 30px;" id="modalLinkContainer">
            <a href="#" target="_blank" class="btn-modal" id="modalLinkBtn">View Project ↗</a>
        </div>
    </div>
</div>

<script>
  // 1. TYPING EFFECT
  document.addEventListener("DOMContentLoaded", function() {
    const textToType = "Hi, I'm Jacopo !";
    const typingElement = document.getElementById("typing-text");
    const typingSpeed = 100;
    let charIndex = 0;
    function type() {
      if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++; setTimeout(type, typingSpeed);
      }
    }
    setTimeout(type, 500);
  });

  // 2. MODAL LOGIC
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalStack = document.getElementById('modalStack');
  const modalBody = document.getElementById('modalBody');
  const modalLinkBtn = document.getElementById('modalLinkBtn');
  const modalLinkContainer = document.getElementById('modalLinkContainer');

  function openModal(cardElement) {
    const title = cardElement.querySelector('h3').innerText;
    const shortDesc = cardElement.querySelector('p').innerText;
    const longDescDiv = cardElement.querySelector('.long-description');
    const longDesc = longDescDiv ? longDescDiv.innerHTML : `<p>${shortDesc}</p>`;
    const techStack = cardElement.querySelector('.tech-stack').innerHTML;
    const hiddenLink = cardElement.querySelector('.hidden-link');
    const linkUrl = hiddenLink ? hiddenLink.getAttribute('href') : '#';
    const linkText = hiddenLink ? hiddenLink.innerText : 'View Project';

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
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(event) {
    if (event.target === modal || event.target.classList.contains('modal-close') || event.target.closest('.modal-close')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
  }

  // 3. D3.js FORCE DIRECTED GRAPH (The Dynamic Solution)
  document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('graph-container');
    
    // Configura dimensioni
    const width = container.clientWidth;
    const height = container.clientHeight;

    const nodes = [
      // Python Cluster (Blue)
      { id: "Python", group: "c-python", size: "lg" },
      { id: "Data\nScience", group: "c-python", size: "md" },
      { id: "Machine\nLearning", group: "c-python", size: "md" },
      { id: "NLP", group: "c-python", size: "md" },
      // Prog Cluster (Purple)
      { id: "C", group: "c-prog", size: "lg" },
      { id: "Go", group: "c-prog", size: "md" },
      { id: "Java", group: "c-prog", size: "lg" },
      { id: "Kotlin", group: "c-prog", size: "md" },
      { id: "Compose", group: "c-prog", size: "sm" },
      { id: "Flutter", group: "c-prog", size: "sm" },
      // DB Cluster (Cyan)
      { id: "SQL", group: "c-db", size: "md" },
      { id: "Postgre\nSQL", group: "c-db", size: "md" },
      // Tools (Yellow)
      { id: "Git", group: "c-tools", size: "md" },
      { id: "LaTeX", group: "c-tools", size: "sm" },
      // OS (Green)
      { id: "Linux", group: "c-os", size: "lg" },
      { id: "Debian", group: "c-os", size: "sm" },
      { id: "Windows", group: "c-os", size: "md" },
      { id: "macOS", group: "c-os", size: "md" },
      // Lang (Orange)
      { id: "English\n(B2)", group: "c-lang", size: "sm" },
      { id: "Italian\n(Native)", group: "c-lang", size: "sm" }
    ];

    const links = [
      { source: "Python", target: "Data\nScience", color: "var(--c-python)" },
      { source: "Python", target: "Machine\nLearning", color: "var(--c-python)" },
      { source: "Python", target: "NLP", color: "var(--c-python)" },
      { source: "Python", target: "C", color: "rgba(255,255,255,0.2)" }, // Bridge
      { source: "Python", target: "SQL", color: "rgba(255,255,255,0.2)" }, // Bridge
      { source: "Python", target: "Linux", color: "rgba(255,255,255,0.2)" }, // Bridge
      
      { source: "C", target: "Go", color: "var(--c-prog)" },
      { source: "C", target: "Java", color: "var(--c-prog)" },
      { source: "Java", target: "Kotlin", color: "var(--c-prog)" },
      { source: "Kotlin", target: "Compose", color: "var(--c-prog)" },
      { source: "Kotlin", target: "Flutter", color: "var(--c-prog)" },
      
      { source: "SQL", target: "Postgre\nSQL", color: "var(--c-db)" },
      
      { source: "Linux", target: "Git", color: "rgba(255,255,255,0.2)" }, // Bridge
      { source: "Git", target: "LaTeX", color: "var(--c-tools)" },
      
      { source: "Linux", target: "Debian", color: "var(--c-os)" },
      { source: "Linux", target: "Windows", color: "var(--c-os)" },
      { source: "Linux", target: "macOS", color: "var(--c-os)" },
      
      { source: "English\n(B2)", target: "Italian\n(Native)", color: "var(--c-lang)" }
    ];

    // Setup SVG
    const svg = d3.select("#graph-container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "links-layer");

    // Simulation Setup con "Bounding Box" per evitare l'uscita
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(90)) // Distanza link
        .force("charge", d3.forceManyBody().strength(-300)) // Repulsione nodi
        .force("center", d3.forceCenter(width / 2, height / 2)) // Centro gravità
        .force("collide", d3.forceCollide().radius(d => (d.size === 'lg' ? 60 : 50) + 10).iterations(2)); // Evita sovrapposizioni

    // Draw Lines
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "graph-link")
        .style("stroke", d => d.color);

    // Draw HTML Nodes (Divs)
    const node = d3.select("#graph-container")
        .selectAll(".graph-node")
        .data(nodes)
        .enter().append("div")
        .attr("class", d => `graph-node ${d.group} ${d.size === 'lg' ? 'node-lg' : d.size === 'md' ? 'node-md' : 'node-sm'}`)
        .text(d => d.id.replace('\n', ' '))
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // Handle Line Breaks
    node.html(d => d.id.replace(/\n/g, '<br>'));

    // Update Positions on Tick (con logica Bounding Box)
    simulation.on("tick", () => {
        
        // Rayon approx per bounding box
        const radius = 50; 

        // Constraint nodes within the container dimensions
        nodes.forEach(d => {
            d.x = Math.max(radius, Math.min(width - radius, d.x));
            d.y = Math.max(radius, Math.min(height - radius, d.y));
        });

        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .style("left", d => d.x + "px")
            .style("top", d => d.y + "px");
    });

    // Drag Functions
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
  });
</script>
