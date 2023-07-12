import { CheckIcon } from "../../Icons";
import style from "./style.module.scss";
import classnames from "classnames";

type FormHeaderTypes = {
  steps: string[],
  activeStep: number
};

const MultiFormProgress = ({ steps, activeStep }: FormHeaderTypes) => (
  <div className={classnames("row row-centered")}>
    <div className={classnames(style.multiFormProgressContainer)}>
      {steps.map((step, i) => (
        <div key={i} className={classnames(style.stepContainer)}>
          {i !== 0 && <div className={classnames(style.multiFormProgressSeparator)}/>}
          <div 
            className={classnames({
              [style.multiFormProgressBubble]: true, 
              [style.multiFormProgressActiveBubble]: i === activeStep,
              [style.multiFormProgressFinishedBubble]: i < activeStep
            })}
          >
            {i < activeStep ? <CheckIcon/> : <span>{i + 1}</span>}
            <span 
              key={step + i} 
              className={classnames({
                [style.multiFormProgressLabel]: true,
                [style.multiFormProgressActiveLabel]: i === activeStep
              })}
            >
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MultiFormProgress;