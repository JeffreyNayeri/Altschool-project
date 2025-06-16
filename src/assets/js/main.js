/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if (sectionsClass) {
          if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
              sectionsClass.classList.add('active-link')
          } else {
              sectionsClass.classList.remove('active-link')
          }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== SHOW NAVBAR =====*/
const showNavbar = (toggleId, navId, bodyId, headerId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId);

  // Validate that all variables exist
  if (toggle && nav && bodypd && headerpd) {
    toggle.addEventListener("click", () => {
      // show navbar
      nav.classList.toggle("show");
      // change icon
      toggle.classList.toggle("bx-x");
      // add padding to body
      bodypd.classList.toggle("body-pd");
      // add padding to header
      headerpd.classList.toggle("body-pd");
    });
  }
};

showNavbar("nav-toggle", "nav-menu", "body-pd", "header");

/*===== LINK ACTIVE =====*/
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  if (linkColor) {
    linkColor.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  }
}
linkColor.forEach((l) => l.addEventListener("click", colorLink));

// Skills animation
const skillsSection = document.querySelector('.skills__container');
const skillBars = document.querySelectorAll('.skills__data');

const animateSkills = () => {
  skillBars.forEach(skill => {
    const percentage = skill.querySelector('.skills__percentage');
    const target = parseInt(percentage.getAttribute('data-target'));
    let count = 0;
    const duration = 1500; // 1.5 seconds
    const increment = target / (duration / 16); // 60fps

    const updateCount = () => {
      if (count < target) {
        count += increment;
        if (count > target) count = target;
        percentage.textContent = Math.round(count) + '%';
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  });
};

const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(skill => skill.classList.add('show'));
      animateSkills();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

if (skillsSection) {
  observer.observe(skillsSection);
}

// Interactive Particles for Home Section
(function() {
  const container = document.getElementById('interactiveParticles');
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let particles = [];
  const PARTICLE_COUNT = 32;
  const colors = ['#6C63FF', '#3F3D56', '#B3B3F1', '#A0A0D9'];
  let mouse = { x: canvas.width/2, y: canvas.height/2 };

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: randomBetween(0, canvas.width),
        y: randomBetween(0, canvas.height),
        r: randomBetween(3, 7),
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: randomBetween(-0.7, 0.7),
        dy: randomBetween(-0.7, 0.7)
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    // Draw lines to mouse
    for (let p of particles) {
      const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dist < 80) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = '#6C63FF33';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function updateParticles() {
    for (let p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
  }

  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    createParticles();
  });

  createParticles();
  animate();
})();

// Toast notification function
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      emailjs.sendForm('service_emd25ep', 'template_9hgel3b', this)
        .then(function() {
          showToast('Message sent successfully!', 'success');
          form.reset();
        }, function(error) {
          showToast('Failed to send message. Please try again.', 'error');
        });
    });
  }
});
