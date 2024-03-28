import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { IUser } from "./types";

const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === "development" ?
            "https://localhost:5001/" :
            "https://backend.gracewaychurch.xyz/",
    withCredentials: true,
})


// Function to get the stored token from localStorage
const getToken = (): string | null => {
    return localStorage.getItem('logged_user');
};

// Set the Authorization header with the token for each request
let getHeaders = () => {
    const token = getToken();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};

export const getUsers = () => {
    const headers = getHeaders();
    return instance.get("UserRole/GetAllUsers/", { headers }).then((response) => response.data);
};
export const getUser = ({ queryKey }: QueryFunctionContext) => {
    const [_, userId] = queryKey;
    const headers = getHeaders();
    if (userId === undefined) return {} as IUser;
    return instance.get(`UserRole/GetUserById/${userId}`, { headers }).then((response) => response.data)
};

export const getRoles = () => {
    const headers = getHeaders();
    return instance.get("UserRole/GetAllRoles/", { headers }).then((response) => response.data);
};

export const getRole = ({ queryKey }: QueryFunctionContext) => {
    const [_, roleId] = queryKey;
    const headers = getHeaders();
    if (roleId === undefined) return {} as IUser;
    return instance.get(`UserRole/${roleId}`, { headers }).then((response) => response.data)
};

export const getAllPermissions = () => {
    const headers = getHeaders();
    return instance.get("UserRole/GetAllPermissions/", { headers }).then((response) => response.data);
};

//[Route("{PaintInventory/GetAll}")]
export const getAllPaintStocks = () => {
    const headers = getHeaders();
    return instance.get(`PaintInventory/GetAll`, { headers }).then((response) => response.data)
};

//[Route("{id}")]
export const getPaintById = ({ queryKey }: QueryFunctionContext) => {
    const headers = getHeaders();
    return instance.get(`PaintInventory/GetById/${queryKey[1]}`, { headers }).then((response) => response.data)
};

export const getMe = () => {
    const headers = getHeaders();
    // return instance.get(`Auth/GetMe`, { headers }).then((response) => response.data);
    const result = instance.get(`Auth/GetMe`, { headers }).then((response) => {
        //console.log("getMe", response.data);
        return response.data
    }).catch((error) => {
        // Handle errors here
        console.error(error);
        localStorage.removeItem("logged_user");
        localStorage.removeItem('offNum');
        throw error; // Rethrow the error to handle it in the calling code
    });
    return result;
};
export const logOut = () => instance.post(`users/log-out`).then((response) => response.data);

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

export const usernameLogIn = ({ username, password }: IUsernameLoginVariables) => {
    const data = {
        username: username,
        password: password
    };
    return instance.post(`Auth/Login`, data).then((response) => {
        // Handle the response here if needed
        console.log("response.data.data", response.data.data);
        if (response.data.success) {
            localStorage.setItem('logged_user', response.data.data);
        }
        return response.data; // This will return the data from the API response
    })
        .catch((error) => {
            // Handle errors here
            console.error(error);
            throw error; // Rethrow the error to handle it in the calling code
        });
};

export interface IUpdatePaintStock {
    colour: number;
    quantity: number;
}
export const updatePaintStock = (variable: IUpdatePaintStock) => {
    const headers = getHeaders();

    const result = instance
        .put(`PaintInventory`, variable, { headers })
        .then((response) => response.data)
        .catch((error) => {
            // Handle errors here
            console.error("updatePaintStock", error);
            throw error; // Rethrow the error to handle it in the calling code
        });
    return result;
};

export interface IUpdateUser {
    userId: number;
    username: string;
    roleId: number;
    isActive: boolean;
}
export const updateUser = (variable: IUpdateUser) => {
    const headers = getHeaders();

    const result = instance
        .put(`UserRole/UpdateUser`, variable, { headers })
        .then((response) => response.data)
        .catch((error) => {
            // Handle errors here
            console.error("updatePUser", error);
            throw error; // Rethrow the error to handle it in the calling code
        });
    return result;
};
