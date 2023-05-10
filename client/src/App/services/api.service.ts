const CLFRAMEWORK_URL = process.env.REACT_APP_CLFRAMEWORK_URL;

export const getUserByID = async (userId: number) => {
  try {
    const url = `${CLFRAMEWORK_URL}/users/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-WEB-KEY': 'Development'
      }
    });
    return response.json()
  } catch (err) {
    console.error(err)
  }
};
