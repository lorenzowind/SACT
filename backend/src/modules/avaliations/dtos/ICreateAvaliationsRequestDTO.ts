export default interface ICreateAvaliationRequestDTO {
  evaluator_id: string;
  projects: {
    project_id: string;
    status?: 'to_evaluate' | 'rated';
  }[];
}
