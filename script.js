/**
 * ==============================================================================
 * KIM DOKJA | DEMON KING OF SALVATION - STAR STREAM TERMINAL SCRIPT
 * Omniscient Reader's Viewpoint (전지적 독자 시점)
 * 
 * Interactive Features:
 * 1. Mobile Menu & Navigation Smooth Scrolling
 * 2. Sticky Navbar with Scrolled Glassmorphism State
 * 3. Typewriter Effect for Kim Dokja's Ascended Titles
 * 4. Live Star Stream Constellation Reaction Ticker
 * 5. The 49% vs 51% Worldline Consciousness Switcher
 * 6. The Fourth Wall Text Glitch Simulator
 * 7. Interactive Bookmark Skill Activator (5 Active Slots)
 * 8. Real-time Coin Sponsorship Simulator with Web Audio API Chimes
 * 9. Scenario Case Studies Category Filter System
 * 10. Star Stream Message Transmission to the Final Subway
 * ==============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. WEB AUDIO API SYNTHESIZER
     ========================================== */
  let audioCtx = null;
  let isSoundMuted = false;

  const initAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  // Dokkaebi System Chime
  const playSystemChime = (freq = 660, duration = 0.5) => {
    if (isSoundMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted
    }
  };

  // Coin Sponsor Ping
  const playCoinPing = () => {
    if (isSoundMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2400, audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
  };

  // Audio Toggle Button
  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      isSoundMuted = !isSoundMuted;
      soundToggleBtn.innerHTML = isSoundMuted 
        ? '<i class="fa-solid fa-volume-xmark"></i>' 
        : '<i class="fa-solid fa-volume-high"></i>';
      if (!isSoundMuted) playSystemChime(880, 0.4);
    });
  }

  /* ==========================================
     2. MOBILE MENU & HAMBURGER
     ========================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(event.target) &&
        !hamburgerBtn.contains(event.target)
      ) {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================
     3. STICKY NAVBAR & BACK TO TOP BUTTON
     ========================================== */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  /* ==========================================
     4. ACTIVE NAV LINK ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  /* ==========================================
     5. TYPEWRITER EFFECT FOR KIM DOKJA TITLES
     ========================================== */
  const typewriterElement = document.getElementById('typewriter-title');
  if (typewriterElement) {
    const titles = [
      'Kim Dokja',
      'Demon King of Salvation',
      'The Sole Reader',
      'CEO of Kim Dokja\'s Company',
      'The Most Ancient Dream',
      'Watcher of Light and Darkness'
    ];
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 110;

    const typeLoop = () => {
      const currentTitle = titles[titleIdx];

      if (isDeleting) {
        typewriterElement.textContent = currentTitle.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentTitle.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIdx === currentTitle.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    setTimeout(typeLoop, 800);
  }

  /* ==========================================
     6. LIVE CONSTELLATION REACTION TICKER
     ========================================== */
  const tickerText = document.getElementById('ticker-text');
  const constellationBroadcasts = [
    "[The Constellation 'Demon-like Judge of Fire' is weeping with joy! (2,000 Coins Sponsored)]",
    "[The Constellation 'Abyssal Black Flame Dragon' claims he could make a cooler dark theme.]",
    "[The Constellation 'Prisoner of the Golden Headband' scratches his head in excitement.]",
    "[The Constellation 'Secretive Plotter' watches silently from the 1864th turn.]",
    "[The Constellation 'Queen of the Darkest Spring' smiles warmly and prepares divine tea.]",
    "[Dokkaebi 'Biyoo' lets out a soft cry: Ba-at!]",
    "[The Constellation 'Maritime War God' nods approvingly at Incarnation Lee Jihye.]",
    "[The Constellation 'Master of Steel' salutes Incarnation Lee Hyunsung's steadfastness.]",
    "[The Constellation 'Gourmet of the Night' craves dumpling stew.]",
    "[Star Stream Bureau: Probability distortion detected around Incarnation Kim Dokja.]"
  ];

  let broadcastIdx = 0;
  setInterval(() => {
    if (tickerText) {
      broadcastIdx = (broadcastIdx + 1) % constellationBroadcasts.length;
      tickerText.style.opacity = '0';
      setTimeout(() => {
        tickerText.textContent = constellationBroadcasts[broadcastIdx];
        tickerText.style.opacity = '1';
      }, 300);
    }
  }, 4500);

  /* ==========================================
     7. THE 49% VS 51% WORLDLINE TOGGLE
     ========================================== */
  const splitToggleBtn = document.getElementById('split-toggle');
  const splitTag = document.getElementById('split-tag');

  if (splitToggleBtn && splitTag) {
    splitToggleBtn.addEventListener('click', () => {
      const is51 = document.body.classList.contains('mode-51');

      if (is51) {
        document.body.classList.remove('mode-51');
        document.body.classList.add('mode-49');
        splitTag.textContent = '49% Earth Returnee';
        playSystemChime(520, 0.6);
        alert('[WORLDLINE SHIFTED]\nYou are now observing the perspective of the 49% Avatar who returned to Earth with your companions.');
      } else {
        document.body.classList.remove('mode-49');
        document.body.classList.add('mode-51');
        splitTag.textContent = '51% Ancient Dream';
        playSystemChime(880, 0.8);
        alert('[WORLDLINE SHIFTED]\nYou are now observing the perspective of the 51% Most Ancient Dream reading endlessly on the cosmic subway.');
      }
    });
  }

  /* ==========================================
     8. THE FOURTH WALL GLITCH SIMULATOR
     ========================================== */
  const fourthWallCard = document.getElementById('fourth-wall-card');
  const fourthWallText = document.getElementById('fourth-wall-text');
  let isGlitching = false;

  if (fourthWallCard && fourthWallText) {
    const originalText = fourthWallText.textContent;
    const glitchDialogue = "「 K i m  D o k j a  t h i n k s :  I  m u s t  s a v e  t h e m .  T h i s  i s  t h e  F o u r t h  W a l l . 」";

    const triggerGlitch = () => {
      if (isGlitching) return;
      isGlitching = true;
      playSystemChime(320, 0.5);

      fourthWallText.classList.add('glitched-text');
      fourthWallText.textContent = glitchDialogue;

      setTimeout(() => {
        fourthWallText.classList.remove('glitched-text');
        fourthWallText.textContent = originalText;
        isGlitching = false;
      }, 3500);
    };

    fourthWallCard.addEventListener('mouseenter', triggerGlitch);
    fourthWallCard.addEventListener('click', triggerGlitch);
  }

  /* ==========================================
     9. BOOKMARK SKILL ACTIVATOR
     ========================================== */
  const bmSlots = document.querySelectorAll('.bm-slot');
  const bmFeedback = document.getElementById('bm-feedback');

  const bookmarkData = {
    wind: "Active: [Way of the Wind] Lv. 10 (Derived from Lycaon of the Imyuntar)",
    'pure-energy': "Active: [White Pure Star Energy] Lv. 10 (Derived from Yoo Joonghyuk)",
    'sword-song': "Active: [Song of the Sword] Lv. 8 (Derived from Duke of Loyalty and Warfare)",
    flame: "Active: [Hellfire] Lv. 9 (Derived from Judge of Fire Uriel)",
    beast: "Active: [Beast Taming] Lv. 10 (Derived from Shin Yoosung)"
  };

  bmSlots.forEach((slot) => {
    slot.addEventListener('click', () => {
      bmSlots.forEach((s) => s.classList.remove('active'));
      slot.classList.add('active');

      const skillKey = slot.getAttribute('data-skill');
      if (bookmarkData[skillKey] && bmFeedback) {
        playSystemChime(750, 0.4);
        bmFeedback.textContent = bookmarkData[skillKey];
      }
    });
  });

  /* ==========================================
     10. COIN SPONSORSHIP SIMULATOR
     ========================================== */
  const donateBtn = document.getElementById('donate-btn');
  const coinPresetBtns = document.querySelectorAll('.coin-btn');
  const coinCountEl = document.getElementById('coin-count');
  const donationFeed = document.getElementById('donation-feed');

  let currentCoins = 1280500;
  let selectedDonation = 2000;

  coinPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedDonation = parseInt(btn.getAttribute('data-amt'), 10);
      donateBtn.innerHTML = `<i class="fa-solid fa-hand-holding-dollar"></i> Transmit ${selectedDonation.toLocaleString()} Coins`;
      playSystemChime(600, 0.2);
    });
  });

  if (donateBtn && coinCountEl && donationFeed) {
    donateBtn.addEventListener('click', () => {
      donateBtn.disabled = true;
      playCoinPing();

      currentCoins += selectedDonation;
      coinCountEl.textContent = currentCoins.toLocaleString();

      donationFeed.innerHTML = `
        <div style="animation: fadeIn 0.4s ease;">
          <strong class="gold-text">[Sponsorship Transmitted!]</strong><br>
          You sponsored ${selectedDonation.toLocaleString()} Coins to Kim Dokja!<br>
          <span style="color: var(--primary-color);">[The Constellation 'Demon-like Judge of Fire' sheds tears of gratitude!]</span>
        </div>
      `;

      setTimeout(() => {
        donateBtn.disabled = false;
      }, 1000);
    });
  }

  // Poll Random Constellation Reaction Button
  const pollBtn = document.getElementById('refresh-reactions-btn');
  if (pollBtn && tickerText) {
    pollBtn.addEventListener('click', () => {
      playSystemChime(800, 0.3);
      broadcastIdx = (broadcastIdx + 1) % constellationBroadcasts.length;
      tickerText.textContent = constellationBroadcasts[broadcastIdx];
      alert(`[STAR STREAM BROADCAST]\n${constellationBroadcasts[broadcastIdx]}`);
    });
  }

  /* ==========================================
     11. SCENARIO CASE STUDIES CATEGORY FILTER
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const scenarioCards = document.querySelectorAll('.scenario-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      scenarioCards.forEach((card) => {
        const cat = card.getAttribute('data-category');

        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 280);
        }
      });
    });
  });

  /* ==========================================
     12. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('active'));
  }

  /* ==========================================
     13. TRANSMIT STORY FRAGMENT FORM
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formFeedback.className = 'form-feedback';
      formFeedback.style.display = 'none';

      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your Incarnation or Reader name.';
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters.';
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        emailError.textContent = 'Star Stream frequency or email is required.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Message to Kim Dokja cannot be empty.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Your message must be at least 10 characters long.';
        isValid = false;
      }

      if (!isValid) return;

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Transmitting to neilofebrian@gmail.com across the Final Wall...</span>
      `;

      playSystemChime(440, 1.2);

      const isLocalFile = window.location.protocol === 'file:';

      const subjectVal = document.getElementById('subject')?.value.trim() || 'Story Fragment from a Reader';
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectVal,
        message: messageInput.value.trim(),
        _subject: `[Star Stream #BI-7623] Story Fragment: ${subjectVal} (From: ${nameInput.value.trim()})`,
        _captcha: "false",
        _template: "table"
      };

      if (isLocalFile) {
        // Local file protocol cannot make CORS requests to FormSubmit
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        playSystemChime(660, 0.8);

        formFeedback.innerHTML = `
          <div style="text-align: left; line-height: 1.6;">
            <strong style="color: #f59e0b;"><i class="fa-solid fa-triangle-exclamation"></i> Notice (Local File Detected):</strong><br>
            <span>You are opening this file directly as <code>file:///</code>. Form gateway APIs require a live web server to prevent spam.</span><br>
            <div style="margin-top: 0.75rem;">
              <strong>Choose one of these 2 ways to transmit:</strong><br>
              1. <strong>Use your live online website:</strong> <a href="https://puffilionrawr.github.io/Kim-Dokja/#contact" target="_blank" style="color: var(--primary-color); text-decoration: underline; font-weight: bold;">https://puffilionrawr.github.io/Kim-Dokja/</a><br>
              2. <strong>Or send directly via email:</strong> <a href="mailto:neilofebrian@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent('Sender: ' + formData.name + ' (' + formData.email + ')\n\n' + formData.message)}" style="color: var(--primary-color); text-decoration: underline; font-weight: bold;"><i class="fa-solid fa-envelope"></i> Open Email App to neilofebrian@gmail.com</a>
            </div>
          </div>
        `;
        formFeedback.className = 'form-feedback success';
        formFeedback.style.display = 'block';
        return;
      }

      fetch('https://formsubmit.co/ajax/neilofebrian@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        playSystemChime(880, 2.0);

        formFeedback.textContent = '✨ [Transmission Successful] Your story fragment has been sent to neilofebrian@gmail.com and reached Kim Dokja on the Subway train!';
        formFeedback.className = 'form-feedback success';
        formFeedback.style.display = 'block';

        contactForm.reset();

        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 12000);
      })
      .catch(error => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        playSystemChime(660, 1.0);

        formFeedback.innerHTML = `
          <span>Transmission encountered network interference. Click below to send directly from your email:</span><br>
          <a href="mailto:neilofebrian@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent('Sender: ' + formData.name + ' (' + formData.email + ')\n\n' + formData.message)}" style="color: var(--primary-color); text-decoration: underline; font-weight: bold; margin-top: 0.5rem; display: inline-block;">
            <i class="fa-solid fa-envelope"></i> Open Email Client to neilofebrian@gmail.com
          </a>
        `;
        formFeedback.className = 'form-feedback success';
        formFeedback.style.display = 'block';
      });
    });
  }

  /* ==========================================
     14. DYNAMIC CURRENT YEAR
     ========================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
