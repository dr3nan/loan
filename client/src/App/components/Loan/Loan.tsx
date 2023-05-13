import React, { useEffect, useState } from 'react';
import IUserLoanData from '../../interface/userLoan.interface';
import { getUserByID, updateUser } from '../../services/api.service';
import './loan.scss';
import './response.scss';
import { UserForm } from '../UserForm/UserForm';

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
    loan_weeks: 1,
    check: false,
  });
  const [getError, setGetError] = useState<string>('');
  const [postError, setPostError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdParam = Number(urlParams.get('id'));
      const userId = userIdParam ? Number(userIdParam) : 0;

      if (userId !== null && userId !== 0) {
        try {
          const response = await getUserByID(userId);
          if (response.status !== 200) {
            throw new Error(`${response.status} ${response.errors}`)
          };

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
          setGetError('');
        } catch (err: any) {
          setGetError(`Response error: ${err.message}`);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLoanDateChange = (date: Date | null) => {
    if (date) {
      setUserLoanData({
        ...userLoanData,
        loan_date: date,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await updateUser(userLoanData);
      if (response.status !== 201) {
        throw new Error(`${response.status} ${response.errors}`)
      };
      setSuccess(true);
      setPostError('');
    } catch (err: any) {
      setSuccess(false);
      setPostError(`Response error: ${err.message}`);
    }
  };

  return (
    <main className='form-container'>
      {getError ? (
        <div className='error-get'>
          <h1>Ha ocurrido un error</h1>
          <p>{getError}</p>
        </div>
      ) : success ? (
        <div className='success'>
          <h1>¡Gracias por tu solicitud {userLoanData.name}!</h1>
          <p>A continuación te mostramos un resumen de los datos enviados:</p>
          <ul>
            <li>Nombre: {userLoanData.name}</li>
            <li>Apellido: {userLoanData.surname}</li>
            <li>Email: {userLoanData.email}</li>
            <li>Teléfono: {userLoanData.phone}</li>
            <li>Edad: {userLoanData.age}</li>
            <li>Importe del préstamo: € {userLoanData.loan_amount.toFixed(2)}</li>
            <li>Fecha a conseguir el préstamo: {userLoanData.loan_date.toLocaleDateString()}</li>
            <li>Tiempo a devolver (en semanas): {userLoanData.loan_weeks}</li>
          </ul>
          <p>En breve nos pondremos en contacto contigo.</p>
        </div>
      ) : postError ? (
        <div className='error-post'>
          <h1>Ha ocurrido un error</h1>
          <p>{postError}</p>
          <button onClick={() => setPostError('')}>Volver</button>
        </div>
      ) : (
        <UserForm
          handleSubmit={handleSubmit}
          userLoanData={userLoanData}
          setUserLoanData={setUserLoanData}
          handleLoanDateChange={handleLoanDateChange}
        />
      )}
    </main>
  )
};
