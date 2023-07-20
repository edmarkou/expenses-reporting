import { MultiFormBody } from "src/components/Form";
import classnames from "classnames";
import { RegisterComponentFC } from "src/hooks/useForm";

type FormHeaderAttributes = {
  register: RegisterComponentFC
};

const RequestInfoForm = ({ register }: FormHeaderAttributes) => (
  <div className={classnames("row row-centered")}>
    <div className={classnames("col col-6")}>
      <MultiFormBody>
        <h1>Request info</h1>
        {register("input", {
          id: "requestName",
          label: "Request name",
          placeholder: "Request name",
        })}
        {register("input", {
          id: "requestComment",
          label: "Request comment (optional)",
          placeholder: "Request comment (optional)",
          required: false
        })}
      </MultiFormBody>
    </div>
  </div>
);

export default RequestInfoForm;