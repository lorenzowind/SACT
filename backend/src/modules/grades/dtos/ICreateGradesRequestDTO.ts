export default interface ICreateGradeRequestDTO {
  avaliation_id: string;
  grades: {
    question_id: string;
    grade: number;
  }[];
}
