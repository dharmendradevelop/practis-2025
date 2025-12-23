gsap.registerPlugin(ScrollTrigger);

// add js for slide up 4 section

const sections = gsap.utils.toArray("main .strategy-section");

sections.forEach((sect, i) => {
  const inner = sect.querySelector(".strategy-inner");
  const isLast = i === sections.length - 1;

  gsap.set(inner, {
    transformOrigin: "top 50%",
    transformStyle: "preserve-3d",
  });

  if (isLast) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sect,
      start: "top 5%",
      end: "bottom top",
      scrub: 1,
      pin: true,
      pinSpacing: false,
      // markers: true
    },
  });

  tl.to(
    inner,
    {
      scale: 0.8,
      rotate: i === 0 ? -2 : -0.8,
      rotateX: 10,
      ease: "none",
    },
    0
  ).to(inner, {
    opacity: 0,
    ease: "none",
    duration: 0.2,
  });
});

window.addEventListener("load", () => ScrollTrigger.refresh());

// #####  End

// Add Animation for 4 cards

const entryAnims = [
  {
    from: { opacity: 0, scale: 0.8, rotation: 0 },
    to: {
      opacity: 1,
      scale: 1,
      rotation: 2,
      duration: 1.2,
      ease: "power4.out",
    },
  },
  {
    from: { opacity: 0, scale: 0.8, rotation: 0 },
    to: {
      opacity: 1,
      scale: 1,
      rotation: -3,
      duration: 1.3,
      ease: "power2.out",
    },
  },
  {
    from: { opacity: 0, scale: 0.8, rotation: 0 },
    to: {
      opacity: 1,
      scale: 1,
      rotation: 6,
      duration: 1.4,
      ease: "power3.out",
    },
  },
  {
    from: { opacity: 0, scale: 0.8, rotation: 0 },
    to: {
      opacity: 1,
      scale: 1,
      rotation: -4,
      duration: 1.5,
      ease: "power4.out",
    },
  },
];

const hoverAnims = [
  {
    scale: 1.05,
    rotation: -2,
    rotationY: 5,
    duration: 0.6,
    ease: "power2.out",
  },
  {
    scale: 1.04,
    rotation: 3,
    rotationX: -3,
    duration: 0.6,
    ease: "power2.out",
  },
  {
    scale: 1.06,
    rotation: 4,
    rotationY: -4,
    rotationX: 2,
    duration: 0.6,
    ease: "power2.out",
  },
  {
    scale: 1.05,
    rotation: -3,
    rotationY: 6,
    duration: 0.6,
    ease: "power2.out",
  },
  {
    scale: 1.07,
    rotation: 5,
    rotationX: -2,
    rotationY: 3,
    duration: 0.7,
    ease: "power2.out",
  },
  {
    scale: 1.04,
    rotation: -4,
    rotationY: -5,
    duration: 0.6,
    ease: "power2.out",
  },
  { scale: 1.06, rotation: 6, rotationX: 3, duration: 0.6, ease: "power2.out" },
  {
    scale: 1.05,
    rotation: -2,
    rotationY: 4,
    rotationX: -2,
    duration: 0.6,
    ease: "power2.out",
  },
];

function initCardAnimations() {
  const cards = document.querySelectorAll(".results-card");
  const parent = document.querySelector(".card_prt_0");

  if (!cards.length) return console.warn("No .results-card found");

  cards.forEach((card, i) => {
    card.style.position = "relative";

    const entry = entryAnims[Math.floor(Math.random() * entryAnims.length)];
    const hover = hoverAnims[Math.floor(Math.random() * hoverAnims.length)];

    gsap.set(card, {
      ...entry.from,
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
      transformOrigin: "center",
    });

    gsap.to(card, { ...entry.to, delay: i * 0.2 });

    // HOVER: scale + spread cards apart
    card.addEventListener("mouseenter", () => {
      // Animate hover card
      gsap.to(card, { ...hover, y: 0, zIndex: 10 });

      // Give hover card big margin
      gsap.to(card, { marginLeft: 35, marginRight: 35, duration: 0.5 });

      // Move siblings slightly
      cards.forEach((c) => {
        if (c !== card) {
          gsap.to(c, { marginLeft: 0, marginRight: 0, duration: 0.5 });
        }
      });
    });

    // LEAVE: reset all margins + rotations

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        rotation: entry.to.rotation,
        rotationX: 0,
        rotationY: 0,
        y: 0,
        z: 0,
        zIndex: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset all margins
      
      cards.forEach((c) => {
        gsap.to(c, { marginLeft: 0, marginRight: 0, duration: 0.3 });
      });
    });

    gsap.to(card, {
      duration: 2 + i * 0.3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCardAnimations);
} else {
  initCardAnimations();
}

document.addEventListener("keydown", (e) => {
  if ((e.key === "r" || e.key === "R") && e.ctrlKey) {
    e.preventDefault();
    location.reload();
  }
});

// add Animation on hover

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card.querySelectorAll(".ar2"), {
      zIndex: 24,
      duration: 0.1,
      ease: "power2.out",
    });
    gsap.to(card, {
      rotation: -5,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(card.querySelectorAll(".ar1 p span, .ar2 p span"), {
      x: 35,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card.querySelectorAll(".ar2"), {
      zIndex: 1,
      duration: 0.1,
      ease: "power2.out",
    });

    gsap.to(card, {
      rotation: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(card.querySelectorAll(".ar1 p span,.ar2 p span"), {
      x: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});



gsap.registerPlugin(ScrollTrigger);

(async function() {
  const container = document.querySelector('.prt-card');
  if (!container) return;

  // Read gap from CSS (fallback to 60)
  const computed = getComputedStyle(container);
  const gap = parseFloat(computed.gap) || 60;

  // Grab original items
  const origItems = Array.from(container.querySelectorAll('.slide-crd-item'));
  if (origItems.length === 0) return;

  // Create inner wrapper and move original items into it
  const inner = document.createElement('div');
  inner.className = 'marquee-inner';
  inner.style.display = 'flex';
  inner.style.gap = gap + 'px';

  origItems.forEach(item => inner.appendChild(item));
  // Clear container and append inner
  container.innerHTML = '';
  container.appendChild(inner);

  // Clone children once for seamless looping
  const children = Array.from(inner.children);
  children.forEach(child => inner.appendChild(child.cloneNode(true)));

  // Wait for images to load (important for correct measurement)
  const imgs = inner.querySelectorAll('img');
  await Promise.all(Array.from(imgs).map(img => new Promise(res => {
    if (img.complete && img.naturalWidth !== 0) return res();
    img.onload = img.onerror = res;
  })));

  // Measure width of the original set (half of inner.scrollWidth)
  const totalInnerWidth = inner.scrollWidth;       // full width (original + clone)
  const originalWidth = totalInnerWidth / 2;      // width of just the original set

  // Choose speed in pixels per second (adjust as desired)
  const speedPxPerSec = 120; // 120px/sec — change to make faster/slower
  const duration = originalWidth / speedPxPerSec;

  // Ensure inner is positioned correctly
  gsap.set(inner, { x: 0 });

  // Create the looping tween
  const tl = gsap.to(inner, {
    x: -originalWidth,
    duration: duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      // keep transform values precise (not strictly necessary here)
      x: gsap.utils.unitize(x => parseFloat(x))
    }
  });

  // Pause on hover (optional)
  container.addEventListener('mouseenter', () => tl.pause());
  container.addEventListener('mouseleave', () => tl.play());

})(); 

