
assets/js/sdk.js (version selector)

```js
export async function initSDKSelector() {
  const langSelect = document.getElementById('sdk-lang');
  const versionSelect = document.getElementById('sdk-version');
  const output = document.getElementById('sdk-docs');

  if (!langSelect || !versionSelect || !output) return;

  let manifest;

  try {
    manifest = await fetch('data/sdk-versions.json').then((r) => r.json());
  } catch {
    output.innerHTML = '<p>Failed to load SDK manifest.</p>';
    return;
  }

  const languages = Object.keys(manifest);
  if (!languages.length) {
    output.innerHTML = '<p>No SDKs published yet.</p>';
    return;
  }

  langSelect.innerHTML = languages
    .map((lang) => <option value="${lang}">${lang}</option>)
    .join('');

  function setVersionsFor(lang) {
    const versions = manifest[lang] || [];
    versionSelect.innerHTML = versions
      .map((v) => <option value="${v}">${v}</option>)
      .join('');
    return versions[0];
  }

  async function loadDocs(lang, version) {
    try {
      const docs = await fetch(sdk/${lang}/${version}/docs.json).then((r) =>
        r.json()
      );

      const codeBlock = Array.isArray(docs.quickstart)
        ? docs.quickstart.join('\n')
        : '';

      output.innerHTML = `
        <div class="sdk-meta">
          <p><strong>${docs.language}</strong> · ${docs.version}</p>
          ${docs.install ? <p><code>${docs.install}</code></p> : ''}
        </div>
        ${
          codeBlock
            ? <pre><code>${escapeHtml(codeBlock)}</code></pre>
            : ''
        }
      `;
    } catch {
      output.innerHTML = '<p>Failed to load SDK docs.</p>';
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const initialLang = languages[0];
  langSelect.value = initialLang;
  const initialVersion = setVersionsFor(initialLang);
  loadDocs(initialLang, initialVersion);

  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    const version = setVersionsFor(lang);
    loadDocs(lang, version);
  });

  versionSelect.addEventListener('change', () => {
    loadDocs(langSelect.value, versionSelect.value);
  });
}
```
