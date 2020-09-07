export default interface ICreateOrUpdateAvaliationDTO {
  evaluator_id: string;
  project_id: string;
  status?: 'to_evaluate' | 'rated';
}
