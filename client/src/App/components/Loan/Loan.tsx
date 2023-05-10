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
      let userId = Number(urlParams.get('id'));
      userId = 1;
      // fetch user data from server calling our service endpoint
      const response = await getUserByID(userId);
      // if (!response.ok) {
      //   throw new Error(`${response.status} ${response.code}`);
      // };

      console.log('response in FE', response.data);
      // deconstruct response object
      const { id, name, surname, email, phone, age } = await response.data;
      setUserData({
        id,
        name,
        surname,
        email,
        phone,
        age: {
          day: new Date(age).getDate(),
          month: new Date(age).getMonth() + 1,
          year: new Date(age).getFullYear()
        }
      });
    };
    fetchUserData();
  }, []);

  console.log('user state', userData);

  useEffect(() => {
    console.log('state has been changed');
  }, [userData]);

  // console.log('userData', userData);
  // create day change handler function

  // create month change handler function

  // create year change handler function

  // create loan date change handler function

  // create submit handler function

  return (
    <form className='user-details-form'>
      <label htmlFor='name'>
        Nombre
        <input
          type='text'
          name='name'
          id='name'
          value={userData.name}
          required />
      </label>
      <label htmlFor='surname'>
        Apellido
        <input
          type='text'
          name='surname'
          id='surname'
          value={userData.surname}
          required />
      </label>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          name='email'
          id='email'
          value={userData.email}
          required />
      </label>
      <label htmlFor='phone'>
        Teléfono
        <input
          type='tel'
          name='phone'
          id='phone'
          value={userData.phone}
          required />
      </label>
      <label htmlFor='age'>
        Edad
        <input type='number' name='day' id='day' value={userData.age.day} required />
        <select name='month' id='month' value={userData.age.month} required>
          {[...Array(12)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <input type='number' name='year' id='year' value={userData.age.year} required />
      </label>
    </form>
  )
}
