import Button from "../../../components/Button";
import { ErrorMessage, MultiFormBody, SelectAttributes } from "../../../components/Form";
import classnames from "classnames";
import style from '../style.module.scss';
import { ButtonAttributes, FormState } from "../../../hooks/useForm";
import { RadioInputAttributes } from "../../../components/Form/FormRadioInput";

type CostCenterTypes = {
  registerSelect: (props: Omit<SelectAttributes, "onChange" | "value">) => JSX.Element, 
  onNext: () => FormState,
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  registerButton: (props: ButtonAttributes) => JSX.Element, 
  registerRadioInput: (props: Omit<RadioInputAttributes, "onChange" | "value">) => JSX.Element, 
  validation: FormState,
  error: string
};

const CostCenterForm = ({ registerSelect, onNext, onCancel, registerButton, registerRadioInput, validation, error }: CostCenterTypes) => (
  <div className={classnames("row row-centered")}>
    <div className={classnames("col col-6")}>
      <MultiFormBody>
        <h2>Expense relates to</h2>
        {registerRadioInput({
          options: [{
            label: 'Unit (Company cost)',
            value: 'unit',
          },
          {
            label: 'Project (Compensated by Client)',
            value: 'project'
          }],
          id: 'expenseRelation',
        })}
        <h2>Please choose project for cost covering</h2>
        {registerSelect({
          id: "project",
          label: "Project",
          options: ["Project 1", "Project 2"],
        })}
        <h2>Please choose manager who approved your expense to be compensated by the Client</h2>
        {registerSelect({
          id: "manager",
          label: "Manager",
          options: ["Manager 1", "Manager 2"],
        })}
        <ErrorMessage error={error} />
        <div className={classnames("row", style.centerFormButtons)}>
          <Button className={classnames(style.secondaryButton)} onClick={onCancel}>
            <span>Cancel</span>
          </Button>
          {registerButton({
            className: style.primaryButton,
            getNewState: onNext,
            validation: validation,
            children: <span>Next</span>
          })}
        </div>
      </MultiFormBody>
    </div>
  </div>
);

export default CostCenterForm;