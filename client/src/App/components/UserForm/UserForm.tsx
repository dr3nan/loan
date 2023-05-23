import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import IUserFormProps from '../../interface/props.interface';
import IUserLoanData from '../../interface/userLoan.interface';

export const UserForm: React.FC<IUserFormProps> = ({
  handleSubmit,
  userLoanData,
  setUserLoanData,
  // handleLoanDateChange,
}) => {
  const [initialState, setInitialState] = useState<IUserLoanData>(userLoanData);
  console.log({ userLoanData });

  const isFieldEditable = (field: keyof IUserLoanData) => {
    return userLoanData[field] === '';
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoanDateChange = (date: Date | null) => {
    if (date) {
      setUserLoanData({
        ...userLoanData,
        loan_date: date,
      });
    }
  };
  // readOnly attribute has been disabled on some fields as per test request, on normal circumstances
  // it should be enabled if we want to just load the user data and not edit it
  return (
    <form className='user-details-form'
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(initialState);
      }}
    >
      <label htmlFor='name'>
        Nombre
      </label>
      <input
        type='text'
        name='name'
        id='name'
        value={initialState.name}
        className='name'
        readOnly={!isFieldEditable('name')}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='surname'>
        Apellido
      </label>
      <input
        type='text'
        name='surname'
        id='surname'
        value={initialState.surname}
        className='surname'
        readOnly={!isFieldEditable('surname')}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='email'>
        Email
      </label>
      <input
        type='email'
        name='email'
        id='email'
        value={initialState.email}
        className='email'
        readOnly={!isFieldEditable('email')}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='phone'>
        Teléfono
      </label>
      <input
        type='number'
        name='phone'
        id='phone'
        value={initialState.phone}
        className='phone'
        // readOnly={!isFieldEditable('phone')}
        onChange={handleInputChange}
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
        value={initialState.age}
        className='age'
        // readOnly={!isFieldEditable('age')}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='loan_amount'>
        Importe del préstamo
      </label>
      <input
        type='number'
        min={11}
        max={1000}
        name='loan_amount'
        id='loan_amount'
        value={initialState.loan_amount}
        className='loan_amount'
        // readOnly={!isFieldEditable('loan_amount')}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='loan_date'>
        Fecha a conseguir el préstamo
      </label>
      <DatePicker
        selected={initialState.loan_date}
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
        value={initialState.loan_weeks}
        className='loan_weeks'
        // readOnly={!isFieldEditable('loan_weeks')}
        onChange={handleInputChange}
        required
      />
      <div className='checkbox'>
        <label htmlFor='checkbox-label'>
          <input
            type='checkbox'
            name='check'
            id='check'
            checked={initialState.check}
            className='checkbox-input'
            onChange={handleInputChange}
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
  )
};
