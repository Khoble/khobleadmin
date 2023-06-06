import { Card, CardHeader, CardContent, Grid, Box, TextField, IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles'
import KhobleTextField from "../atoms/KhobleTextField";
import { useState } from "react";
import EnterIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';
import KhobleLogo from "../atoms/KhobleLogo"
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
    item: {
        border: `1px solid limegreen`,
    },
    container: {
        border: `1px solid magenta`,
    }
}));

export default function Login({ language }: any) {
    const navigate = useNavigate();
    const theme = useTheme();

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
        >
            <Card
                sx={{ minWidth: "50%" }}
            >
                <CardContent
                    sx={{ textAlign: "center" }}
                >
                    <KhobleLogo 
                        width="150" 
                        strokeColor={ theme.palette.mode === "dark"? "white" : "black" }
                        strokeWidth="10" 
                        // leftFill="#d95766"
                        // leftOpacity={0.5}
                        // rightFill="#262640" 
                        // rightOpacity={0.5}
                        />
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