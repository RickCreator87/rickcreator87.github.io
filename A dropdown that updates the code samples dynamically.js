function loadSDK(lang, version) {
  fetch(/sdk/${lang}/${version}/docs.json)
    .then(res => res.json())
    .then(renderDocs);
}
