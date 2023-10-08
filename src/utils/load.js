
/**
 * Smoothload action, from Rich Harris' Svelteflix repo 
 * https://github.com/Rich-Harris/svelteflix/blob/main/src/lib/actions.ts
 */

export function smoothload(node) {
  function load() {
    if (node.naturalWidth) return;

    node.style.opacity = '0';
    node.style.transition = 'opacity 0.4s';

    node.addEventListener('load', () => {
      node.style.opacity = '1';
    }, {
      once: true
    })
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'src') {
        load();
      }
    }
  });

  observer.observe(node, {
    attributes: true
  });

  load();

  return {
    destroy() {
      observer.disconnect();
    }
  }
}