```js
export async function initSDKSelector() {
  const versions = await fetch('/data/sdk-versions.json').then(r => r.json());
  const langSelect = document.getElementById('sdk-lang');
  const versionSelect = document.getElementById('sdk-version');
  const output = document.getElementById('sdk-docs');

  langSelect.onchange = () => {
    const lang = langSelect.value;
    versionSelect.innerHTML = versions[lang]
      .map(v => <option value="${v}">${v}</option>)
      .join('');
    loadDocs(lang, versions[lang][0]);
  };

  versionSelect.onchange = () => {
    loadDocs(langSelect.value, versionSelect.value);
  };

  async function loadDocs(lang, version) {
    const docs = await fetch(/sdk/${lang}/${version}/docs.json).then(r => r.json());
    output.innerHTML = <pre>${JSON.stringify(docs, null, 2)}</pre>;
  }
}
```
