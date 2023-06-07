import { TextField } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function KhobleTextField({ helperText, error, label, type, endAdornment, width }: any) {
    // Styling:
    // Variables and constants:
    const themeIsDark = useTheme().palette.mode === "dark";
    const defaultLabelAlpha = 0.5;
    const errorColor = "#d88484";
    const focusColor = themeIsDark ? "white" : "black"; // black or white depending on theme
    const textFieldRGB = "192, 192, 192"; // RGB value of the initial color of the text field
    // Hooks:
    const [hasError, setHasError] = useState(error);
    const [labelAlpha, setLabelAlpha] = useState(defaultLabelAlpha);

    return (
        <TextField
            error={hasError}
            onChange={() => setHasError(false)} // remove error class when user changes input
            onBlur={(event: any) => { // when text field is abandoned
                setLabelAlpha(event.target.value.length ? 1 : defaultLabelAlpha) // if text field has text, remove all opacity from the label. Otherwise, set the default
            }}
            helperText={hasError ? helperText : null}
            // className={classes.root}
            fullWidth={true} // fill width of partent container by default
            label={label}
            type={type}
            sx={{
                width: width, // width specified in props
                // input: { cursor: 'pointer' }, // make pointer cursor when hovered
                // MUI class overrides:
                // Border color:
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: `rgb(${textFieldRGB})`
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
                    color: `rgba(${textFieldRGB},${labelAlpha})`
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
                        borderColor: `rgb(${textFieldRGB})`
                    },
                    "50%": {
                        borderColor: focusColor
                    },
                    "100%": {
                        borderColor: `rgb(${textFieldRGB})`
                    }
                },
                // On focus
                "& .MuiOutlinedInput-root.Mui-focused": {
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
                // Cursor:
                input: {
                    "&:hover": {
                        cursor: "pointer"
                    },
                    "&:focus": {
                        cursor: "text"
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