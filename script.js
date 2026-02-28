/* ============================================
   HABIB'S RETRO HOMEPAGE - JavaScript
   Polished with frontend-design aesthetics
   ============================================ */

/* ---- EMAIL OBFUSCATION ---- */
function revealEmail(e) {
  e.preventDefault();
  var user = 'habib.redissi';
  var domain = 'gmail.com';
  var email = user + '@' + domain;
  var link = document.getElementById('email-link');
  var text = document.getElementById('email-text');
  link.href = 'mailto:' + email;
  text.textContent = email;
  link.onclick = null;
}

/* ---- BOOT SEQUENCE ---- */
(function bootSequence() {
  var bootScreen = document.getElementById('boot-screen');
  if (!bootScreen) return;

  var lines = bootScreen.querySelectorAll('.boot-line');
  var delay = 0;

  lines.forEach(function(line, i) {
    delay += (i === 0 ? 300 : (i < 3 ? 200 : (i === 8 ? 600 : 350)));
    setTimeout(function() {
      line.classList.add('visible');
    }, delay);
  });

  // Fade out boot screen and reveal page
  setTimeout(function() {
    bootScreen.classList.add('fade-out');
    document.querySelector('.header').classList.add('revealed');
    setTimeout(function() {
      bootScreen.style.display = 'none';
    }, 500);
  }, delay + 800);
})();

/* ---- VISITOR COUNTER ---- */
(function initVisitorCounter() {
  var countEl = document.getElementById('visitor-count');
  if (!countEl) return;

  var stored = localStorage.getItem('habib-visitor-count');
  var count;

  if (stored) {
    count = parseInt(stored, 10) + 1;
  } else {
    count = Math.floor(Math.random() * 5000) + 8000;
  }

  localStorage.setItem('habib-visitor-count', count);
  countEl.textContent = count.toString().padStart(7, '0').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
})();

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

/* ---- SCROLL REVEAL ANIMATIONS ---- */
(function scrollReveal() {
  var panels = document.querySelectorAll('.panel, .now-playing');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  panels.forEach(function(panel) {
    observer.observe(panel);
  });
})();

/* ---- STAT BAR ANIMATION ON SCROLL ---- */
(function animateStatBars() {
  var statFills = document.querySelectorAll('.stat-fill');

  // Store target widths and reset to 0
  statFills.forEach(function(fill) {
    var targetWidth = fill.style.width;
    fill.style.setProperty('--target-width', targetWidth);
    fill.style.width = '0';
  });

  var skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        statFills.forEach(function(fill, index) {
          setTimeout(function() {
            fill.classList.add('animated');
          }, index * 150);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
})();

/* ---- TOGGLE OLDER POSTS ---- */
function toggleOlderPosts() {
  var olderPosts = document.getElementById('older-posts');
  var btn = document.getElementById('show-older-btn');

  if (olderPosts.classList.contains('hidden')) {
    olderPosts.classList.remove('hidden');
    btn.textContent = '<< Hide older posts >>';
  } else {
    olderPosts.classList.add('hidden');
    btn.textContent = '>> Show older posts (2 more) <<';
  }
}

/* ---- WINDOW CLOSE EASTER EGG ---- */
document.querySelectorAll('.win-close, .win-close-sm').forEach(function(btn) {
  btn.style.cursor = 'pointer';
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var panel = this.closest('.panel') || this.closest('.project-window');
    if (panel) {
      panel.style.transition = 'opacity 0.3s, transform 0.3s';
      panel.style.opacity = '0';
      panel.style.transform = 'scale(0.95)';
      setTimeout(function() {
        panel.style.display = 'none';
        setTimeout(function() {
          panel.style.display = '';
          panel.style.opacity = '1';
          panel.style.transform = 'scale(1)';
        }, 2000);
      }, 300);
    }
  });
});

/* ---- STATUS LINE ROTATION ---- */
(function statusTyping() {
  var statusEl = document.querySelector('.status-text');
  if (!statusEl) return;

  var messages = [
    'Status: Open to new opportunities',
    'Status: Building cool stuff',
    'Status: Shipping code daily',
    'Status: 10+ years and counting',
    'Status: Open to new opportunities'
  ];
  var msgIndex = 0;

  setInterval(function() {
    msgIndex = (msgIndex + 1) % messages.length;
    statusEl.style.opacity = '0';
    setTimeout(function() {
      statusEl.textContent = messages[msgIndex];
      statusEl.style.opacity = '1';
    }, 300);
  }, 5000);
})();

/* ---- SPARKLE CURSOR TRAIL ---- */
(function sparkleTrail() {
  var sparkles = ['\u2726', '\u2727', '\u2728', '\u2729', '\u2605', '\u2606', '\u00B7'];
  var colors = ['#FFD700', '#FF6B6B', '#4ADE80', '#60A5FA', '#F472B6', '#A78BFA'];
  var throttle = 0;

  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - throttle < 60) return;
    throttle = now;

    var sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.setProperty('--dx', (Math.random() - 0.5) * 40 + 'px');
    sparkle.style.setProperty('--dy', (Math.random() * -30 - 10) + 'px');
    sparkle.style.fontSize = (10 + Math.random() * 10) + 'px';
    document.body.appendChild(sparkle);

    setTimeout(function() {
      sparkle.remove();
    }, 800);
  });
})();

/* ---- NOW PLAYING - MySpace Music Widget ---- */
(function nowPlaying() {
  var songs = [
    { title: 'Harder, Better, Faster, Stronger', artist: 'Daft Punk' },
    { title: 'Around the World', artist: 'Daft Punk' },
    { title: 'Bohemian Rhapsody', artist: 'Queen' },
    { title: 'Billie Jean', artist: 'Michael Jackson' },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
    { title: 'Mr. Brightside', artist: 'The Killers' },
    { title: 'Lose Yourself', artist: 'Eminem' },
    { title: 'Get Lucky', artist: 'Daft Punk ft. Pharrell' }
  ];

  var currentIndex = 0;
  var songEl = document.getElementById('np-song');
  var artistEl = document.getElementById('np-artist');
  var playBtn = document.getElementById('np-play');
  var prevBtn = document.getElementById('np-prev');
  var nextBtn = document.getElementById('np-next');
  var bars = document.querySelectorAll('.np-bar');
  var playing = true;

  if (!songEl || !artistEl) return;

  function updateSong() {
    songEl.textContent = songs[currentIndex].title;
    artistEl.textContent = songs[currentIndex].artist;
  }

  function togglePlay() {
    playing = !playing;
    playBtn.textContent = playing ? '\u25B6' : '\u23F8';
    playBtn.classList.toggle('active', playing);
    bars.forEach(function(bar) {
      bar.style.animationPlayState = playing ? 'running' : 'paused';
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    updateSong();
  });

  if (nextBtn) nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % songs.length;
    updateSong();
  });

  if (playBtn) playBtn.addEventListener('click', togglePlay);

  // Auto-rotate songs
  setInterval(function() {
    if (playing) {
      currentIndex = (currentIndex + 1) % songs.length;
      updateSong();
    }
  }, 12000);
})();
