import { ColumnAttributes } from "src/components/Table";

export const REQUEST_COLUMNS: ColumnAttributes[] = [
  { name: "ID" },
  { name: "Request name" },
  {
    name: "Amount",
    alignment: "right"
  },
  { name: "Project" },
  { name: "Cost center" },
  { name: "Country" },
  { name: "Created at" },
  { name: "Status" },
];

export const NEW_CATEGORY = {
  category: "",
  amount: ""
};

export const NEW_REQUEST_FORM = {
  activeStep: 1,
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
};