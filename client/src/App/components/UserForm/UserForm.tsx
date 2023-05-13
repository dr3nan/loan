import React from 'react';
import DatePicker from 'react-datepicker';

export const UserForm = ({ handleSubmit, userLoanData, setUserLoanData, handleLoanDateChange }) => {
  return (
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
  )
}
