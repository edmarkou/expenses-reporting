import useFrom from '../hooks/useForm';
import { ErrorMessage, Form, FormHeader } from '../components/Form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';

function LogIn() {
  const { register, handleSubmit, error, state } = useFrom({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const history = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e, 
      () => login(state, () => history("/"))
    );
  }
  
  return (
    <div className="centeredContainer">
      <div className="row row-centered">
        <div className="col-6">
          <Form onSubmit={handleLogin}>
            <FormHeader text="Log In" />
            {register({
              id: "email",
              label: "Email",
              placeholder: "Email",
            })}
            {register({
              id: "password",
              label: "Password",
              placeholder: "Password",
              type: "password",
            })}
            <ErrorMessage error={error} />
            {register({ type: "submit", value: "Log in" })}
          </Form>
        </div>
      </div>
    </div>
    
  );
}

export default LogIn;
