import style from './style.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import classnames from 'classnames';
import { Dayjs } from 'dayjs';
import { DateOrTimeView } from '@mui/x-date-pickers';

export type DatePickerAttributes = {
  onChange: (id: string, value: string | null | undefined) => void,
  id: string,
  value: Dayjs,
  label: string,
  required?: boolean,
  minDate?: Dayjs,
  maxDate?: Dayjs,
  views?: DateOrTimeView[]
}

const DatePicker = ({ onChange, ...rest }: DatePickerAttributes) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimePicker
      className={classnames(style.formDatePicker)}
      slots={{
        textField: (props: TextFieldProps) => <TextField {...props} />
      }}
      onChange={(value: any) => onChange(rest.id, value)}
      {...rest}
    />
  </LocalizationProvider>
);

export default DatePicker;