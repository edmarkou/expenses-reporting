import useFrom from './hooks/useForm';
import { ErrorMessage, Form, FormHeader } from './components/Form';

function App() {
  const { register, handleSubmit, error } = useFrom({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="centeredContainer">
      <div className="row row-centered">
        <div className="col-6">
          <Form onSubmit={handleSubmit}>
            <FormHeader text="Log In" />
            {register({
              id: "name",
              label: "Name",
              placeholder: "Your name",
            })}
            {register({
              id: "email",
              label: "Email",
              placeholder: "Your email",
            })}
            {register({
              id: "password",
              label: "Password",
              placeholder: "Your password",
              type: "password",
            })}
            {register({
              id: "confirmPassword",
              label: "Confirm password",
              placeholder: "Confirm your password",
              type: "password",
            })}
            <ErrorMessage error={error} />
            {register({ type: "submit" })}
          </Form>
        </div>
      </div>
    </div>
    
  );
}

export default App;
