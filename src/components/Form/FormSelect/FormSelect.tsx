import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import style from "./style.module.scss";
import classnames from "classnames";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { ReactNode } from "react";
import { ArrowDownIcon } from "../../Icons";

export type SelectAttributes = {
  onChange: (e: SelectChangeEvent<string>, child: ReactNode) => void,
  options: string[],
  optionLabels?: string[],
  label: string,
  value: string,
  id: string,
  multiple?: boolean,
  disabled?: boolean,
  required?: boolean,
}

const FormSelect = ({
  onChange,
  options,
  optionLabels,
  label,
  value,
  id,
  multiple,
  disabled
}: SelectAttributes) => (
  <Box>
    <FormControl fullWidth classes={{ root: classnames(style.formSelect) }}>
      <InputLabel
        classes={{ 
          shrink: classnames(style.inputLabelShrinked),
          root: classnames(style.selectLabel)
        }}
        id="form-select-label"
      >
        {label}
      </InputLabel>
      <Select
        sx={{
          borderRadius: "5px",
          fontFamily: "Poppins",
          color: "#2C3E50",
          fontSize: "1rem",
          opacity: 1,
          background: "#fff",
          div: {
            textAlign: "left",
          },
          fieldset: {
            border: "1px solid #ccc !important",
          },
        }}
        labelId="form-select-label"
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        MenuProps={{ sx: { ul: { maxHeight: "400px" } } }}
        multiple={multiple}
        disabled={disabled}
        IconComponent={() => <ArrowDownIcon className={style.selectArrowIcon} />}
      >
        {options.map((option: string, i: number) => (
          <MenuItem
            sx={{
              fontFamily: "Poppins",
              color: "#2C3E50",
              fontSize: "0.8rem",
            }}
            key={option}
            value={option}
          >
            {optionLabels ? optionLabels[i] : option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default FormSelect;
