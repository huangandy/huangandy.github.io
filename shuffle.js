(function () {
  const grid = document.getElementById('app-grid');
  const cards = Array.from(grid.querySelectorAll('.app-card'));

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Span pattern pool — each array sums to multiples of 12
  const patterns = [
    [7, 5, 5, 7, 12, 6, 6, 4, 8],
    [5, 7, 7, 5, 6, 6, 12, 8, 4],
    [8, 4, 4, 8, 12, 6, 6, 5, 7],
    [6, 6, 12, 7, 5, 4, 8, 7, 5],
    [12, 5, 7, 6, 6, 8, 4, 5, 7],
    [4, 8, 6, 6, 7, 5, 12, 7, 5],
    [7, 5, 12, 6, 6, 5, 7, 8, 4],
  ];
  const spans = patterns[Math.floor(Math.random() * patterns.length)];

  // Clear and re-insert shuffled cards
  grid.innerHTML = '';
  cards.forEach((card, i) => {
    const span = spans[i];

    // Reset span classes
    card.className = card.className.replace(/\bspan-\d+\b/g, '').replace(/\blayout-h\b/g, '').trim();
    card.classList.add('app-card', `span-${span}`);

    // Wide cards get horizontal layout
    if (span >= 7) card.classList.add('layout-h');

    // Apply glow color
    const glowEl = card.querySelector('.app-glow');
    const color = card.dataset.glow;
    if (glowEl && color) {
      const pos = span >= 7 ? '0% 50%' : '50% 0%';
      glowEl.style.background = `radial-gradient(circle at ${pos}, ${color}, transparent 60%)`;
    }

    grid.appendChild(card);
  });
})();
