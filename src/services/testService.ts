import { TypeNewTestData } from "../types/testTypes";
import * as testRepository from "../repositories/testRepository"

export async function createTest(data: any) {
  const {name, pdfUrl, categoryId, disciplineId, teacherId} = data;
  const teachersDisciplinesId = await testRepository.checkTableTeacherDisciplines(
    disciplineId, teacherId);
  
  const objData: TypeNewTestData ={
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId: teachersDisciplinesId
  };
  await testRepository.createTest(objData);
};

