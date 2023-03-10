export const theme = {
  color: {
    white: "#fff",
    black: "black",
  },
  boxShadow: {
    normal: "0 3px 8px 0 rgb(0 0 0 / 10%)",
  },
};

export const fonts = {
  family: {
    LINESeedKRThin: `'LINESeedKR-Th', sans-serif;`,
    LINESeedKRRegular: `'LINESeedKR-Rg', sans-serif;`,
    LINESeedKRBold: `'LINESeedKR-Bd', sans-serif;`,
  },
  size: {
    medium: "1.5rem", // 28px
    small: "1.3rem", // 28px
  },
  color: {
    lightGray: "#78797A",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const customWidthMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;
const customHeightMediaQuery = (maxHeight: number): string =>
  `@media (max-height: ${maxHeight}px)`;
const customMixMediaQuery = (maxWidth: number, maxHeight: number): string =>
  `@media (max-width: ${maxWidth}px) and (max-height: ${maxHeight}px)`;

export const widthMedia = {
  custom: customWidthMediaQuery,
  pc: customWidthMediaQuery(1320),
  mobile: customWidthMediaQuery(600),
};
export const heightMedia = {
  custom: customHeightMediaQuery,
  pc: customHeightMediaQuery(1320),
  mobile: customHeightMediaQuery(600),
};
export const mixMedia = {
  custom: customMixMediaQuery,
  introBreak: customMixMediaQuery(420, 800),
};
