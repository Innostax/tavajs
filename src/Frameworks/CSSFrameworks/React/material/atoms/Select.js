import {
    FormControl,
    Select as SelectMUI,
    InputLabel,
    MenuItem,
} from "@mui/material";

function Select({ label, options, onChange, value }) {
    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <SelectMUI value={value} label={label} onChange={onChange}>
                {options.map((each) => (
                    <MenuItem value={each.value} key={each.value}>
                        {each.name}
                    </MenuItem>
                ))}
            </SelectMUI>
        </FormControl>
    );
}

export default Select;
