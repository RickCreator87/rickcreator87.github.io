```js
export async function loadProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  try {
    const projects = await fetch('data/projects.json').then((r) => r.json());

    if (!Array.isArray(projects) || projects.length === 0) {
      container.innerHTML = '<p>No projects found yet.</p>';
      return;
    }

    container.innerHTML = projects
      .map(
        (p) => `
      <article class="card">
        <h3>${p.name}</h3>
        <p>${p.description ?? ''}</p>
        <a href="${p.url}" target="_blank" rel="noreferrer">
          View on GitHub
        </a>
        ${
          p.tags && p.tags.length
            ? `<div class="tags">${p.tags
                .map((t) => <span>${t}</span>)
                .join('')}</div>`
            : ''
        }
      </article>
    `
      )
      .join('');
  } catch (e) {
    container.innerHTML = '<p>Failed to load projects.</p>';
  }
}
```
