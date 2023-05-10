interface IUserData {
  id?: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: {
    day: number;
    month: number;
    year: number
  };
}

export default IUserData;
