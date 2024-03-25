import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { ILogInUser } from "../types";

export default function useUser() {
    let { isLoading, data, isError } = useQuery<ILogInUser>({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
        refetchOnWindowFocus: false,
    });

    console.log("useUser - userLoading", isLoading);
    console.log("useUser - data", data);
    console.log("useUser - isLoggedIn", !isError);
    if (!isError) {
        localStorage.setItem('offNum', data?.data.user);
    }
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    };
}