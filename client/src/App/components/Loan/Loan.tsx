import React, { useEffect, useState } from 'react';
import IUserLoanData from '../../interface/userLoan.interface';
import { getUserByID, updateUser } from '../../services/api.service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Loan = () => {
  const [userLoanData, setUserLoanData] = useState<IUserLoanData>({
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: '',
    age: 0,
    loan_amount: 0,
    loan_date: new Date(),
    loan_weeks: 0,
    check: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let userId = Number(urlParams.get('id'));
      userId = 1;
      // create try catch block to handle GET errors

      const response = await getUserByID(userId);

      const { id, name, surname, email, phone, age, loan_amount, loan_date, loan_weeks, check } = await response.data;
      setUserLoanData({
        id,
        name,
        surname,
        email,
        phone,
        age,
        loan_amount,
        loan_date: new Date(),
        loan_weeks,
        check,
      });
    };
    fetchUserData();
  }, []);

  const handleLoanDateChange = (date: Date) => {
    setUserLoanData({
      ...userLoanData,
      loan_date: date,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // create try catch block to handle POST errors
    await updateUser(userLoanData);
  };

  return (
    <form className='user-details-form'
      onSubmit={handleSubmit}
    >
      <label htmlFor='name'>
        Nombre
        <input
          type='text'
          name='name'
          id='name'
          value={userLoanData.name}
          readOnly
        />
      </label>
      <label htmlFor='surname'>
        Apellido
        <input
          type='text'
          name='surname'
          id='surname'
          value={userLoanData.surname}
          readOnly
        />
      </label>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          name='email'
          id='email'
          value={userLoanData.email}
          readOnly
        />
      </label>
      <label htmlFor='phone'>
        Teléfono
        <input
          type='tel'
          name='phone'
          id='phone'
          value={userLoanData.phone}
          onChange={(event) => setUserLoanData({ ...userLoanData, phone: event.target.value })}
          required
        />
      </label>
      <label htmlFor='age'>
        Edad
        <input
          type='number'
          name='age'
          id='age'
          min={18}
          max={120}
          value={userLoanData.age}
          onChange={(event) => setUserLoanData({ ...userLoanData, age: Number(event.target.value) })}
          required
        />
      </label>
      <label htmlFor='loan_amount'>
        Importe del préstamo
        <input
          type='number'
          min={11}
          max={1000}
          step={1}
          name='loan_amount'
          id='loan_amount'
          value={userLoanData.loan_amount}
          onChange={(event) => setUserLoanData({ ...userLoanData, loan_amount: Number(event.target.value) })}
          required
        />
      </label>
      <label htmlFor='loan_date'>
        Fecha a conseguir el prestamo
        <DatePicker
          selected={userLoanData.loan_date}
          minDate={new Date()}
          onChange={handleLoanDateChange}
          dateFormat='yyy-MM-dd'
          required
        />
      </label>
      <label htmlFor='loan_weeks'>
        Tiempo a devolver (en semanas)
        <input
          type='number'
          min={1}
          max={20}
          step={1}
          name='loan_weeks'
          id='loan_weeks'
          value={userLoanData.loan_weeks}
          onChange={(event) => setUserLoanData({ ...userLoanData, loan_weeks: Number(event.target.value) })}
          required
        />
      </label>
      <div>
        <label htmlFor='check-box'>
          <input
            type='checkbox'
            name='check'
            id='check'
            checked={userLoanData.check}
            onChange={(event) => setUserLoanData({ ...userLoanData, check: event.target.checked })}
            // add a link to terms and conditions page with link https://cloudframework.io/terminos-y-condiciones/
            required
          />
          Aceptar términos y condiciones
        </label>
      </div>
      <button type='submit'>Enviar Solicitud</button>
    </form>
  )
}
