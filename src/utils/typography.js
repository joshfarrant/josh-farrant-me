import Typography from 'typography';

export default new Typography({
  includeNormalize: true,
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  googleFonts: [{
    name: 'Lato',
    styles: [100, 400, 700],
  }],
  headerFontFamily: ['Lato', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Lato', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  headerWeight: 100,
  overrideStyles: () => ({
    a: {
      textDecoration: 'none',
    },
  }),
});
