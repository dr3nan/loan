import { dateFormat } from '../helpers/functions';
import IUserLoanData from '../interface/userLoan.interface';

const BASE_GET_URL = 'https://api7.cloudframework.io/recruitment/fullstack/users?id=';
const BASE_POST_URL = 'https://api7.cloudframework.io/recruitment/fullstack/users/';

export const getUserByID = async (userId: number) => {
  try {
    const url = `${BASE_GET_URL}${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-WEB-KEY': 'Development'
      }
    });

    return await response.json();
  } catch (err) {
    console.error(err)
  }
};

export const updateUser = async (userData: IUserLoanData) => {
  console.log('user', userData);
  console.log('user id', userData.id);
  try {
    const formattedLoanDate = dateFormat(userData.loan_date);
    const url = `${BASE_POST_URL}${userData.id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WEB-KEY': 'Development'
      },
      body: JSON.stringify({
        ...userData,
        loan_date: formattedLoanDate
      })
    });

    if (!response.ok) {
      throw new Error('Error updating user');
    }

    return await response.json();
  } catch (err) {
    console.error(err);
  }
}