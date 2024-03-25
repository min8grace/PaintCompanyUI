
export enum PermissionType {
    ViewInventory = 1,
    UpdateInventory = 2,
    ManageUsers = 3,
}
export const getPermissionType = (type: number): string => {

    return PermissionType[type];
}


