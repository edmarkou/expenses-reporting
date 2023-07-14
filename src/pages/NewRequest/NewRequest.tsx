import classnames from 'classnames';
import style from './style.module.scss';
import { MultiFormHeader } from 'src/components/Form';
import { MultiFormProgress } from 'src/components/Form';
import useFrom from 'src/hooks/useForm';
import { FormEvent, useCallback, useMemo } from 'react';
import Button from 'src/components/Button';
import CostCenterForm from './components/CostCenterForm';
import { useNavigate } from 'react-router-dom';
import { NEW_REQUEST_FORM } from 'src/helpers/constants';
import InfoAndPaymentForm from './components/InfoAndPaymentForm';

function NewRequest() {
  const { 
    register, 
    registerSelect, 
    registerDatePicker, 
    registerFileInput,
    registerRadioInput,
    error, 
    state,
    setState,
    validateForm
  } = useFrom(NEW_REQUEST_FORM);

  const history = useNavigate();

  const firstFormValues = useMemo(() => ({ 
    expenseRelation: state.expenseRelation, 
    project: state.project,
    manager: state.manager,
  }), [state]);

  const isLastFormStep = useMemo(() => Number(state.activeStep) === 1, [state.activeStep]);

  const handleNewRequest = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(['requestName', 'requestComment', 'payments'])) {
      history('/');
    }
  }, [history, validateForm]);

  const onNext = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (validateForm(['expenseRelation', 'project', 'manager'])) {
      setState({ ...state, activeStep: 1 });
    }
  }, [setState, state, validateForm])

  const onCancel = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    history('/');
  }, [history])

  const onAddPayment = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    state.payments.push(NEW_REQUEST_FORM.payments[0]);
    setState({ ...state, payments: state.payments });
  }, [setState, state]);

  const onAddCategory = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, paymentIndex: number) => {
    e.preventDefault();
    const payments = [ ...state.payments ];
    payments[paymentIndex].categories.push(NEW_REQUEST_FORM.payments[0].categories[0]);
    setState({ ...state, payments });
  }, [setState, state]);

  const loadForm = useCallback(() => {
    switch (state.activeStep) {
      case 0: 
        return (
          <CostCenterForm
            registerRadioInput={registerRadioInput}
            registerSelect={registerSelect}
            onNext={onNext}
            onCancel={onCancel}
            validation={firstFormValues}
            error={error}
          />
        );
      case 1: 
        return (
          <InfoAndPaymentForm
            register={register}
            registerSelect={registerSelect}
            registerDatePicker={registerDatePicker}
            registerFileInput={registerFileInput}
            payments={state.payments}
            onAddCategory={onAddCategory}
            onAddPayment={onAddPayment}
          />
        )
      default: 
        break;
    }
  }, [error, firstFormValues, onAddCategory, onAddPayment, onCancel, onNext, register, registerDatePicker, registerFileInput, registerRadioInput, registerSelect, state.activeStep, state.payments]);

  return (
    <div className={classnames("container", style.horizontalCenter, style.requestBackground)}>
      <form className={classnames(style.newRequestForm)} onSubmit={handleNewRequest}>
        <MultiFormHeader 
          showButtons={isLastFormStep} 
          buttons={
            <>
              <Button className={classnames(style.secondaryButton)} onClick={(e) => { e.preventDefault() }}>
                <span>Save Draft</span>
              </Button>
              {register({ 
                type: "submit", 
                value: "Submit Request", 
                className: style.primaryButton,
                containerClassName: style.primaryButtonContainer
              })}
            </>
          }
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
