import { ChangeEvent, useCallback, useState } from "react";
import { FormInput, FormSelect, SelectAttributes, InputAttributes } from "src/components/Form";
import DatePicker, { DatePickerAttributes } from "src/components/DatePicker";
import useValidator from "./useValidator";
import { SelectChangeEvent } from "@mui/material";
import FileInput, { FileInputAttributes } from "src/components/FileInput";
import FormRadioInput, { RadioInputAttributes } from "src/components/Form/FormRadioInput";
import _ from 'lodash';

export type FormState = { [key: string]: any };

type ComponentAttributes = 
  Omit<InputAttributes, "onChange"> |
  Omit<SelectAttributes, "onChange" | "value"> |
  Omit<FileInputAttributes, "onChange" | "value" | "onRemove"> |
  Omit<RadioInputAttributes, "onChange" | "value"> |
  Omit<DatePickerAttributes, "onChange" | "value">;

type ComponentType =
  "input" |
  "radio" |
  "select" |
  "datepicker" |
  "file";

export type RegisterComponentFC = (type: ComponentType, props: ComponentAttributes) => JSX.Element

type Form = {
  state: FormState, 
  error: string,
  setState: (state: FormState) => void,
  validateForm: (keysToValidate: string[]) => boolean,
  register: RegisterComponentFC
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
    (date: Date | null, id: string) => {
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
    (type: string, props: ComponentAttributes) => {
      switch(type) {
        case "input":
          return <FormInput required {...props as Omit<InputAttributes, "onChange">} onChange={onChange} />
        case "radio": 
          return (
            <FormRadioInput 
              {...props as Omit<RadioInputAttributes, "onChange" | "value">} 
              onChange={onChangeRadio} 
              value={_.get(state, props.id as string)}
            />
          )
        case "select": 
          return (
            <FormSelect 
              {...props as Omit<SelectAttributes, "onChange" | "value">} 
              onChange={(e) => onChangeSelect(e, props.id as string)} 
              value={_.get(state, props.id as string)} 
            />
          )
        case "datepicker": 
          return (
            <DatePicker
              {...props as Omit<DatePickerAttributes, "onChange" | "value">}
              onChange={(date) => onChangeDate(date, props.id as string)}
              value={_.get(state, props.id as string)}
            />
          )
        case "file": 
          return (
            <FileInput
              {...props as Omit<FileInputAttributes, "onChange" | "value" | "onRemove">}
              onChange={onChangeFile}
              value={_.get(state, props.id as string)}
              onRemove={(i) => onRemoveFile(i, props.id as string)}
            />
          )
        default:
          return <></>;
      }
    },
    [onChange, onChangeDate, onChangeFile, onChangeRadio, onChangeSelect, onRemoveFile, state]
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

  return { 
    state, 
    error, 
    setState,
    validateForm,
    register
  };
}

export default useFrom;