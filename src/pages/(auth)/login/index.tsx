"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { Button, Input } from "@components";
import { loginSchema } from "@validations";
import { apiService } from "@services";
import { useForm, useUser } from "@hooks";
import { LoginResponse, JWTPayload, UserData, APIError } from "@interfaces";

import { jwtDecode } from "jwt-decode";

const LoginPage: React.FC = () => {
    const { formData, errors, handleChange, validate, setErrors } = useForm(
        { email: "", password: "" },
        loginSchema
    );

    const { userData, login } = useUser();

    const handleSubmit = async () => {
        const errors = validate();
        setErrors(errors || {});
        if (errors) return;

        const data = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const result: LoginResponse = await apiService.post(
                "auth/login",
                data
            );

            const token = result["token"];

            const decodedToken: JWTPayload = jwtDecode(token);

            const userData: UserData = {
                name: decodedToken.name,
                role: decodedToken.role,
                token: token,
            };

            login(userData);

            toast.success("Logged in successfully!");
        } catch (e) {
            const error = e as APIError;
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (userData) {
            redirect("/dashboard");
        }
    }, [userData]);

    return (
        <div className="bg-img bg-center bg-no-repeat bg-cover min-h-screen w-full flex justify-center items-center">
            <form className="drop-blur-lg bg-white bg-opacity-40 backdrop-blur-lg w-[80vw] lg:w-[30vw] pb-20 mx-auto mt-[30%] lg:mt-[8%] shadow-lg rounded-xl bg-clip-padding flex flex-col items-center">
                <h2 className="w-full text-center bg-primary text-white font-bold text-xl md:text-xl mb-2 rounded-t-lg py-1">
                    Sign in
                </h2>

                <div className="w-4/5">
                    <Input
                        name="email"
                        label="Email"
                        required={true}
                        value={formData.email}
                        handleChange={handleChange}
                        error={errors.email}
                    />
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        required={true}
                        value={formData.password}
                        handleChange={handleChange}
                        error={errors.password}
                    />
                </div>

                <div className="w-4/5 mt-4">
                    <Button
                        className="w-full"
                        handleClick={handleSubmit}
                        text="Login"
                    />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
