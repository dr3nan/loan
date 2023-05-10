// const CLFRAMEWORK = process.env.REACT_APP_CLFRAMEWORK_URL;
// console.log(CLFRAMEWORK);

import ILoanData from '../interface/loan.interface';
import IUserData from '../interface/user.interface';

export const getUserByID = async (userId: number) => {
  // if (CLFRAMEWORK) {
    try {
      // const url = new URL(CLFRAMEWORK);
      const url = 'https://api7.cloudframework.io/recruitment/fullstack/users?id=1';
      // url.searchParams.append('id', userId.toString())
      // const response = await fetch(url.toString(), {
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
  // }
};

export const updateUser = async (user: IUserData, loan: ILoanData) => {
  console.log('user', user);
  console.log('loan', loan);
  try {
    const url = 'https://api7.cloudframework.io/recruitment/fullstack/users?id=1';
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