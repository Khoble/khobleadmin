import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { width } from '@mui/system';
import { ReactNode, useState } from 'react';

const errorColor = "#d88484";
const focusColor = "initial" // black or white depending on theme
const initialLabelColor = "#5c5c5c" // has to be hex so that the alpha can be modified
const initialLabelAlpha = "85"

// Used to override MUI classes:
const useStyles: any = makeStyles({
    root: {
        // Helper text color:
        "& .MuiFormHelperText-root": {
            color: errorColor+" !important"
        },
        // Border color on error:
        "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": {
                borderColor: errorColor
            }
        },
        // Initial label color (before floating upwards) on regular case and on error:
        "& .MuiFormLabel-root, .MuiFormLabel-root.Mui-error": {
            color: initialLabelColor+initialLabelAlpha   // label text color on focus
        },
        // Label text color on focus (also works on hover):
        "& .MuiFormLabel-root.Mui-focused": {
            color: focusColor 
        },
        // On focus & hover:
        "& .MuiOutlinedInput-root.Mui-focused, .MuiOutlinedInput-root:hover": {
            // Border:
            "& fieldset": {
                borderColor: focusColor,
                borderWidth: "1px" // in order to prevent the apparent MUI default width increase
            }
        }
    }
});

export default function KhobleTextField({ helperText, error, label, type, endAdornment, width}: any) {
    const classes = useStyles();
    const [hasError, setHasError] = useState(error)

    return (
        <TextField
            error={hasError}
            helperText={hasError? helperText : null}
            className={classes.root}
            fullWidth={true} // fill width of partent container by default
            label={label}
            type={type}
            InputProps={
                {
                    sx: { borderRadius: "100em" /* makes a perfectly round edge*/},
                    endAdornment: endAdornment
                }
            }
            style={{width: width}}
            onChange={() => setHasError(false)} // remove error class when user changes imput
        />
    );
}