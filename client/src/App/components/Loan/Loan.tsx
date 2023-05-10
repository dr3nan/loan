import React, { useEffect, useState } from 'react';
import IUserData from '../../interface/user.interface';
import ILoanData from '../../interface/loan.interface';
import { getUserByID } from '../../services/api.service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
      // fetch user data from server calling our service endpoint
      const response = await getUserByID(userId);
      // deconstruct response object
      const { id, name, surname, email, phone, age } = await response.json();
      // set user data
      setUserData({
        id,
        name,
        surname,
        email,
        phone,
        age: {
          day: new Date(age).getDate(),
          month: new Date(age).getMonth() + 1,
          year: new Date(age).getFullYear(),
        }
      });
    };
    fetchUserData();
  }, []);

  return (
    <div>Loan</div>
  )
}
