export enum PaintColourType {
    Blue = 1,
    Grey = 2,
    Black = 3,
    White = 4,
    Purple = 5
}
export const getPaintColourType = (type: number): string => {

    return PaintColourType[type];
}


