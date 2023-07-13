import { ChangeEvent, useCallback, useState } from "react";
import { FormInput, FormSelect, SelectAttributes, InputAttributes } from "../components/Form";
import DatePicker, { DatePickerAttributes } from "../components/DatePicker";
import useValidator from "./useValidator";
import { SelectChangeEvent } from "@mui/material";
import FileInput, { FileInputAttributes } from "../components/FileInput";
import FormRadioInput, { RadioInputAttributes } from "../components/Form/FormRadioInput";
import _ from 'lodash';

export type FormState = { [key: string]: any };

type Form = {
  register: (props: Omit<InputAttributes, "onChange">) => JSX.Element, 
  registerSelect: (props: Omit<SelectAttributes, "onChange" | "value">) => JSX.Element, 
  registerDatePicker: (props: Omit<DatePickerAttributes, "onChange" | "value">) => JSX.Element, 
  registerFileInput: (props: Omit<FileInputAttributes, "onChange" | "value" | "onRemove">) => JSX.Element, 
  registerRadioInput: (props: Omit<RadioInputAttributes, "onChange" | "value">) => JSX.Element,
  state: FormState, 
  error: string,
  setState: (state: FormState) => void,
  validateForm: (keysToValidate: string[]) => boolean,
}

function useFrom(initialState = {}): Form {
  const [state, setState] = useState<FormState>(initialState);
  const { validate, formatErrorMessage } = useValidator();
  const [error, setError] = useState("");

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
      e.stopPropagation();
      const id = e.target.id.split('-')[0];
      const newState = _.set(state, id, e.target.value);
      setState({ ...newState });
    },
    [state]
  );

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
    (props: Omit<InputAttributes, "onChange">) => <FormInput required {...props} onChange={onChange} />,
    [onChange]
  );

  const validateForm = useCallback((keysToValidate: string[]) => {
    const validation = keysToValidate.reduce((prev: FormState, curr: string) => {
      if (state[curr]) prev[curr] = state[curr];
      return prev;
    }, {} as FormState);
    const { error } = validate(validation);
    if (error) {
      setError(formatErrorMessage(error.message));
      return false;
    }
    return true;
  }, [formatErrorMessage, state, validate])

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
    error, 
    registerSelect, 
    registerDatePicker, 
    registerFileInput, 
    registerRadioInput,
    setState,
    validateForm
  };
}

export default useFrom;