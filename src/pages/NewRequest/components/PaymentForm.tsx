import { MultiFormBody } from "src/components/Form";
import { PlusIcon } from 'src/components/Icons';
import classnames from "classnames";
import style from '../style.module.scss';
import Button from "src/components/Button";
import React from "react";
import { RegisterComponentFC } from "src/hooks/useForm";

type CategoryAttributes = {
  amount: string,
  category: string
}

type PaymentAttributes = {
  currency: string,
  categories: CategoryAttributes[]
}

type PaymentFormAttributes = {
  register: RegisterComponentFC,
  paymentIndex: number, 
  payment: PaymentAttributes,
  onAddCategory: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, paymentIndex: number) => void
};

const PaymentForm: React.FC<PaymentFormAttributes> = ({ 
  register, 
  paymentIndex,
  payment,
  onAddCategory
}) => {
  const totalAmount = payment.categories.reduce(
    (value: string, curr: CategoryAttributes) => {
      console.log(Number(value), Number(curr.amount))
      const newValue = Number(value) + Number(curr.amount);
      return newValue.toFixed(2);
    }, "0"
  );

  return (
    <div className={classnames("row row-centered")}>
      <div className={classnames("col col-6")}>
        <MultiFormBody collapseEnabled={true} text={`Total: ${totalAmount} ${payment.currency}`}>
          <h1>Payment {paymentIndex + 1}</h1>
          <div className={classnames("row")}>
            <div className={classnames("col col-6", style.rightPaddingOnly)}>
              {register("datepicker", {
                id: `payments[${paymentIndex}].paymentDate`,
                label: "Payment date",
              })}
            </div>
            <div className={classnames("col col-6", style.leftPaddingOnly)}>
              {register("select", {
                id: `payments[${paymentIndex}].currency`,
                label: "Currency",
                options: ["EUR", "PL"],
                required: true
              })}
            </div>
          </div>
          {register("input", {
            id: `payments[${paymentIndex}].paymentComment`,
            label: "Payment comments",
            placeholder: "Payment comments"
          })}
          <h2>Expense category (-ies)</h2>
          <h3>Please specify expense category (-ies)</h3>
          <React.Fragment>
            {payment.categories.map((category: CategoryAttributes, index: number) => (
              <div key={"category-" + index}>
                <h4>Expense category {index + 1}</h4>
                <div className={classnames("row")}>
                  <div className={classnames("col col-8", style.rightPaddingOnly)}>
                    {register("select", {
                      id: `payments[${paymentIndex}].categories[${index}].category`,
                      label: "Category",
                      options: ["Category 1", "Category 2"],
                      required: true
                    })}
                  </div>
                  <div className={classnames("col col-4", style.leftPaddingOnly)}>
                    {register("input", {
                      id: `payments[${paymentIndex}].categories[${index}].amount`,
                      label: "Amount",
                      type: "number",
                      placeholder: "Amount"
                    })}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
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
            {register("file", {
              id: `payments[${paymentIndex}].paymentImages`,
            })}
          </div>
        </MultiFormBody>
      </div>
    </div>
  );
};

export default PaymentForm;