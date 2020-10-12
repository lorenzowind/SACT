export default interface IUpdateAvaliationDTO {
  evaluator_id: string;
  project_id: string;
  comments?: string;
  status?: 'to_evaluate' | 'rated';
}
