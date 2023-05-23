import { useEffect, useState } from 'react';
import IUserLoanData from '../../interface/userLoan.interface';
import { getUserByID, updateUser } from '../../services/api.service';
import './loan.scss';
import './response.scss';
import { UserForm } from '../UserForm/UserForm';
import { useParams } from 'react-router-dom';
import { numberTypeConversionWithDecimal } from '../../helpers/functions';

export const Loan = () => {
  const [userLoanData, setUserLoanData] = useState<IUserLoanData | null>(null);
  const [getError, setGetError] = useState<string>('');
  const [postError, setPostError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const idParams = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      try {
        const response = await getUserByID(Number(userId));
        if (response.status !== 200) {
          throw new Error(`${response.status} ${response.message}`)
        };

        const { id, name, surname, email, phone, age, loan_amount, loan_weeks, check } = await response.data;
        setUserLoanData({
          id,
          name: name || '',
          surname: surname || '',
          email: email || '',
          phone: phone || '',
          age: age || 0,
          loan_amount: loan_amount || 0,
          loan_date: new Date(),
          loan_weeks: loan_weeks || 0,
          check: check || false,
        });
        setGetError('');
      } catch (err: any) {
        setGetError(`Response error: ${err.message}`);
      }
    };
    if (idParams.id) {
      fetchUserData(idParams.id);
    };
  }, [idParams.id]);

  const handleSubmit = async (loanData: IUserLoanData) => {
    try {
      const response = await updateUser(loanData);
      if (response.status !== 201) {
        throw new Error(`${response.status} ${response.message}`)
      };
      setUserLoanData({
        ...loanData,
        ...response.data
      });

      setSuccess(true);
      setPostError('');
    } catch (err: any) {
      if (err instanceof Error) {
        setPostError(`Response error: ${err.message}`);
      };

      setSuccess(false);
      setPostError(`Response error: ${err.message}`);
    }
  };

  if (userLoanData === null) return null;
  const loanAmount = numberTypeConversionWithDecimal(userLoanData.loan_amount);

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
            <li>Importe del préstamo: € {loanAmount}</li>
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
        />
      )}
    </main>
  )
};
