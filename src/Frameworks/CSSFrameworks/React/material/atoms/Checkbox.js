import { useState } from "react";
import { FormControlLabel, Checkbox as CheckboxMUI } from "@mui/material";

function Checkbox({ label, value, name }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <FormControlLabel
            control={
                <CheckboxMUI
                    checked={isChecked}
                    value={value}
                    name={name}
                    onChange={() => setIsChecked(!isChecked)}
                />
            }
            label={label}
        />
    );
}

export default Checkbox;
