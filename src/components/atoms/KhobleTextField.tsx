import { TextField } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function KhobleTextField({ helperText, error, label, type, endAdornment, width, handleTextChange, name, generalColorRBG }: any) {
    // Styling:
    // Variables and constants:
    const themeIsDark = useTheme().palette.mode === "dark";
    const defaultLabelAlpha = 0.5;
    const errorColor = "#d88484";
    const focusColor = themeIsDark ? "white" : "black"; // black or white depending on theme
    // Hooks:
    const [labelAlpha, setLabelAlpha] = useState(defaultLabelAlpha);

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
            // className={classes.root}
            fullWidth={true} // fill width of partent container by default
            label={label}
            type={type}
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
                    endAdornment: endAdornment // icon/button displayed at the inner right of the textfield
                }
            }
        />
    );
}