export default interface ICreateMonthlySpentDTO {
  name: string;
  amount: number;
  type: 'fixed' | 'variable';
  user_id: string;
}
