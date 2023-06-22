import Joi from "joi";

type DataTypes = {
  email?: string,
  password?: string,
  name?: string,
  confirmPassword?: string
}

type DataKeyType = "name" | "email" | "password" | "confirmPassword";

type LabelName = "name" | "email" | "password" | "confirmPassword" | "ref:password";

type LabelTypes = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    "ref:password": string;
}

const labels: LabelTypes = {
  name: "Name",
  email: "Email address",
  password: "Password",
  confirmPassword: "Password confirmation",
  "ref:password": "matching the password",
};

type Validator = {
  email: Joi.StringSchema<string>;
  password: Joi.StringSchema<string>;
  name: Joi.StringSchema<string>;
  confirmPassword: Joi.AnySchema<any>;
}

const validator: Validator = {
  email: Joi.string()
    .min(3)
    .max(320)
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(new RegExp("[a-zA-Z0-9]")),
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(new RegExp("[a-zA-Z0-9_ ]")),
  confirmPassword: Joi.any().valid(Joi.ref("password")),
};

function useValidator() {
  const findLabel = (inputString: string, regex: RegExp) => {
    const matches = inputString.match(regex);

    if (matches && matches.length > 0) {
      const key = matches[0].slice(1, -1) as LabelName;
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