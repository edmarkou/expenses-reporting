import { MultiFormBody, SelectAttributes } from "../../../components/Form";
import { PlusIcon } from '../../../components/Icons';
import classnames from "classnames";
import { ButtonAttributes, FormState, InputAttributes } from "../../../hooks/useForm";
import style from '../style.module.scss';
import { DatePickerAttributes } from "../../../components/DatePicker";
import { FileInputAttributes } from "../../../components/FileInput";
import dayjs from 'dayjs';

type PaymentFormTypes = {
  register: (props: InputAttributes) => JSX.Element,
  paymentIndex: number,
  registerButton: (props: ButtonAttributes) => JSX.Element, 
  registerSelect: (props: Omit<SelectAttributes, "onChange" | "value">) => JSX.Element, 
  registerDatePicker: (props: Omit<DatePickerAttributes, "onChange" | "value">) => JSX.Element, 
  registerFileInput: (props: Omit<FileInputAttributes, "onChange" | "value" | "onRemove">) => JSX.Element,
  payment: any,
  onAddCategory: (paymentIndex: number) => FormState
};

const PaymentForm: React.FC<PaymentFormTypes> = ({ 
  register, 
  paymentIndex,
  registerButton,
  registerSelect,
  registerDatePicker,
  registerFileInput,
  payment,
  onAddCategory
}) => (
  <div className={classnames("row row-centered")}>
    <div className={classnames("col col-6")}>
      <MultiFormBody>
        <h1>Payment {paymentIndex + 1}</h1>
        <div className={classnames("row")}>
          <div className={classnames("col col-6", style.rightPaddingOnly)}>
            {registerDatePicker({
              minDate: dayjs(),
              views: ['year', 'month', 'day'],
              id: `payments[${paymentIndex}].paymentDate`,
              label: "Payment date",
              required: true
            })}
          </div>
          <div className={classnames("col col-6", style.leftPaddingOnly)}>
            {registerSelect({
              id: `payments[${paymentIndex}].currency`,
              label: "Currency",
              options: ["EUR", "PL"],
              required: true
            })}
          </div>
        </div>
        {register({
          id: `payments[${paymentIndex}].paymentComment`,
          label: "Payment comments",
          placeholder: "Payment comments"
        })}
        <h2>Expense category (-ies)</h2>
        <h3>Please specify expense category (-ies)</h3>
        {payment.categories.map((category: any, index: number) => (
          <>
            <h4>Expense category {index + 1}</h4>
            <div className={classnames("row")}>
              <div className={classnames("col col-8", style.rightPaddingOnly)}>
                {registerSelect({
                  id: `payments[${paymentIndex}].categories[${index}].category`,
                  label: "Category",
                  options: ["Category 1", "Category 2"],
                  required: true
                })}
              </div>
              <div className={classnames("col col-4", style.leftPaddingOnly)}>
                {register({
                  id: `payments[${paymentIndex}].categories[${index}].amount`,
                  label: "Amount",
                  type: "number",
                  placeholder: "Amount"
                })}
              </div>
            </div>
          </>
        ))}
        <div className={classnames("row")}>
          {registerButton({
            className: style.addCategoryButton,
            getNewState: () => onAddCategory(paymentIndex),
            children: [
              <PlusIcon className={style.orangePlusIcon}/>,
              <span>Add category</span>
            ]
          })}
        </div>
        <div className={classnames("row")}>
          {registerFileInput({
            id: `payments[${paymentIndex}].paymentImages`,
          })}
        </div>
      </MultiFormBody>
    </div>
  </div>
);

export default PaymentForm;