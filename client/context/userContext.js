import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";



const UserContext = React.createContext();

// Provider pattern: https://medium.com/@vitorbritto/react-design-patterns-provider-pattern-b273ba665158
export const UserContextProvider = ({ children }) => {
    const serverUrl = "http://localhost:8000"

    const router = useRouter()

    const [user, setUser] = useState({})
    const [userState, setUserState] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(true)


    //register user
    const registerUser = async (e) => {
        e.preventDefault();
        if (
            !userState.email.includes("@") ||
            !userState.password ||
            userState.password.length < 6
        ) {
            toast.error("Please enter a valid email and password (min 6 characters)");
            return;
        }


        try {
            const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
            console.log("User registered successfully", res.data);
            toast.success("User registered successfully");

            // clear the form
            setUserState({
                name: "",
                email: "",
                password: "",
            });

            // redirect to login page
            router.push("/login");
        } catch (error) {
            console.log("Error registering user", error);
            toast.error(error.response.data.message);
        }
    };
    //coneowneovnowievoiw
    //canwjnoni@gamil.com
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${serverUrl}/api/v1/login`, {
                email: userState.email,
                password: userState.password,
            },
                {
                    withCredentials: true, // send cookies to the server
                });
            toast.success("User logged successfully");

            // clear the form
            setUserState({
                email: "",
                password: "",
            });

            // refresh the user details
            await getUser(); // fetch before redirecting

            // push user to the
            router.push("/");
        } catch (error) {
            console.log("Error logging in user", error);
            toast.error(error.response.data.message);
        }
    };

    const logoutUser = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/v1/logout`, {
                withCredentials: true, // send cookies to the server
            });

            toast.success("User logged out successfully");

            // redirect to login page
            router.push("/login");
        } catch (error) {
            console.log("Error logging out user", error);
            toast.error(error.response.data.message);
        }
    };

    // get user details
    const getUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/api/v1/user`, {
                withCredentials: true, // send cookies to the server
            });

            setUser((prevState) => {
                return {
                    ...prevState,
                    ...res.data,
                };
            });

            setLoading(false);
        } catch (error) {
            console.log("Error getting user details", error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const updateUser = async (e, data) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
                withCredentials: true, // send cookies to the server
            });

            // update the user state
            setUser((prevState) => {
                return {
                    ...prevState,
                    ...res.data,
                };
            });

            toast.success("User updated successfully");

            setLoading(false);
        } catch (error) {
            console.log("Error updating user details", error);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    const userLoginStatus = async () => {
        let loggedIn = false;
        try {
            const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
                withCredentials: true, // send cookies to the server
            });

            // coerce the string to boolean
            loggedIn = !!res.data;
            setLoading(false);

            if (!loggedIn) {
                router.push("/login");
            }
        } catch (error) {
            console.log("Error getting user login status", error);
        }

        console.log("user login status", loggedIn);


        return loggedIn;
    };

    // dynamic form handler
    const handlerUserInput = (name) => (e) => {
        const value = e.target.value;

        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const loginStatusGetUser = async () => {
            const isLoggedIn = await userLoginStatus();

            if (isLoggedIn) {
                await getUser();
            }
        };

        loginStatusGetUser();
    }, []);

    return (
        <UserContext.Provider value={{ registerUser, userState, handlerUserInput, loginUser, logoutUser, userLoginStatus, user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};