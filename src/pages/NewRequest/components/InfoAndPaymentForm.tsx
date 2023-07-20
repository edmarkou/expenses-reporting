import Button from "src/components/Button";
import classnames from "classnames";
import style from '../style.module.scss';
import { PlusIcon } from "src/components/Icons";
import RequestInfoForm from "./RequestInfoForm";
import PaymentForm from "./PaymentForm";
import { RegisterComponentFC } from "src/hooks/useForm";

type CategoryAttributes = {
  amount: string,
  category: string
}

type PaymentAttributes = {
  currency: string,
  categories: CategoryAttributes[]
}

type InfoAndPaymentAttributes = { 
  register: RegisterComponentFC, 
  payments: PaymentAttributes[], 
  onAddCategory: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, paymentIndex: number) => void, 
  onAddPayment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

const InfoAndPaymentForm = ({ 
  register, 
  payments, 
  onAddCategory, 
  onAddPayment 
}: InfoAndPaymentAttributes) => (
  <>
    <RequestInfoForm register={register}/>
    {payments.map((payment: PaymentAttributes, i: number) => (
      <PaymentForm
        key={"payment" + i}
        register={register}
        paymentIndex={i}
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