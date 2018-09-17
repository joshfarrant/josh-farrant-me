const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

const setTheme = (themeName) => {
  document.documentElement.dataset.theme = themeName;
  localStorage.setItem('themeName', themeName);
};

const selectTheme = (themeName) => {
  localStorage.setItem('userChoseTheme', true);
  setTheme(themeName);
};

const setInitialTheme = () => {
  if (localStorage.getItem('userChoseTheme')) return;

  const currentHour = new Date().getHours();
  const themeName = (currentHour >= 19 || currentHour < 6) ? THEMES.DARK : THEMES.LIGHT;
  setTheme(themeName);
};

const bindClickHandlers = () => {
  document.getElementById('light-theme-toggle').onclick = () => selectTheme(THEMES.LIGHT);
  document.getElementById('dark-theme-toggle').onclick = () => selectTheme(THEMES.DARK);
};

bindClickHandlers();

try {
  setInitialTheme();
} catch (err) {
  // If this fails, no biggie!
  console.error('Error setting theme: ', err);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
