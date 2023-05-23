import React from 'react';
import IUserLoanData from './userLoan.interface';

interface IUserFormProps {
  handleSubmit: (loanData: IUserLoanData) => void;
  userLoanData: IUserLoanData;
  setUserLoanData: React.Dispatch<React.SetStateAction<IUserLoanData | null>>;
  // handleLoanDateChange: (date: Date | null) => void;
}

export default IUserFormProps;
