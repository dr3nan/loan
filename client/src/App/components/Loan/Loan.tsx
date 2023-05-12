import React, { useEffect, useState } from 'react';
import IUserLoanData from '../../interface/userLoan.interface';
import { getUserByID, updateUser } from '../../services/api.service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './loan.scss';
import './response.scss';

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
      };
    }
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
        <form className='user-details-form'
          onSubmit={handleSubmit}
        >
          <label htmlFor='name'>
            Nombre
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={userLoanData.name}
            className='name'
            readOnly
          />
          <label htmlFor='surname'>
            Apellido
          </label>
          <input
            type='text'
            name='surname'
            id='surname'
            value={userLoanData.surname}
            className='surname'
            readOnly
          />
          <label htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={userLoanData.email}
            className='email'
            readOnly
          />
          <label htmlFor='phone'>
            Teléfono
          </label>
          <input
            type='tel'
            name='phone'
            id='phone'
            value={userLoanData.phone}
            onChange={(event) => setUserLoanData({ ...userLoanData, phone: event.target.value })}
            className='phone'
            required
          />
          <label htmlFor='age'>
            Edad
          </label>
          <input
            type='number'
            name='age'
            id='age'
            min={18}
            max={120}
            value={userLoanData.age}
            onChange={(event) => setUserLoanData({ ...userLoanData, age: parseFloat(event.target.value) })}
            className='age'
            required
          />
          <label htmlFor='loan_amount'>
            Importe del préstamo
          </label>
          <input
            type='number'
            min={11}
            max={1000}
            step={1}
            name='loan_amount'
            id='loan_amount'
            value={userLoanData.loan_amount}
            onChange={(event) => setUserLoanData({ ...userLoanData, loan_amount: parseFloat(event.target.value) })}
            className='loan_amount'
            required
          />
          <label htmlFor='loan_date'>
            Fecha a conseguir el préstamo
          </label>
          <DatePicker
            selected={userLoanData.loan_date}
            minDate={new Date()}
            onChange={handleLoanDateChange}
            dateFormat='yyy-MM-dd'
            className='loan_date'
            required
          />
          <label htmlFor='loan_weeks'>
            Tiempo a devolver (en semanas)
          </label>
          <input
            type='number'
            min={1}
            max={20}
            step={1}
            name='loan_weeks'
            id='loan_weeks'
            value={userLoanData.loan_weeks}
            onChange={(event) => setUserLoanData({ ...userLoanData, loan_weeks: parseFloat(event.target.value) })}
            className='loan_weeks'
            required
          />
          <div className='checkbox'>
            <label htmlFor='checkbox-label'>
              <input
                type='checkbox'
                name='check'
                id='check'
                checked={userLoanData.check}
                onChange={(event) => setUserLoanData({ ...userLoanData, check: event.target.checked })}
                className='checkbox-input'
                required
              />
              Aceptar{' '}
              <a
                href='https://cloudframework.io/terminos-y-condiciones/'
                target='_blank'
                rel='noreferrer'
              >
                Términos y Condiciones
              </a>
            </label>
          </div>
          <button
            type='submit'
            className='submit-button'
          >
            Enviar Solicitud
          </button>
        </form>
      )}
    </main>
  )
};
