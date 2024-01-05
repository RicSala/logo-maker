// Color.ts
export type Color = {
    hex: string;
    rgb: ColorRGB;
    hsv: ColorHSV;
};
export type ColorRGB = {
    r: number;
    g: number;
    b: number;
};
export type ColorHSV = {
    h: number;
    s: number;
    v: number;
};
