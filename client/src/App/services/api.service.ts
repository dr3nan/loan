// const CLFRAMEWORK = process.env.REACT_APP_CLFRAMEWORK_URL;
// console.log(CLFRAMEWORK);

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

      const data = await response.json();
      // console.log('data from api', data);
      return data;
    } catch (err) {
      console.error(err)
    }
  // }
};
