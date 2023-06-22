import { ChangeEvent, InputHTMLAttributes, useCallback, useState } from "react";
import { FormInput } from "../components/Form";
import useValidator from "./useValidator";

type InputAttributes = InputHTMLAttributes<HTMLInputElement> & {
  label?: string,
  type?: string
}

function useFrom(initialState = {}) {
  const [state, setState] = useState(initialState);
  const { validate, formatErrorMessage } = useValidator();
  const [error, setError] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const { error } = validate(state);
    if (error) {
      setError(formatErrorMessage(error.message));
    }
  };

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const newState = { ...state, [e.target.id]: e.target.value };
      setState(newState);
    },
    [state]
  );

  const register = useCallback(
    (props: InputAttributes) => <FormInput required {...props} onChange={onChange} />,
    [onChange]
  );

  return { register, state, handleSubmit, error };
}

export default useFrom;