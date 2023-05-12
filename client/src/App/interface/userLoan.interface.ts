import IUserData from './user.interface';
import ILoanData from './loan.interface';

interface IUserLoanData extends IUserData, ILoanData {
  check: boolean;
}

export default IUserLoanData;
