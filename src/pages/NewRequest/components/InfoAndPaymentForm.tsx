import Button from "src/components/Button";
import { InputAttributes, SelectAttributes } from "src/components/Form";
import classnames from "classnames";
import style from '../style.module.scss';
import { PlusIcon } from "src/components/Icons";
import RequestInfoForm from "./RequestInfoForm";
import PaymentForm from "./PaymentForm";
import { DatePickerAttributes } from "src/components/DatePicker";
import { FileInputAttributes } from "src/components/FileInput";

type InfoAndPaymentAttributes = {
  registerSelect: (props: Omit<SelectAttributes, "onChange" | "value">) => JSX.Element, 
  register: (props: Omit<InputAttributes, "onChange">) => JSX.Element, 
  payments: any[], 
  registerDatePicker: (props: Omit<DatePickerAttributes, "onChange" | "value">) => JSX.Element, 
  registerFileInput: (props: Omit<FileInputAttributes, "onChange" | "value" | "onRemove">) => JSX.Element, 
  onAddCategory: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, paymentIndex: number) => void, 
  onAddPayment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

const InfoAndPaymentForm = ({ 
  registerSelect, 
  register, 
  payments, 
  registerDatePicker, 
  registerFileInput, 
  onAddCategory, 
  onAddPayment 
}: InfoAndPaymentAttributes) => (
  <>
    <RequestInfoForm register={register}/>
    {payments.map((payment: any, i: number) => (
      <PaymentForm
        key={"payment" + i}
        register={register}
        paymentIndex={i}
        registerSelect={registerSelect}
        registerDatePicker={registerDatePicker}
        registerFileInput={registerFileInput}
        payment={payment}
        onAddCategory={onAddCategory}
      />
    ))}
    <div className={classnames("row row-centered")}>
      <Button 
        className={classnames(style.addPaymentButton)} 
        onClick={onAddPayment}
      >
        <PlusIcon className={style.orangePlusIcon}/>
        <span>Add payment</span>
      </Button>
    </div>
  </>
)

export default InfoAndPaymentForm;