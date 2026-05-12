import { createIcons, Map, Info, Moon, Sun, Save, X } from 'lucide';

const icons = {
  Map,
  Info,
  Moon,
  Sun,
  Save,
  X
};

function initIcons() {
  createIcons({ icons });
}

// Expose to window so game.js can call it
window.lucide = {
  createIcons: initIcons
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIcons);
} else {
  initIcons();
}