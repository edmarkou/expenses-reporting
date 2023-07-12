import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

type CategoryType = {
  category: string,
  amount: string,
}

type PaymentType = {
  paymentDate: string,
  currency: string,
  categories: CategoryType[],
  paymentComment: string,
  paymentImages: any[],
}

type DataTypes = {
  email?: string,
  password?: string,
  name?: string,
  confirmPassword?: string,
  requestName?: string,
  requestComment?: string
  expenseRelation?: string, 
  manager?: string,
  project?: string,
  payments?: PaymentType[]
}

type DataKeyType = 
  "name" | 
  "email" | 
  "password" | 
  "confirmPassword" | 
  "requestName" | 
  "requestComment" | 
  "expenseRelation" |
  "manager" |
  "project" |
  "payments";

type LabelName = 
  "name" | 
  "email" | 
  "password" | 
  "confirmPassword" | 
  "ref:password" | 
  "requestName" | 
  "requestComment" | 
  "expenseRelation" |
  "manager" |
  "project" |
  "paymentDate" |
  "payments";

type LabelTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  "ref:password": string;
  requestName: string;
  requestComment: string;
  expenseRelation: string, 
  project: string,
  manager: string,
  paymentDate: string,
  currency: string,
  paymentComment: string,
  category: string
  amount: string,
  payments: string
}

const labels: LabelTypes = {
  name: "Name",
  email: "Email address",
  password: "Password",
  confirmPassword: "Password confirmation",
  "ref:password": "matching the password",
  requestName: "Request name",
  requestComment: "Request comment",
  expenseRelation: "Expense relation",
  project: "Project", 
  manager: "Manager",
  paymentDate: "Payment date",
  paymentComment: "Payment comment",
  category: "Payment category",
  amount: "Payment amount",
  currency: "Currency",
  payments: "Payments",
};

const complexityOptions = {
  min: 12,
  max: 255,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 3,
};

type Validator = {
  email: Joi.StringSchema<string>;
  password: Joi.StringSchema<string>;
  name: Joi.StringSchema<string>;
  confirmPassword: Joi.AnySchema<any>;
  requestName: Joi.StringSchema<string>;
  requestComment: Joi.StringSchema<string>;
  expenseRelation: Joi.StringSchema<string>;
  project: Joi.StringSchema<string>;
  manager: Joi.StringSchema<string>;
  payments: Joi.ArraySchema<PaymentType[]>;
  activeStep: Joi.NumberSchema<number>
}

const validator: Validator = {
  email: Joi.string()
    .min(3)
    .max(320)
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  password: PasswordComplexity(complexityOptions),
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(new RegExp("[a-zA-Z0-9_ ]")),
  confirmPassword: Joi.any().valid(Joi.ref("password")),
  requestName: Joi.string()
    .min(2)
    .max(100)
    .pattern(new RegExp("[a-zA-Z0-9_ ]")),
  requestComment: Joi.string().allow("").max(300).pattern(new RegExp("[a-zA-Z0-9_ ]")),
  expenseRelation: Joi.string().min(2),
  project: Joi.string().min(2),
  manager: Joi.string().min(2),
  payments: Joi.array().items({
    paymentDate: Joi.string(),
    currency: Joi.string(),
    paymentComment: Joi.string()
      .min(2)
      .max(300)
      .pattern(new RegExp("[a-zA-Z0-9_ ]")),
    categories: Joi.array().items({
      category: Joi.string(),
      amount: Joi.string(),
    }),
    paymentImages: Joi.array(),
  }).length(1),
  activeStep: Joi.number(),
};

function useValidator() {
  const findLabel = (inputString: string, regex: RegExp) => {
    const matches = inputString.match(regex);

    if (matches && matches.length > 0) {
      let match = matches[0];
      if (match.includes('.')) {
        const words = match.split('.');
        match = `"${words[words.length - 1]}`;
      }
      const key = match.slice(1, -1) as LabelName;
      console.log(key)
      return labels[key];
    }

    return "";
  };

  const findWordBetweenQuotes = (inputString: string): string => {
    const regex = /"([^"]+)"/g;
    return findLabel(inputString, regex);
  };

  const findWordBetweenBrackets = (inputString: string) => {
    const regex = /\[([^[\]]+)\]/g;
    return findLabel(inputString, regex);
  };

  const formatErrorMessage = (message: string) => {
    const quoteReplacement = findWordBetweenQuotes(message);
    let formatedMessage = message.replace(/"(.*?)"/g, quoteReplacement);

    const bracketReplacement = findWordBetweenBrackets(message);
    if (bracketReplacement) {
      formatedMessage = formatedMessage.replace(
        /\[[^\]]+\]/g,
        bracketReplacement
      );
    }
    return formatedMessage;
  };

  const validate = (data: DataTypes) => {
    const dataToValidate = Object.keys(data).reduce((prev, curr) => {
      if (validator[curr as DataKeyType]) prev[curr] = validator[curr as DataKeyType];
      return prev as object;
    }, {} as any);
    const scheme = Joi.object(dataToValidate);
    return scheme.validate(data);
  };

  return { validate, formatErrorMessage };
}

export default useValidator;