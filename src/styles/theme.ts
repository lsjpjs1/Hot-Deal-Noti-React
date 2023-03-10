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
  pc: customWidthMediaQuery(1440),
  mainBreak: customWidthMediaQuery(1000),
  introBreak800: customWidthMediaQuery(800),
  introBreak600: customWidthMediaQuery(600),
  introBreak500: customWidthMediaQuery(500),
  introBreak400: customWidthMediaQuery(400),
  introBreak300: customWidthMediaQuery(300),
  tablet: customWidthMediaQuery(768),
  mobile: customWidthMediaQuery(576),
  mobileBreak: customWidthMediaQuery(500),
};
export const heightMedia = {
  custom: customHeightMediaQuery,
  pc: customHeightMediaQuery(1440),
  mainBreak: customHeightMediaQuery(800),
  tablet: customHeightMediaQuery(768),
  imageBreak: customHeightMediaQuery(680),
  mobile: customHeightMediaQuery(576),
};
export const mixMedia = {
  custom: customMixMediaQuery,
  introBreak: customMixMediaQuery(420, 800),
  mainBreak: customMixMediaQuery(800, 800),
  imageBreak: customMixMediaQuery(1000, 620),
};
