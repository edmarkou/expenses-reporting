import classnames from 'classnames';
import style from './style.module.scss';
import { MultiFormHeader } from '../../components/Form';
import { MultiFormProgress } from '../../components/Form';
import useFrom from '../../hooks/useForm';
import { PlusIcon } from '../../components/Icons';
import { FormEvent, useCallback, useMemo } from 'react';
import Button from '../../components/Button';
import RequestInfoFrom from './components/RequestInfoForm';
import PaymentForm from './components/PaymentForm';
import CostCenterForm from './components/CostCenterForm';
import { useNavigate } from 'react-router-dom';

function NewRequest() {
  const { 
    register, 
    registerSelect, 
    registerDatePicker, 
    registerFileInput, 
    registerButton,
    registerRadioInput,
    handleSubmit, 
    error, 
    state 
  } = useFrom({
    activeStep: 0,
    expenseRelation: "project",
    manager: "",
    project: "",
    requestName: "",
    requestComment: "",
    payments: [{
      paymentDate: "",
      currency: "",
      paymentComment: "",
      categories: [{
        category: "",
        amount: "",
      }],
      paymentImages: [],
    }]
  });
  const history = useNavigate();

  const firstFormValues = useMemo(() => ({ 
    expenseRelation: state.expenseRelation, 
    project: state.project,
    manager: state.manager,
  }), [state]);

  const isLastFormStep = useMemo(() => Number(state.activeStep) === 1, [state.activeStep]);

  const handleNewRequest = useCallback((e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e, () => {
      history('/');
    });
  }, [handleSubmit, history]);

  const onNextStep = useCallback(() => (
    { ...state, activeStep: 1 }
  ), [state])

  const onCancel = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    history('/');
  }, [history])

  const onAddPayment = useCallback(() => {
    const payments = [ ...state.payments as any, {
      currency: "",
      paymentDate: "",
      categories: [{
        category: "",
        amount: "",
      }],
      paymentImages: [],
    }];
    return { ...state, payments };
  }, [state]);

  const onAddCategory = useCallback((paymentIndex: number) => {
    let payments = [ ...state.payments as any ];
    payments[paymentIndex].categories.push({
      category: "",
      amount: "",
    });
    return { ...state, payments };
  }, [state]);

  const loadForm = useCallback(() => {
    if (Number(state.activeStep) === 0) {
      return (
        <CostCenterForm
          registerRadioInput={registerRadioInput}
          registerButton={registerButton}
          registerSelect={registerSelect}
          onNext={onNextStep}
          onCancel={onCancel}
          validation={firstFormValues}
          error={error}
        />
      );
    } else if (Number(state.activeStep) === 1) {
      return [
        <RequestInfoFrom register={register}/>,
        (state.payments as any).map((payment: any, i: number) => (
          <PaymentForm
            key={"payment" + i}
            register={register}
            paymentIndex={i}
            registerButton={registerButton}
            registerSelect={registerSelect}
            registerDatePicker={registerDatePicker}
            registerFileInput={registerFileInput}
            payment={payment}
            onAddCategory={onAddCategory}
          />
        )),
        <div className={classnames("row row-centered")}>
          {registerButton({
            className: style.addPaymentButton,
            getNewState: onAddPayment,
            children: [
              <PlusIcon className={style.orangePlusIcon}/>,
              <span>Add payment</span>
            ]
          })}
        </div>
      ]
    }
  }, [error, firstFormValues, onAddCategory, onAddPayment, onCancel, onNextStep, register, registerButton, registerDatePicker, registerFileInput, registerRadioInput, registerSelect, state.activeStep, state.payments]);

  return (
    <div className={classnames("container", style.horizontalCenter, style.requestBackground)}>
      <form className={classnames(style.newRequestForm)} onSubmit={handleNewRequest}>
        <MultiFormHeader 
          showButtons={isLastFormStep} 
          buttons={[
            <Button className={classnames(style.secondaryButton)} onClick={(e) => { e.preventDefault() }}>
              <span>Save Draft</span>
            </Button>,
            register({ 
              type: "submit", 
              value: "Submit Request", 
              className: style.primaryButton,
              containerClassName: style.primaryButtonContainer
            })
          ]}
        />
        <div className={classnames(style.newRequestBodyContainer)}>
          <MultiFormProgress steps={["Cost center", "Payment adding"]} activeStep={Number(state.activeStep)}/>
          {loadForm()}
        </div>
      </form>
    </div>
  );
}

export default NewRequest;
