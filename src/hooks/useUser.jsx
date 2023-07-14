import { useContext } from "react";
import { UserContext } from "../UserContext";

export function useUser() {
    const { user, loginUser, logoutUser } = useContext(UserContext)

    return {
        user,
        loginUser,
        logoutUser
    }
}