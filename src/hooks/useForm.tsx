import { ChangeEvent, FormEvent, InputHTMLAttributes, useCallback, useState } from "react";
import { FormInput, FormSelect, SelectAttributes } from "../components/Form";
import DatePicker, { DatePickerAttributes } from "../components/DatePicker";
import useValidator from "./useValidator";
import { SelectChangeEvent } from "@mui/material";
import FileInput, { FileInputAttributes } from "../components/FileInput";
import Button from "../components/Button";
import _ from 'lodash';
import FormRadioInput, { RadioInputAttributes } from "../components/Form/FormRadioInput";

export type FormState = { [key: string]: any };

export type InputAttributes = InputHTMLAttributes<HTMLInputElement> & {
  label?: string,
  type?: string,
  value?: string,
  containerClassName?: string
}

export type ButtonAttributes = InputHTMLAttributes<HTMLInputElement> & {
  getNewState: () => FormState,
  validation?: FormState,
  children: React.ReactElement[] | React.ReactElement,
  className?: string,
}

type Form = {
  register: (props: InputAttributes) => JSX.Element, 
  registerButton: (props: ButtonAttributes) => JSX.Element, 
  registerSelect: (props: Omit<SelectAttributes, "onChange" | "value">) => JSX.Element, 
  registerDatePicker: (props: Omit<DatePickerAttributes, "onChange" | "value">) => JSX.Element, 
  registerFileInput: (props: Omit<FileInputAttributes, "onChange" | "value" | "onRemove">) => JSX.Element, 
  registerRadioInput: (props: Omit<RadioInputAttributes, "onChange" | "value">) => JSX.Element,
  state: { [key: string]: string }, 
  handleSubmit: (e: FormEvent<HTMLFormElement>, cb?: Function) => void, 
  error: string
}

function useFrom(initialState = {}): Form {
  const [state, setState] = useState<FormState>(initialState);
  const { validate, formatErrorMessage } = useValidator();
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>, cb?: Function) => {
    e.preventDefault();
    const { error } = validate(state);
    if (error) {
      console.log(formatErrorMessage(error.message));
      return setError(formatErrorMessage(error.message));
    }
    if (cb) {
      cb();
    }
  };

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const newState = _.set(state, e.target.id, e.target.value);
      setState({ ...newState });
    },
    [state]
  );

  const onChangeRadio = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const id = e.target.id.split('-')[0];
      const newState = _.set(state, id, e.target.value);
      setState({ ...newState });
    },
    [state]
  );

  const onClickButton = useCallback((newState: FormState) => {
    setState(newState);
  }, [])

  const onChangeSelect = useCallback(
    (e: SelectChangeEvent<string>, id: string) => {
      const newState = _.set(state, id, e.target.value);
      setState({ ...newState });
    },
    [state]
  );

  const onChangeDate = useCallback(
    (date: string, id: string) => {
      const newState = _.set(state, id, date);
      setState({ ...newState });
    },
    [state]
  );

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newState = _.set(state, e.target.id, Object.values(e.target.files as Object));
      setState({ ...newState });
    },
    [state]
  );

  const onRemoveFile = useCallback((index: number, id: string) => {
    const files = [..._.get(state, id)]
    files.splice(index, 1);
    const newState = _.set(state, id, files);
    setState({ ...newState });
  }, [state]);

  const register = useCallback(
    (props: InputAttributes) => <FormInput required {...props} onChange={onChange} />,
    [onChange]
  );

  const registerButton = useCallback(
    ({ children, getNewState, validation, ...rest }: ButtonAttributes) => (
      <Button 
        {...rest} 
        onClick={(e) => {
          e.preventDefault();
          if (validation) {
            const { error } = validate(validation);
            console.log(error, validation)
            if (error) {
              return setError(formatErrorMessage(error.message));
            }
          }
          onClickButton(getNewState());
        }}
      >
        {children}
      </Button>
    ),
    [formatErrorMessage, onClickButton, validate]
  );

  const registerRadioInput = useCallback(
    (props: Omit<RadioInputAttributes, "onChange" | "value">) => (
      <FormRadioInput 
        {...props} 
        onChange={onChangeRadio} 
        value={_.get(state, props.id as string)}
      />
    ),
    [onChangeRadio, state]
  );

  const registerSelect = useCallback(
    (props: Omit<SelectAttributes, "onChange" | "value">) => (
      <FormSelect 
        {...props} 
        onChange={(e) => onChangeSelect(e, props.id)} 
        value={_.get(state, props.id)} 
      />
    ),
    [onChangeSelect, state]
  );

  const registerDatePicker = useCallback(
    (props: Omit<DatePickerAttributes, "onChange" | "value">) => (
      <DatePicker
        onChange={(date) => onChangeDate(date, props.id)}
        value={_.get(state, props.id)}
        {...props}
      />
    ),
    [onChangeDate, state]
  );

  const registerFileInput = useCallback(
    (props: Omit<FileInputAttributes, "onChange" | "value" | "onRemove">) => (
      <FileInput
        onChange={onChangeFile}
        value={_.get(state, props.id)}
        onRemove={(i) => onRemoveFile(i, props.id)}
        {...props}
      />
    ),
    [onChangeFile, state, onRemoveFile]
  );

  return { 
    register, 
    state, 
    handleSubmit, 
    error, 
    registerSelect, 
    registerDatePicker, 
    registerFileInput, 
    registerButton, 
    registerRadioInput 
  };
}

export default useFrom;