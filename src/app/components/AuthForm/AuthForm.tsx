"use client";

import React, { useState } from "react";
import { Paper, Box, Button, Typography } from "@mui/material";
import DataInput from "../DataInput/DataInput";
import { useForm } from "react-hook-form";
import { TCredentials } from "@/types";
import { auth } from "@/api/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidationSchema } from "./AuthFormTypes";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { setToken } from "@/store/dataSlice";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const inputStyles: React.CSSProperties = {
  border: "1px solid #b8b7b7",
  borderRadius: "10px",
  padding: "5px",
};

function AuthForm({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(authValidationSchema),
    mode: "all",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (data: TCredentials) => {
    setIsLoading(true);
    const res = await auth(data);
    localStorage.setItem("token", res.data.data.token);
    dispatch(setToken(res.data.data.token));
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Paper
      sx={{
        width: "600px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
      }}
    >
      <Typography variant="h4">Авторизация</Typography>
      <Box width="100%" paddingX="20px" position="relative">
        <DataInput
          control={control}
          name="username"
          placeholder="Логин"
          errors={errors}
          disableUnderline
          sx={{ width: "100%", ...inputStyles }}
        />
        <DataInput
          control={control}
          name="password"
          placeholder="Пароль"
          errors={errors}
          type="password"
          disableUnderline
          sx={{
            width: "100%",
            marginTop: "30px",
            ...inputStyles,
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ width: "200px" }}
        onClick={handleSubmit(handleAuth)}
        color="inherit"
      >
        {isLoading ? (
          <CircularProgress size="24px" color="inherit" />
        ) : (
          <Typography component="span" fontWeight="bold">
            Войти
          </Typography>
        )}
      </Button>
    </Paper>
  );
}

export default AuthForm;
