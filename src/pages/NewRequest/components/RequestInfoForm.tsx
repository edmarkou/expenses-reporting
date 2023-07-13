import { MultiFormBody } from "../../../components/Form";
import classnames from "classnames";
import { InputAttributes } from "../../../hooks/useForm";

type FormHeaderTypes = {
  register: (props: InputAttributes) => JSX.Element
};

const RequestInfoForm = ({ register }: FormHeaderTypes) => (
  <div className={classnames("row row-centered")}>
    <div className={classnames("col col-6")}>
      <MultiFormBody>
        <h1>Request info</h1>
        {register({
          id: "requestName",
          label: "Request name",
          placeholder: "Request name",
        })}
        {register({
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