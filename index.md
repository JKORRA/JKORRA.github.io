---
layout: default
title: Jacopo Corrao
---

<style>
  /* --- 1. RESET E VARIABILI --- */
  header.site-header, footer.site-footer { display: none !important; }
  .wrapper { max-width: 100% !important; padding: 0 !important; }

  :root {
    --apple-bg: #000000;
    --apple-card: #1c1c1e;
    --apple-text: #f5f5f7;
    --apple-subtext: #86868b;
    --apple-blue: #2997ff;
    --apple-border: #333333;
    --btn-bg: rgba(255, 255, 255, 0.1);
    --btn-hover: rgba(41, 151, 255, 0.2);
    
    /* Graph Colors */
    --flow-green: #30d158;
    --flow-purple: #bf5af2;
    --flow-orange: #ff9f0a;
    --flow-cyan: #64d2ff;
    --flow-yellow: #ffcc00;
  }

  html { scroll-behavior: smooth; overflow-x: hidden; }

  body {
    background-color: var(--apple-bg);
    color: var(--apple-text);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  a { color: var(--apple-blue); text-decoration: none; transition: 0.2s; }

  /* --- 2. LAYOUT & NAVIGATION --- */
  .main-container {
    max-width: 980px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 60px;
    position: relative;
    z-index: 100;
  }
  .nav-name { font-weight: 600; font-size: 1.1rem; letter-spacing: -0.5px; opacity: 0.9; color: #fff; white-space: nowrap; }
  
  .nav-links { display: flex; gap: 20px; }
  .nav-links a { 
    font-size: 0.9rem; 
    color: var(--apple-subtext); 
    transition: color 0.2s;
    white-space: nowrap;
  }
  .nav-links a:hover { color: #fff; }

  /* --- 3. HERO SECTION --- */
  .hero {
    text-align: center;
    padding: 80px 20px 40px 20px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #typing-text {
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -1.5px;
    margin-bottom: 15px;
    color: #ffffff;
    display: inline-block;
    line-height: 1.1;
  }

  .cursor {
    display: inline-block;
    width: 5px;
    height: 4rem;
    background-color: var(--apple-blue);
    margin-left: 5px;
    vertical-align: text-bottom;
    animation: blink 1s infinite;
  }

  .hero p {
    font-size: 1.6rem;
    color: var(--apple-subtext);
    font-weight: 400;
    max-width: 720px;
    margin: 10px auto 40px auto;
    opacity: 0;
    animation: fadeIn 1s ease-in forwards;
    animation-delay: 2.2s;
    line-height: 1.4;
  }

  .scroll-indicator {
    margin-top: 40px;
    opacity: 0;
    animation: fadeIn 1s ease-in forwards, bounce 2s infinite;
    animation-delay: 2.5s, 2.5s;
    color: var(--apple-subtext);
    cursor: pointer;
  }

  /* --- 4. GENERAL SECTIONS --- */
  h2 {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.5px;
    margin-top: 80px;
    margin-bottom: 30px;
    color: #fff;
    scroll-margin-top: 80px;
  }

  /* --- 5. SKILLS GRAPH --- */
  .graph-wrapper {
    position: relative;
    width: 100%;
    border-radius: 30px;
    overflow: hidden; /* Nasconde l'overflow del contenitore esterno */
    background: radial-gradient(circle at center, rgba(28,28,30,0.4) 0%, transparent 70%);
    margin: 40px auto;
  }

  /* Contenitore scrollabile */
  .graph-scroll-area {
    width: 100%;
    height: 750px;
    position: relative;
    overflow: hidden; /* Default per desktop */
  }

  /* Contenuto interno a larghezza fissa per mantenere le proporzioni */
  .graph-content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .graph-lines {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .connection-base { stroke: rgba(255, 255, 255, 0.08); stroke-width: 2px; fill: none; }
  .connection-flow {
    stroke-width: 2px; fill: none; stroke-linecap: round;
    stroke-dasharray: 20 300; stroke-dashoffset: 320;
    animation: flowPulse 3s linear infinite; opacity: 0.8;
  }

  .flow-blue   { stroke: var(--apple-blue); filter: drop-shadow(0 0 4px var(--apple-blue)); }
  .flow-green  { stroke: var(--flow-green); filter: drop-shadow(0 0 4px var(--flow-green)); }
  .flow-purple { stroke: var(--flow-purple); filter: drop-shadow(0 0 4px var(--flow-purple)); }
  .flow-orange { stroke: var(--flow-orange); filter: drop-shadow(0 0 4px var(--flow-orange)); }
  .flow-cyan   { stroke: var(--flow-cyan); filter: drop-shadow(0 0 4px var(--flow-cyan)); }
  .flow-yellow { stroke: var(--flow-yellow); filter: drop-shadow(0 0 4px var(--flow-yellow)); }

  .graph-node {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: rgba(28, 28, 30, 0.6);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: var(--apple-text);
    font-size: 0.85rem; font-weight: 500;
    text-align: center;
    display: flex; justify-content: center; align-items: center;
    padding: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    cursor: default;
  }

  .node-lg { width: 100px; height: 100px; font-size: 1rem; font-weight: 600; }
  .node-md { width: 85px; height: 85px; }
  .node-sm { width: 65px; height: 65px; font-size: 0.75rem; }

  .graph-node:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
    transform: translate(-50%, -50%) scale(1.1);
    z-index: 10;
  }
  
  .node-blue:hover   { border-color: var(--apple-blue); box-shadow: 0 0 15px var(--apple-blue); }
  .node-green:hover  { border-color: var(--flow-green); box-shadow: 0 0 15px var(--flow-green); }
  .node-purple:hover { border-color: var(--flow-purple); box-shadow: 0 0 15px var(--flow-purple); }
  .node-orange:hover { border-color: var(--flow-orange); box-shadow: 0 0 15px var(--flow-orange); }
  .node-cyan:hover   { border-color: var(--flow-cyan); box-shadow: 0 0 15px var(--flow-cyan); }
  .node-yellow:hover { border-color: var(--flow-yellow); box-shadow: 0 0 15px var(--flow-yellow); }

  /* Hint per scroll su mobile */
  .mobile-scroll-hint {
    display: none;
    text-align: center;
    font-size: 0.8rem;
    color: var(--apple-subtext);
    margin-top: 10px;
    opacity: 0.7;
  }

  /* --- 6. CARDS & GRID --- */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 25px;
  }
  
  .card {
    background-color: var(--apple-card);
    border-radius: 20px;
    padding: 30px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid transparent;
    display: flex; flex-direction: column;
    position: relative; min-height: 250px;
  }
  .card.clickable { cursor: pointer; }
  
  .card.clickable:hover {
    transform: scale(1.02);
    border-color: #444;
    background-color: #262629;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
  
  .card h3 { margin-top: 0; font-size: 1.4rem; font-weight: 600; margin-bottom: 10px; color: #fff; padding-right: 30px; }
  .card p { color: var(--apple-subtext); font-size: 1rem; margin-bottom: 0; } 

  .featured-card {
    background: linear-gradient(145deg, #1c1c1e 0%, #161618 100%);
    border: 1px solid #333;
    border-left: 4px solid var(--apple-blue);
    border-radius: 20px;
    padding: 40px;
    margin-bottom: 40px;
    transition: transform 0.3s ease;
  }
  .featured-card:hover { transform: scale(1.01); border-color: #555; }
  .featured-header { margin-bottom: 15px; }
  .featured-title { font-size: 1.8rem; font-weight: 700; color: #fff; margin: 0; }
  .featured-subtitle { color: var(--apple-blue); font-size: 1rem; font-weight: 600; margin-top: 5px; display: block; }
  .featured-desc { font-size: 1.1rem; color: var(--apple-subtext); margin-bottom: 20px; }

  /* --- 7. FOOTERS & ACTIONS --- */
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    flex-wrap: wrap;
    gap: 15px;
  }
  .project-card .card-footer { margin-top: auto; margin-top: 30px; }

  .tech-stack { display: flex; flex-wrap: wrap; gap: 8px; }
  .badge {
    font-size: 0.75rem;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(41, 151, 255, 0.1);
    color: var(--apple-blue);
    font-weight: 600;
    border: 1px solid rgba(41, 151, 255, 0.2);
  }

  .card-expand-icon {
    position: absolute;
    top: 30px; right: 30px;
    width: 24px; height: 24px;
    color: #444;
    transition: all 0.3s ease;
    opacity: 0.5;
  }
  .card:hover .card-expand-icon { color: var(--apple-blue); opacity: 1; transform: translate(2px, -2px); }

  .btn-linkedin {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.9rem; font-weight: 500;
    color: #fff;
    padding: 8px 16px;
    border-radius: 20px;
    background-color: rgba(0, 119, 181, 0.2);
    border: 1px solid rgba(0, 119, 181, 0.3);
    transition: all 0.2s ease;
  }
  .btn-linkedin:hover {
    background-color: rgba(0, 119, 181, 0.4);
    border-color: #0077b5;
    text-decoration: none;
    transform: translateY(-2px);
  }

  /* --- 8. CONTACT & FOOTER --- */
  .contact-section {
    text-align: center;
    padding: 80px 20px;
    background: linear-gradient(180deg, transparent 0%, rgba(28,28,30,0.5) 100%);
    border-radius: 20px;
    margin-top: 80px;
    border: 1px solid #222;
  }
  .btn-contact {
    display: inline-block; margin-top: 20px;
    padding: 12px 30px; border-radius: 980px;
    font-size: 1rem; font-weight: 600;
    background-color: var(--apple-blue); color: #000;
    transition: transform 0.2s;
  }
  .btn-contact:hover { transform: scale(1.05); background-color: #fff; text-decoration: none; color: #000; }
  
  .social-links { margin-top: 30px; display: flex; justify-content: center; gap: 20px; }
  .social-link { color: var(--apple-subtext); transition: color 0.2s; }
  .social-link:hover { color: #fff; }

  footer {
    text-align: center; margin-top: 60px; padding: 40px 0;
    border-top: 1px solid #222;
    color: #555; font-size: 0.8rem;
  }

  /* --- 9. MODAL (FIXED FOR MOBILE) --- */
  .modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    z-index: 1000;
    opacity: 0; visibility: hidden;
    transition: all 0.3s ease;
    display: flex; justify-content: center; align-items: center; 
    padding: 10px; /* Padding esterno minimo per mobile */
  }
  .modal-overlay.active { opacity: 1; visibility: visible; }
  
  .modal-content {
    background: #1c1c1e; 
    width: 95%; /* Più largo su mobile */
    max-width: 700px; 
    max-height: 80vh; /* Sicurezza per toolbar browser */
    border-radius: 20px; 
    border: 1px solid #333;
    padding: 30px; /* Default desktop */
    position: relative; 
    overflow-y: auto;
    transform: scale(0.95);
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  .modal-overlay.active .modal-content { transform: scale(1); }
  
  .modal-close {
    position: absolute; 
    top: 15px; 
    right: 15px;
    background: rgba(255,255,255,0.1); 
    border: none; color: #fff;
    width: 32px; height: 32px; border-radius: 50%;
    font-size: 1.1rem; cursor: pointer;
    transition: background 0.2s;
    display: flex; align-items: center; justify-content: center;
    z-index: 10;
  }
  .modal-close:hover { background: rgba(255,255,255,0.2); }
  
  .modal-title { 
    font-size: 2rem; font-weight: 700; 
    margin: 0 0 10px 0; color: #fff; 
    padding-right: 40px; /* Evita sovrapposizione con la X */
  }
  .modal-subtitle { font-size: 1.1rem; color: var(--apple-blue); margin-bottom: 25px; display: block; }
  .modal-body { font-size: 1.1rem; line-height: 1.7; color: #ccc; }
  .modal-body p { margin-bottom: 20px; }
  .btn-modal {
    display: inline-block; padding: 10px 24px;
    border-radius: 980px; background: var(--apple-blue);
    color: #000; font-weight: 600; margin-top: 10px;
  }
  .btn-modal:hover { background: #fff; color: #000; text-decoration: none; }
  .long-description, .hidden-link { display: none; }

  /* --- 10. ANIMATIONS --- */
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes flowPulse { to { stroke-dashoffset: 0; } }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-10px);}
    60% {transform: translateY(-5px);}
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  /* --- 11. MOBILE OPTIMIZATIONS (FIX MODAL + GRAPH + LAYOUT) --- */
  @media (max-width: 768px) {
    /* Navbar Scroll */
    .nav-header { flex-direction: column; align-items: flex-start; gap: 15px; }
    .nav-links { 
      width: 100%; overflow-x: auto; padding-bottom: 10px; 
      justify-content: flex-start; -webkit-overflow-scrolling: touch; 
    }
    .nav-links::-webkit-scrollbar { display: none; }

    /* Hero */
    #typing-text { font-size: 2.5rem; }
    .cursor { height: 2.5rem; }
    .hero p { font-size: 1.2rem; }

    /* GRAFO MOBILE: Scroll Orizzontale (Map View) */
    .graph-scroll-area {
      overflow-x: auto; /* Abilita lo scroll */
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      height: 600px; /* Ridotto altezza per mobile */
    }
    .graph-content {
      width: 900px; /* Forza la larghezza desktop per mantenere la struttura */
      transform: scale(0.8); /* Zoom out leggero per vedere di più */
      transform-origin: top left;
    }
    .mobile-scroll-hint { display: block; } /* Mostra hint */

    /* Griglia 1 colonna */
    .grid { grid-template-columns: 1fr; }
    
    /* Footer Featured Card */
    .featured-card { padding: 25px; }
    .card-footer { flex-direction: column; align-items: flex-start; }
    .btn-linkedin { width: auto; } /* Fix bottone */
    
    /* MODAL FIX SPECIFICO PER MOBILE */
    .modal-content {
      padding: 25px; /* Meno padding */
      width: 90%;
      border-radius: 16px;
    }
    .modal-title { font-size: 1.5rem; } /* Titolo più piccolo */
    .modal-body { font-size: 1rem; } /* Testo più leggibile */
    
    h2 { font-size: 1.8rem; margin-top: 60px; }
    .contact-section { padding: 40px 20px; }
  }
</style>

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
    <div>
      <span id="typing-text"></span><span class="cursor"></span>
    </div>
    <p>Master's Student in Computer Science at University of Trento.</p>
    <a href="#about" class="scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
    </a>
  </div>

  <section id="about">
    <h2>About Me</h2>
    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--apple-subtext);">
      My academic journey began in <strong>Varese</strong>, where I earned my Bachelor's degree in <strong>Computer Science</strong>.<br>
      Driven by the desire to gain new experiences, I decided to move to <strong>Trento</strong> to continue my studies.<br>
      I am now attending a master's degree course in Computer Science, specialising in <strong>Data Science</strong>.
   </p>
  </section>

  <section id="skills">
    <h2>Skills Graph</h2>
    <p class="mobile-scroll-hint">← Scroll horizontally to explore →</p>

    <div class="graph-wrapper">
      <div class="graph-scroll-area">
        <div class="graph-content">
          
          <svg class="graph-lines" width="100%" height="100%">
            <line x1="20%" y1="30%" x2="10%" y2="15%" class="connection-base" />
            <line x1="20%" y1="30%" x2="10%" y2="15%" class="connection-flow flow-blue" />
            <line x1="20%" y1="30%" x2="8%" y2="45%" class="connection-base" />
            <line x1="20%" y1="30%" x2="8%" y2="45%" class="connection-flow flow-blue" style="animation-delay: -1s" />
            <line x1="20%" y1="30%" x2="32%" y2="12%" class="connection-base" />
            <line x1="20%" y1="30%" x2="32%" y2="12%" class="connection-flow flow-blue" style="animation-delay: -0.5s" />

            <line x1="20%" y1="30%" x2="45%" y2="30%" class="connection-base" />
            <line x1="20%" y1="30%" x2="45%" y2="30%" class="connection-flow flow-blue" style="animation-duration: 4s;" />
            
            <line x1="45%" y1="30%" x2="50%" y2="10%" class="connection-base" />
            <line x1="45%" y1="30%" x2="50%" y2="10%" class="connection-flow flow-purple" />
            <line x1="45%" y1="30%" x2="65%" y2="30%" class="connection-base" />
            <line x1="45%" y1="30%" x2="65%" y2="30%" class="connection-flow flow-purple" style="animation-delay: -0.5s" />
            <line x1="65%" y1="30%" x2="80%" y2="20%" class="connection-base" />
            <line x1="65%" y1="30%" x2="80%" y2="20%" class="connection-flow flow-purple" />
            <line x1="80%" y1="20%" x2="90%" y2="10%" class="connection-base" />
            <line x1="80%" y1="20%" x2="90%" y2="10%" class="connection-flow flow-purple" style="animation-delay: -1s" />
            <line x1="80%" y1="20%" x2="90%" y2="30%" class="connection-base" />
            <line x1="80%" y1="20%" x2="90%" y2="30%" class="connection-flow flow-purple" style="animation-delay: -1.2s" />

            <line x1="20%" y1="30%" x2="60%" y2="55%" class="connection-base" style="opacity: 0.2" />
            <line x1="65%" y1="30%" x2="60%" y2="55%" class="connection-base" style="opacity: 0.2" />
            <line x1="60%" y1="55%" x2="75%" y2="50%" class="connection-base" />
            <line x1="60%" y1="55%" x2="75%" y2="50%" class="connection-flow flow-cyan" />

            <line x1="35%" y1="70%" x2="60%" y2="75%" class="connection-base" />
            <line x1="60%" y1="75%" x2="75%" y2="75%" class="connection-base" />
            <line x1="60%" y1="75%" x2="75%" y2="75%" class="connection-flow flow-yellow" />

            <line x1="20%" y1="30%" x2="35%" y2="70%" class="connection-base" style="opacity: 0.2" />
            <line x1="35%" y1="70%" x2="20%" y2="80%" class="connection-base" />
            <line x1="35%" y1="70%" x2="20%" y2="80%" class="connection-flow flow-green" />
            <line x1="35%" y1="70%" x2="45%" y2="85%" class="connection-base" />
            <line x1="35%" y1="70%" x2="45%" y2="85%" class="connection-flow flow-green" style="animation-delay: -1s" />
            <line x1="35%" y1="70%" x2="30%" y2="55%" class="connection-base" />
            <line x1="35%" y1="70%" x2="30%" y2="55%" class="connection-flow flow-green" style="animation-delay: -2s" />

            <line x1="94%" y1="85%" x2="83%" y2="92%" class="connection-base" />
            <line x1="94%" y1="85%" x2="83%" y2="92%" class="connection-flow flow-orange" style="animation-direction: alternate;" />
          </svg>

          <div class="graph-node node-lg node-blue" style="left: 20%; top: 30%;">Python</div>
          <div class="graph-node node-md node-blue" style="left: 10%; top: 15%;">Machine<br>Learning</div>
          <div class="graph-node node-md node-blue" style="left: 8%; top: 45%;">Data<br>Science</div>
          <div class="graph-node node-md node-blue" style="left: 32%; top: 12%;">NLP</div>

          <div class="graph-node node-lg node-purple" style="left: 45%; top: 30%;">C</div>
          <div class="graph-node node-md node-purple" style="left: 50%; top: 10%;">Go</div>
          <div class="graph-node node-lg node-purple" style="left: 65%; top: 30%;">Java</div>
          <div class="graph-node node-md node-purple" style="left: 80%; top: 20%;">Kotlin</div>
          <div class="graph-node node-sm node-purple" style="left: 90%; top: 10%;">Compose</div>
          <div class="graph-node node-sm node-purple" style="left: 90%; top: 30%;">Flutter</div>

          <div class="graph-node node-md node-cyan" style="left: 60%; top: 55%;">SQL</div>
          <div class="graph-node node-md node-cyan" style="left: 75%; top: 50%;">Postgre<br>SQL</div>

          <div class="graph-node node-md node-yellow" style="left: 60%; top: 75%;">Git</div>
          <div class="graph-node node-sm node-yellow" style="left: 75%; top: 75%;">LaTeX</div>

          <div class="graph-node node-lg node-green" style="left: 35%; top: 70%;">Linux</div>
          <div class="graph-node node-sm node-green" style="left: 20%; top: 80%;">Debian</div>
          <div class="graph-node node-md node-green" style="left: 45%; top: 85%;">Windows</div>
          <div class="graph-node node-md node-green" style="left: 30%; top: 55%;">macOS</div>

          <div class="graph-node node-sm node-orange" style="left: 83%; top: 92%;">English<br>(B2)</div>
          <div class="graph-node node-sm node-orange" style="left: 94%; top: 85%;">Italian<br>(Native)</div>
        
        </div> </div> </div> </section>

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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
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
            <p>Quadrifinder will help you find little green lucky charms with the help of Artificial Intelligence. Open the app, frame your favourite lawn and start searching for four-leaf clovers right away!</p>
        </div>
        <div class="card-footer">
            <div class="tech-stack">
                <span class="badge">Computer Vision</span>
                <span class="badge">Machine Learning</span>
                <span class="badge">Android</span>
            </div>
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
            <p>Climate Monitoring is a desktop application that allows you to manage and consult climate monitoring centres.</p>
        </div>
        <div class="card-footer">
            <div class="tech-stack">
                <span class="badge">Java</span>
                <span class="badge">Jetpack Compose</span>
                <span class="badge">API RESTful</span>
            </div>
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
            <p>Automation of tasks and improvement of the user experience through a system that uses GenerativeAI (LLM) on local hardware, leveraging Function Calling.</p>
        </div>
        <div class="card-footer">
            <div class="tech-stack">
                <span class="badge">GenAI</span>
                <span class="badge">Local Inference</span>
                <span class="badge">Function Calling</span>
            </div>
        </div>
        <div class="long-description">
            <p>My undergraduate internship focused on the cutting edge of Generative AI:<br> running Large Language Models (LLMs) locally.</p>
            <p>The objective was to create an agent capable of <strong>Function Calling</strong>, interacting with external tools, without sending data to external cloud providers.</p>
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
            I am always open to discussing new opportunities in Machine Learning and Data Science.
        </p>
        <a href="mailto:jacopo.corrao@gmail.com" class="btn-contact">Send an Email</a>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/jacopo-corrao-88149834a/" target="_blank" class="social-link">LinkedIn</a>
            <a href="https://github.com/JKORRA" target="_blank" class="social-link">GitHub</a>
        </div>
    </div>
  </section>

  <footer>
    <p>Jacopo Corrao • Portfolio 2025</p>
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
  document.addEventListener("DOMContentLoaded", function() {
    // Typing Effect
    const textToType = "Hi, I'm Jacopo !";
    const typingElement = document.getElementById("typing-text");
    const typingSpeed = 100;
    let charIndex = 0;

    function type() {
      if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      }
    }
    setTimeout(type, 500);
  });

  // Modal Logic
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
</script>
