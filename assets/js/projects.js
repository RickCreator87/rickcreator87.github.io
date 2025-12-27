export async function loadProjects() {
  const container = document.getElementById('projects');
  const data = await fetch('/data/projects.json').then(r => r.json());

  container.innerHTML = data.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <a href="${p.url}" target="_blank">View Repo</a>
      <div class="tags">${p.tags.map(t => <span>${t}</span>).join('')}</div>
    </div>
  `).join('');
}
