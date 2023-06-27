import { Card, CardHeader, CardContent, Grid, Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { makeStyles } from '@mui/styles'
import KhobleTextField from "../atoms/KhobleTextField";
import { useEffect, useState } from "react";
import EnterIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';
import KhobleLogoComponent from "../atoms/KhobleLogo"
import { useTheme } from '@mui/material/styles';
import KhobleLogoGradient from "../../../public/khoble_logo_darkmode_gradient.svg"
import KhobleLogo from "../../../public/khoble_magenta_blue_separate_paths.svg"
import khobleAPI from "../../api/khobleAPI";

export default function Login({ language }: any) {
    // Variables & constants:
    const navigate = useNavigate();
    const theme = useTheme();
    const themeIsDark = theme.palette.mode === "dark"
    const generalGreyAsRGB = "192, 192, 192"; // desired grey color
    const loginErrorMessage = (
        language === "english" ?
            "Invalid credentials" :
            language === "español" ?
                "Credenciales inválidas" :
                ""
    )

    // Hooks:
    // Used to store text field values:
    const [textFieldValues, setTextFieldsValues] = useState({
        email: "",
        password: ""
    });
    const [allTextFieldsHaveValues, setAllTextFieldsHaveValues] = useState(false)
    const [enterButtonAlphaValue, setEnterButtonAlphaValue] = useState(0.2)
    const [textFieldHasError, setTextFieldHasError] = useState(false)

    // Redirects user to home page if session was already active:
    useEffect(() => {
        if (localStorage.getItem("khoble-session")) { // User was already logged in
            navigate(
                '/', // redirect to home page
                { replace: true } // removes login page from history, preventing user from accidentally navigating back to the login page
            );
        }
    },
        [] // empty brackets indicate that it will only run once upon rendering
    )

    // Triggers code when 'textFieldValues' changes:
    useEffect(() => {
        handleEnterButtonStyles()
    }, [textFieldValues]);

    // Functions:
    // Applies enabled or disabled style on the enter button (right arrow icon):
    function handleEnterButtonStyles() {
        var hasFoundEmptyTextField = false
        Object.values(textFieldValues).forEach((value) => {// for each value text field value
            if (value.length == 0) {// if field has no value
                setAllTextFieldsHaveValues(false)
                setEnterButtonAlphaValue(0.2) // apply reduced opacity:
                hasFoundEmptyTextField = true
                return // break out of function
            }
        })
        if (!hasFoundEmptyTextField) {
            setAllTextFieldsHaveValues(true) // all fields have values at this point
            // Apply enabled styling:
            setEnterButtonAlphaValue(1) // apply full opacity:
        }
    }

    // Passed into the KhobleTextField to handle input value on change:
    const handleTextChange = (event: any) => {
        // store the input values
        setTextFieldsValues({
            ...textFieldValues,
            [event.currentTarget.name]: event.currentTarget.value,
        })

        setTextFieldHasError(false) // remove text field error 
    }

    const attemptLogin = async () => {
        try {
            const response = await khobleAPI.post('/dashboard/adminUser/login', textFieldValues);
            const data = await response.data;
            if (data.ok) {
                // Credetials are valid:
                localStorage.setItem("khoble-session", data.token) // save user jwt in browser
                navigate("/general", { replace: true })
            }
        } catch (error: any) {
            // Credentials are invalid:
            console.error(error); // raise error explaining inability to connect to the endpoint
            setTextFieldHasError(true) // set text field error
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            minWidth="100vw"
            minHeight="100vh"
            sx={{ backgroundColor: `${themeIsDark ? "initial" : "white"}` }}
        >
            <Card
                variant={themeIsDark ? "elevation" : "outlined"}
                sx={{ minWidth: "50%" }}
            >
                <CardContent
                    sx={{ textAlign: "center" }}
                >
                    {/* <KhobleLogoComponent 
                        width="150" 
                        strokeColor={ themeIsDark? "white" : "black" }
                        strokeWidth="10" 
                        // leftFill="#da5766"
                        // leftOpacity={0.5}
                        // rightFill="#262640" 
                        // rightOpacity={0.5}
                        /> */}
                    <img src={themeIsDark ? KhobleLogoGradient : KhobleLogo} width="150px"></img>
                    <div>
                        <KhobleTextField
                            error={textFieldHasError}
                            width="300px"
                            name="email"
                            handleTextChange={handleTextChange}
                            generalColorRBG={generalGreyAsRGB}
                            label={
                                language === "english" ?
                                    "Email" :
                                    language === "español" ?
                                        "Correo" :
                                        ""
                            }
                        />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <KhobleTextField
                            error={textFieldHasError}
                            type="password"
                            helperText={loginErrorMessage}
                            width="300px"
                            name="password"
                            generalColorRBG={generalGreyAsRGB}
                            handleTextChange={handleTextChange}
                            label={
                                language === "english" ?
                                    "Password" :
                                    language === "español" ?
                                        "Contraseña" :
                                        ""
                            }
                        />
                        <IconButton
                            disabled={!allTextFieldsHaveValues} // disabled if not all text fields have values
                            sx={{
                                position: "absolute",
                                marginTop: "8px"
                            }}
                            onClick={attemptLogin}
                        >
                            <EnterIcon style={{ color: `rgba(${generalGreyAsRGB}, ${enterButtonAlphaValue})` }} />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        </Grid >
    );
}