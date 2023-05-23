import IUserData from './user.interface';
import ILoanData from './loan.interface';

interface IUserLoanData extends IUserData, ILoanData {
  check: boolean;
  // [key: string]: string | number | boolean | null | undefined | Date;
}

export default IUserLoanData;
