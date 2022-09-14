import { prisma } from "../config/database";
import { TypeNewTestData } from "../types/testTypes";


export async function createTest(testData: TypeNewTestData) {
  await prisma.test.create({ data: testData });
};

export async function checkTableTeacherDisciplines(disciplineId: number, teacherId: number) {
  const result: any = await prisma.teacherDiscipline.findFirst({
    where: { disciplineId, teacherId }
  });
  return result.id;
};


export async function getTestsByDiscipline() {
  const result = prisma.term.findMany({
    include: {
      disciplines: {
        select: {
          id: true,
          name: true,
          terms: {},
          teacherDisciplines: {
            select: {
              id: true,
              teacher: {},
              discipline: {},
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  categories: {}
                }
              }
            }
          }
        }
      }
    }
  });
  return result;
};

/* export async function getTestsByTeacher(params:type) {
  
} */