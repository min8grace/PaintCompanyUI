export enum PaintStatusType {
    Available = 1,
    RunningLow = 2,
    OutOfStock = 3,
}

export const getPaintStatusType = (type: number): string => {

    return PaintStatusType[type];
}



