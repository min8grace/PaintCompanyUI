
export enum RoleType {
    Viewer = 1,
    Manager = 2,
    Painter = 3,
    Admin = 4,
}
export const getRoleType = (type: number): string => {

    return RoleType[type];
}


