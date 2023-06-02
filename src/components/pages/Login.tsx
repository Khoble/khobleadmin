import { Card, CardHeader, CardContent, Grid, Box, TextField, IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles'
import KhobleTextField from "../atoms/KhobleTextField";
import { useState } from "react";
import EnterIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const useStyles: any = makeStyles({
    root: {
        "& .MuiFormHelperText-root": {
            color: "coral !important"
        },
        "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": {
                borderColor: "coral",
                borderRadius: "100px"
            }
        }
    }
});

export default function Login({ language }: any) {
    const classes = useStyles();
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
                // variant="outlined"
                sx={{ minWidth: "50%" }}
            >
                <CardContent>
                    <Box
                        component="form"
                        autoComplete="off"
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item>
                                <img src="../../../public/isotype_logo.png" width={"150px"}></img>
                            </Grid>
                            <Grid item width={"50%"} minWidth={"250px"}>
                                <KhobleTextField label={
                                    language === "english" ?
                                        "Email" :
                                        language === "español" ?
                                            "Correo" :
                                            ""
                                }
                                />
                            </Grid>
                            <Grid item width={"50%"} minWidth={"250px"}>
                                <KhobleTextField type={"password"} helperText={loginErrorMessage} label={
                                    language === "english" ?
                                        "Password" :
                                        language === "español" ?
                                            "Contraseña" :
                                            ""
                                }
                                />
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <EnterIcon style={{ color: 'grey' }}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}