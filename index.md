---
layout: default
title: Jacopo Corrao
---

<link rel="stylesheet" href="assets/css/style.css">

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
      <div id="d3-graph-container"></div>
    </div>
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

<script src="https://d3js.org/d3.v7.min.js"></script>

<script src="assets/js/main.js"></script>