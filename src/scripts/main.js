const THEMES = {
  LIGHT: {
    NAME: 'light',
    EMOJI: '💡',
  },
  DARK: {
    NAME: 'dark',
    EMOJI: '🕶',
  },
  BLACK: {
    NAME: 'black',
    EMOJI: '🔭',
  },
};

const buildButtons = () => {
  console.log('document: ', document);
  const themeToggleContainer = document.getElementById('theme-toggle-container');

  Object.values(THEMES)
    .forEach((THEME) => {
      const button = document.createElement('button');
      button.setAttribute('id', `${THEME.NAME}-theme-toggle`);
      button.setAttribute('class', 'theme-toggle button-reset');
      button.setAttribute('title', `Switch to ${THEME.NAME} theme`);
      button.textContent = THEME.EMOJI;
      themeToggleContainer.appendChild(button);
    });
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
  const themeName = (currentHour >= 19 || currentHour < 6) ? THEMES.DARK.NAME : THEMES.LIGHT.NAME;
  setTheme(themeName);
};

const bindClickHandlers = () => {
  Object.values(THEMES)
    .forEach((THEME) => {
      document.getElementById(`${THEME.NAME}-theme-toggle`).onclick = () => selectTheme(THEME.NAME);
    });
};

buildButtons();
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
