import React, { useEffect, useState } from 'react';
import IUserData from '../../interface/user.interface';
import ILoanData from '../../interface/loan.interface';
import { getUserByID, updateUser } from '../../services/api.service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Loan = () => {
  const [userData, setUserData] = useState<IUserData>({
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: '',
    age: 0,
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
      if (!response) {
        throw new Error(`${response.status} ${response.code}`);
      };

      console.log('response in FE', response.data);
      // deconstruct response object
      const { id, name, surname, email, phone, age } = await response.data;
      setUserData({
        id,
        name,
        surname,
        email,
        phone,
        age
      });
    };
    fetchUserData();
  }, []);

  // create loan date change handler function
  const handleLoanDateChange = (date: Date) => {
    setLoanData({
      ...loanData,
      loan_date: date
    });
  };

  // create submit handler function
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await updateUser(userData, loanData);
    console.log('response POST', response);
    // if (!response) {
    //   throw new Error(`${response.status} ${response.code}`);
    // };

    console.log('form submitted');
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
          value={userData.name}
          readOnly
        />
      </label>
      <label htmlFor='surname'>
        Apellido
        <input
          type='text'
          name='surname'
          id='surname'
          value={userData.surname}
          readOnly
        />
      </label>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          name='email'
          id='email'
          value={userData.email}
          readOnly
        />
      </label>
      <label htmlFor='phone'>
        Teléfono
        <input
          type='tel'
          name='phone'
          id='phone'
          value={userData.phone}
          onChange={(event) => setUserData({ ...userData, phone: event.target.value })}
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
          value={userData.age}
          onChange={(event) => setUserData({ ...userData, age: Number(event.target.value) })}
          required
        />
      </label>
      <label htmlFor='loan_amount'>
        Importe del préstamo
        <input
          type='number'
          min={10}
          max={1000}
          step={1}
          name='loan_amount'
          id='loan_amount'
          value={loanData.loan_amount}
          onChange={(event) => setLoanData({ ...loanData, loan_amount: Number(event.target.value) })}
          required
        />
      </label>
      <label htmlFor='loan_date'>
        Fecha a conseguir el prestamo
        <DatePicker
          selected={loanData.loan_date}
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
          value={loanData.loan_weeks}
          onChange={(event) => setLoanData({ ...loanData, loan_weeks: Number(event.target.value) })}
          required
        />
      </label>
      <div>
        <label htmlFor='check-box'>
          <input
            type='checkbox'
            name='check-box'
            id='check-box'
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
