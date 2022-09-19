import { TypeNewTestData } from "../types/testTypes";
import * as testRepository from "../repositories/testRepository"

export async function createTest(data: any) {
  const { name, pdfUrl, categoryId, disciplineId } = data;

  const objData: TypeNewTestData = {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId: disciplineId + 1
  };
  await testRepository.createTest(objData);
};

export async function getTestByDiscipline() {
  const result = await testRepository.getTestsByDiscipline();
  return result;
};

export async function getTestByTeacher() {
  const result = await testRepository.getTestsByTeacher();
  return result;
};