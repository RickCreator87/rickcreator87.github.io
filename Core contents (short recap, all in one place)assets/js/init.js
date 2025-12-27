```js
import { loadProjects } from './projects.js';
import { initSDKSelector } from './sdk.js';
import { initTheme } from './theme.js';

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadProjects();
  initSDKSelector();

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
'''
