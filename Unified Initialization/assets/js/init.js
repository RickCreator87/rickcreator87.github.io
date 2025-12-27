import { loadProjects } from './projects.js';
import { initSDKSelector } from './sdk.js';
import { initTheme } from './theme.js';

window.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initSDKSelector();
  initTheme();
});
