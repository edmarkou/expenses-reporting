import useFrom from 'src/hooks/useForm';
import { ErrorMessage, Form, FormHeader } from 'src/components/Form';
import { useAuth } from 'src/hooks/useAuth';
import { FormEvent } from 'react';

function SignUp() {
  const { register, error, state, validateForm } = useFrom({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp } = useAuth();

  const handleSingUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(['name', 'email', 'password', 'confirmPassword'])) {
      signUp({ 
        name: state.name,  
        email: state.email,  
        password: state.password,
      });
    }
  }

  return (
    <div className="centeredContainer">
      <div className="row row-centered">
        <div className="col-6">
          <Form onSubmit={handleSingUp}>
            <FormHeader text="Sign Up" />
            {register("input", {
              id: "name",
              label: "Name",
              placeholder: "Your name",
            })}
            {register("input", {
              id: "email",
              label: "Email",
              placeholder: "Your email",
            })}
            {register("input", {
              id: "password",
              label: "Password",
              placeholder: "Your password",
              type: "password",
            })}
            {register("input", {
              id: "confirmPassword",
              label: "Confirm password",
              placeholder: "Confirm your password",
              type: "password",
            })}
            <ErrorMessage error={error} />
            {register("input", { type: "submit", value: "Sign up" })}
          </Form>
        </div>
      </div>
    </div>
    
  );
}

export default SignUp;
