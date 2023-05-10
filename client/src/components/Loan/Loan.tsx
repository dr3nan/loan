import React, { useState } from 'react';
import IUserData from '../../interface/user.interface';
import ILoanData from '../../interface/loan.interface';

export const Loan = () => {
  const [userData, setUserData] = useState<IUserData>({
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: '',
    age: { day: 0, month: 0, year: 0, },
  });

  const [loanData, setLoanData] = useState<ILoanData>({
    loan_amount: 0,
    loan_date: '',
    loan_weeks: 0,
  });

  return (
    <div>Loan</div>
  )
}
