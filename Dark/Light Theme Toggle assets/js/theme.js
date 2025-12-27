```js
export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-theme', saved);

  toggle.onclick = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };
}
```
