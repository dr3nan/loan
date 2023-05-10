import React, { useEffect, useState } from 'react';
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
    loan_date: new Date(),
    loan_weeks: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = Number(urlParams.get('id'));

      // fetch user data function from the server calling our service endpoint

      // assign the response to a new variable
      // const data = await response.json();
    };
    fetchUserData();
  }, []);

  return (
    <div>Loan</div>
  )
}
