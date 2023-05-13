import React from 'react';
import IUserLoanData from './userLoan.interface';

interface IUserFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  userLoanData: IUserLoanData;
  setUserLoanData: React.Dispatch<React.SetStateAction<IUserLoanData>>;
  handleLoanDateChange: (date: Date | null) => void;
}

export default IUserFormProps;
