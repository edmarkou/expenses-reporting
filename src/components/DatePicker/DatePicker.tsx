import { useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

export type DatePickerAttributes = {
  onChange: (date: Date | null) => void;
  value: Date | null,
  label: string,
  id: string
}

const CustomDatePicker = ({
  onChange,
  value,
  label,
  ...rest
}: DatePickerAttributes) => {
  const handleDateChange = useCallback((date: Date | null) => {
    onChange(date)
  }, [onChange]);

  return (
    <div className="custom-datepicker">
      <DatePicker
        {...rest}
        selected={value}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText={label}
      />
    </div>
  );
};

export default CustomDatePicker;