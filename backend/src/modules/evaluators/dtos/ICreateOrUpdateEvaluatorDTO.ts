export default interface ICreateOrUpdateEvaluatorDTO {
  name: string;
  occupation_area?: string;
  institution?: string;
  phone_number?: string;
  email?: string;
  cpf: string;
  status: 'to_evaluate' | 'assessing' | 'rated';
}
