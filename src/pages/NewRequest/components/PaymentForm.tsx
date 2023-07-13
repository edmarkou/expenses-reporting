import { InputAttributes, MultiFormBody, SelectAttributes } from "../../../components/Form";
import { PlusIcon } from '../../../components/Icons';
import classnames from "classnames";
import style from '../style.module.scss';
import { DatePickerAttributes } from "../../../components/DatePicker";
import { FileInputAttributes } from "../../../components/FileInput";
import dayjs from 'dayjs';
import Button from "../../../components/Button";

type PaymentFormTypes = {
  register: (props: Omit<InputAttributes, "onChange">) => JSX.Element,
  paymentIndex: number, 
  registerSelect: (props: Omit<SelectAttributes, "onChange" | "value">) => JSX.Element, 
  registerDatePicker: (props: Omit<DatePickerAttributes, "onChange" | "value">) => JSX.Element, 
  registerFileInput: (props: Omit<FileInputAttributes, "onChange" | "value" | "onRemove">) => JSX.Element,
  payment: any,
  onAddCategory: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, paymentIndex: number) => void
};

const PaymentForm: React.FC<PaymentFormTypes> = ({ 
  register, 
  paymentIndex,
  registerSelect,
  registerDatePicker,
  registerFileInput,
  payment,
  onAddCategory
}) => {
  const totalAmount = payment.categories.reduce(
    (value: number, curr: { amount: number }) => {
      value = Number(value) + Number(curr.amount);
      return value.toFixed(2);
    }, 0
  );

  return (
    <div className={classnames("row row-centered")}>
      <div className={classnames("col col-6")}>
        <MultiFormBody collapseEnabled={true} text={`Total: ${totalAmount} ${payment.currency}`}>
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
            <div key={"category-" + index}>
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
            </div>
          ))}
          <div className={classnames("row")}>
            <Button 
              className={classnames(style.addCategoryButton)} 
              onClick={(e) => onAddCategory(e, paymentIndex)}
            >
              <PlusIcon className={style.orangePlusIcon}/>
              <span>Add category</span>
            </Button>
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
};

export default PaymentForm;