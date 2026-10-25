(() => {
  'use strict';

  const starfield = document.getElementById('starfield');
  if (!starfield) return;

  const layers = {
    far:  starfield.querySelector('.star-layer--far'),
    mid:  starfield.querySelector('.star-layer--mid'),
    near: starfield.querySelector('.star-layer--near'),
  };

  if (!layers.far || !layers.mid || !layers.near) return;

  const TOTAL = 100;
  const fragmentFar  = document.createDocumentFragment();
  const fragmentMid  = document.createDocumentFragment();
  const fragmentNear = document.createDocumentFragment();

  const rand = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < TOTAL; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const roll = Math.random();
    let layer, size, opacity, driftRange, twinkleMin, twinkleMax;

    if (roll < 0.60) {
      layer = 'far';
      size = rand(0.5, 1.2);
      opacity = rand(0.15, 0.25);
      driftRange = 8;
      twinkleMin = 10;
      twinkleMax = 20;
      star.classList.add('star--far');
    } else if (roll < 0.90) {
      layer = 'mid';
      size = rand(1.0, 2.0);
      opacity = rand(0.35, 0.50);
      driftRange = 18;
      twinkleMin = 8;
      twinkleMax = 16;
      star.classList.add('star--mid');
    } else {
      layer = 'near';
      size = rand(1.5, 2.8);
      opacity = rand(0.70, 0.95);
      driftRange = 35;
      twinkleMin = 6;
      twinkleMax = 12;
      star.classList.add('star--near');
      if (Math.random() < 0.04) star.classList.add('star--accent');
    }

    // Size + opacity
    star.style.setProperty('--star-size', `${size.toFixed(2)}px`);
    star.style.setProperty('--star-base-opacity', opacity.toFixed(2));

    // Random position
    star.style.left = `${rand(0, 100)}%`;
    star.style.top  = `${rand(0, 100)}%`;

    // Random-direction drift (inline custom properties)
    const dx = rand(-driftRange, driftRange);
    const dy = rand(-driftRange, driftRange);
    star.style.setProperty(`--dx-${layer}`, `${dx.toFixed(1)}px`);
    star.style.setProperty(`--dy-${layer}`, `${dy.toFixed(1)}px`);

    // Twinkle timing (desynchronized)
    const twinkleDuration = rand(twinkleMin, twinkleMax);
    const twinkleDelay = rand(-20, 0);
    star.style.setProperty('--twinkle-duration', `${twinkleDuration.toFixed(1)}s`);
    star.style.setProperty('--twinkle-delay', `${twinkleDelay.toFixed(1)}s`);

    // Drift timing (mid/near only; far drifts too slowly to matter)
    if (layer !== 'far') {
      const driftDuration = rand(180, 400);
      const driftDelay = rand(-30, 0);
      star.style.setProperty('--drift-duration', `${driftDuration.toFixed(1)}s`);
      star.style.setProperty('--drift-delay', `${driftDelay.toFixed(1)}s`);
    } else {
      // Far layer: twinkle only, no visible drift
      star.style.setProperty('--drift-duration', '0s');
      star.style.setProperty('--drift-delay', '0s');
    }

    if (layer === 'far')       fragmentFar.appendChild(star);
    else if (layer === 'mid')  fragmentMid.appendChild(star);
    else                       fragmentNear.appendChild(star);
  }

  layers.far.appendChild(fragmentFar);
  layers.mid.appendChild(fragmentMid);
  layers.near.appendChild(fragmentNear);
})();
