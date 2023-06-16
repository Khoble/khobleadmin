import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function KhobleTextField({ helperText, error, label, type, endAdornment, width, handleTextChange, name, generalColorRBG }: any) {
    // Styling:
    // Variables and constants:
    const themeIsDark = useTheme().palette.mode === "dark";
    const defaultLabelAlpha = 0.5;
    const errorColor = "#d88484";
    const focusColor = themeIsDark ? "white" : "black"; // black or white depending on theme
    // Hooks:
    const [labelAlpha, setLabelAlpha] = useState(defaultLabelAlpha);
    const [showPassword, setShowPassword] = useState(false) // used to toggle the password text field type

    // Functions:
    // Used to trigger 1 or more functions when TextField value changes:
    function handleChange(event: any) {
        handleTextChange(event)
    }

    return (
        <TextField
            error={error}
            onChange={(event) => handleChange(event)}
            helperText={error ? helperText : null}
            fullWidth={true} // fill width of partent container by default
            label={label}
            type={ // If type was specified as password, it will be toggled between text and password with the visibility icon. Any other type will just be applied:
                type==="password"? 
                    showPassword? "text" : "password"
                : type
            }
            name={name}
            onBlur={(event: any) => { // when text field is abandoned
                setLabelAlpha(event.target.value.length ? 1 : defaultLabelAlpha) // if text field has text, remove all opacity from the label. Otherwise, set the default
            }}
            sx={{
                width: width, // width specified in props
                // MUI class overrides:
                // Border color:
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: `rgb(${generalColorRBG})`
                    }
                },
                // Border color on error:
                "& .MuiOutlinedInput-root.Mui-error": {
                    "& fieldset": {
                        borderColor: errorColor
                    }
                },
                // Initial label color (before floating upwards) on regular case and on error:
                "& .MuiFormLabel-root, .MuiFormLabel-root.Mui-error": {
                    color: `rgba(${generalColorRBG},${labelAlpha})`
                },
                // Label text color on focus (also works on hover):
                "& .MuiFormLabel-root.Mui-focused": {
                    color: focusColor
                },
                // On hover (regular and error):
                "& .MuiOutlinedInput-root, .MuiOutlinedInput-root.Mui-error": {
                    "&:hover fieldset": {
                        animationName: "pulsatingBorder", // references pulsating animation on hover
                        animationDuration: "1.2s",
                        animationIterationCount: "infinite"
                    }
                },
                // Pulsating animation on hover:
                "@keyframes pulsatingBorder": {
                    "0%": {
                        borderColor: `rgba(${generalColorRBG},0.2)`
                    },
                    "50%": {
                        borderColor: focusColor
                    },
                    "100%": {
                        borderColor: `rgba(${generalColorRBG},0.2)`
                    }
                },
                // On focus
                "& .MuiOutlinedInput-root.Mui-focused, .MuiOutlinedInput-root.Mui-error.Mui-focused": {
                    // Border:
                    "& fieldset": {
                        borderColor: focusColor,
                        borderWidth: "1px", // in order to prevent the apparent MUI default width increase
                        animationIterationCount: 0 // stop animation
                    }
                },
                // Helper text color:
                "& .MuiFormHelperText-root": {
                    color: errorColor + " !important"
                },
                input: {
                    // Cursor:
                    "&:hover": {
                        cursor: "pointer"
                    },
                    "&:focus": {
                        cursor: "text"
                    },
                    // On autofill:
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px transparent inset" // add transparency to autofill background color override
                    }
                }
            }}
            // Props for the interior of the text field:
            InputProps={
                {
                    sx: {
                        borderRadius: "100em", /* makes a perfectly round edge*/
                    },
                    endAdornment: type === "password" ?
                        (
                            < InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => { setShowPassword(!showPassword) }}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{ color: "grey" }}
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                        : endAdornment // icon/button displayed at the inner right of the textfield
                }
            }
        />
    );
}