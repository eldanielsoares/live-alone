export default interface ICreateMonthlySpentDTO {
  name: string;
  value: number;
  type: 'fixed' | 'variable';
  user_id: string;
}
