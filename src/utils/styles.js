export const COLORS = {
  BLACK: '#070507',
  DARKEST_GREY: '#1E1E1F',
  DARK_GREY: '#424143',
  MEDIUM_GREY: '#67666A',
  LIGHT_GREY: '#807F83',
  LIGHTEST_GREY: '#CBC9CF',
  WHITE: '#ffffff',
  YELLOW: '#f1c40f',
  GREEN: '#26de81',
  BLUE: '#12CBC4',
  PINK: '#D980FA',
  RED: '#ED4C67',
  get PRIMARY() {
    return this.YELLOW;
  },
};

export const BREAKPOINTS = {
  XSMALL: '440px',
  SMALL: '740px',
};

export const FONT_WEIGHT = {
  LIGHT: 100,
  REGULAR: 400,
  BOLD: 700,
};

const buildMediaQuery = breakpoint => rules => `
  @media (max-width: ${breakpoint}) {
    ${rules}
  }
`;

export const MEDIA = {
  XSMALL: buildMediaQuery(BREAKPOINTS.XSMALL),
  SMALL: buildMediaQuery(BREAKPOINTS.SMALL),
};

export const buildKeyframes = (options, propertyName = 'color', smooth = false) => {
  const optionsCount = options.length;
  return options.reduce((a, c, i) => {
    const percentageStart = i === 0 ? '0%, 100%' : `${i * (100 / optionsCount)}%`;
    const percentageEnd = `${((i + 1) * (100 / optionsCount)) - 1}%`;
    const rule = `{ ${propertyName}: ${c}; }`;

    return `
      ${a}
      ${percentageStart} ${rule}
      ${smooth ? '' : `${percentageEnd} ${rule}`}
    `;
  }, '');
};
