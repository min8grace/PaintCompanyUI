export interface IUser {
    data: IDetailUser;
    success: boolean;
    message: string;
}

export interface IUsers {
    data: IDetailUser[];
    success: boolean;
    message: string;
}

export interface IDetailUser {
    userId: number;
    username: string;
    roleId: number;
    isActive: boolean;
}


export interface IRole {
    data: IDetailRole;
    success: boolean;
    message: string;
}

export interface IRoles {
    data: IDetailRole[];
    success: boolean;
    message: string;
}

export interface IDetailRole {
    roleId: number;
    roleName: string;
    userRolePermissions: IDetailIPermission[];
    allPermissions: string;
}

export interface IPermission {
    data: IDetailIPermission;
    success: boolean;
    message: string;
}

export interface IPermissions {
    data: IDetailIPermission[];
    success: boolean;
    message: string;
}

export interface IDetailIPermission {
    permissionId: number;
    name: string;
}


export interface IPaintStock {
    data: IDetailPaintStock;
    success: boolean;
    message: string;
}

export interface IPaintStocks {
    data: IDetailPaintStock[];
    success: boolean;
    message: string;
}
export interface IDetailPaintStock {
    colour: number;
    quantity: number;
    paintStatus: number;
    edit: number;
}




export interface ILogInUser {
    data: ILogInUserDetail;
}

export interface ILogInUserUser {
    userId: number;
    username: string;
    roleId: number;
    isActive: boolean;
}

export interface ILogin {
    data: string;
    success: boolean;
    message: string;
}

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}
export interface IUsernameLoginSuccess {
    data?: string;
}
export interface IUsernameLoginError {
    data?: string;
    success: boolean;
    message: string;
}

// public PaintColourType Colour { get; set; }
// public int Quantity { get; set; }
// public PaintStatusType PaintStatus { get; set; }

export interface IPaintInventory {
    Colour?: number;
    Quantity: boolean;
    PaintStatus: number;
}