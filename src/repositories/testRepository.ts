import { prisma } from "../config/database";
import { TypeNewTestData } from "../types/testTypes";
import connection from "../config/postgres";

export async function createTest(testData: TypeNewTestData) {
  await prisma.test.create({ data: testData });
};

export async function checkTableTeacherDisciplines(disciplineId: number) {
  const result = await prisma.teacherDiscipline.findFirst({ where: { disciplineId } })
  return result;
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

export async function getTestsByTeacher() {
  const result = prisma.teacherDiscipline.findMany({
    select: {
      id: true,
      discipline: {},
      teacher: {},
      tests: {
        select: {
          id: true,
          name: true,
          pdfUrl: true,
          categories: {}
        }
      }
    }
  });
  return result;
};