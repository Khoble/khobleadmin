import { Card, CardHeader, CardContent, Grid, Box, TextField, IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles'
import KhobleTextField from "../atoms/KhobleTextField";
import { useState } from "react";
import EnterIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';
import KhobleLogoComponent from "../atoms/KhobleLogo"
import { useTheme } from '@mui/material/styles';
import KhobleLogoGradient from "../../../public/khoble_logo_darkmode_gradient.svg"
import KhobleLogo from "../../../public/khoble_magenta_blue_separate_paths.svg"

export default function Login({ language }: any) {
    const navigate = useNavigate();
    const theme = useTheme();
    const themeIsDark = theme.palette.mode === "dark"

    const [loginErrorMessage, setLoginErrorMessage] = useState(
        language === "english" ?
            "Invalid credentials" :
            language === "español" ?
                "Credenciales inválidas" :
                ""
    )

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            minWidth="100vw"
            minHeight="100vh"
            sx={{backgroundColor: `${themeIsDark? "initial" : "white"}`}}
        >
            <Card
                variant={themeIsDark? "elevation" : "outlined"}
                sx={{ minWidth: "50%" }}
            >
                <CardContent
                    sx={{ textAlign: "center" }}
                >
                    {/* <KhobleLogoComponent 
                        width="150" 
                        strokeColor={ themeIsDark? "white" : "black" }
                        strokeWidth="10" 
                        // leftFill="#d95766"
                        // leftOpacity={0.5}
                        // rightFill="#262640" 
                        // rightOpacity={0.5}
                        /> */}
                    <img src={themeIsDark? KhobleLogoGradient : KhobleLogo} width="150px"></img>
                    <div>
                        <KhobleTextField label={
                            language === "english" ?
                                "Email" :
                                language === "español" ?
                                    "Correo" :
                                    ""
                        }
                            width="300px"
                        />
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <KhobleTextField
                            type={"password"}
                            helperText={loginErrorMessage}
                            label={
                                language === "english" ?
                                    "Password" :
                                    language === "español" ?
                                        "Contraseña" :
                                        ""
                            }
                            width="300px"
                        />
                        <IconButton 
                            sx={{ position: "absolute", marginTop: "8px" }}
                            onClick={() => {navigate("/general")}}
                        >
                            <EnterIcon style={{ color: "#5c5c5c" }} />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        </Grid >
    );
}