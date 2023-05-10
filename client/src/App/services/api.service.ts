const CLFRAMEWORK_URL = process.env.REACT_APP_CLFRAMEWORK_URL;

export const getUserByID = async (userId: number) => {
  try {
    const url = `${CLFRAMEWORK_URL}/users/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-WEB-KEY': 'Development',
        'Content-Type': 'application/json'
      }
    });
    return response.json()
  } catch (err) {
    console.error(err)
  }
};
