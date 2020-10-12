export default interface ICreateGradeRequestDTO {
  avaliation_id: string;
  comments: string;
  grades: {
    question_id: string;
    grade: number;
  }[];
}
