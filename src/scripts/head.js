// Intentionally render-blocking JavaScript
try {
  const themeName = localStorage.getItem('themeName');
  if (themeName) {
    document.documentElement.dataset.theme = themeName;
  }
} catch (err) {
  console.error('Error setting theme from localstorage: ', err);
}
