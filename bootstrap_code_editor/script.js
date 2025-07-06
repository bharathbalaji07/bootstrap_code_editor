function runEditor() {
  const html = document.getElementById("htmlCode").value;
  const css = document.getElementById("cssCode").value;
  const js = document.getElementById("jsCode").value;

  const result = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}<\/script>
</body>
</html>
  `;

  const iframe = document.getElementById("outputFrame");
  iframe.srcdoc = result;
}

// Auto-run on load
window.onload = runEditor;
