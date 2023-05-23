import IUserLoanData from './userLoan.interface';

interface IUserFormProps {
  handleSubmit: (loanData: IUserLoanData) => void;
  userLoanData: IUserLoanData;
}

export default IUserFormProps;
