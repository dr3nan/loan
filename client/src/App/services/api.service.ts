import ILoanData from '../interface/loan.interface';
import IUserData from '../interface/user.interface';

const BASE_URL = 'https://api7.cloudframework.io/recruitment/fullstack/users?id=';

export const getUserByID = async (userId: number) => {
  try {
    const url = `${BASE_URL}${userId}`;
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

export const updateUser = async (user: IUserData, loan: ILoanData) => {
  console.log('user', user);
  console.log('loan', loan);
  try {
    const url = `${BASE_URL}${user.id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WEB-KEY': 'Development'
      },
      body: JSON.stringify({
        ...user,
        ...loan
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