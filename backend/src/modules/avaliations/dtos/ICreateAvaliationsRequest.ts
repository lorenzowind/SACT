export default interface ICreateOrUpdateAvaliationDTO {
  evaluator_id: string;
  projects: {
    project_id: string;
    status?: 'to_evaluate' | 'rated';
  }[];
}
