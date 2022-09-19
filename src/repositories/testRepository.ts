import { prisma } from "../config/database";
import { TypeNewTestData } from "../types/testTypes";
import connection from "../config/postgres";

export async function createTest(testData: TypeNewTestData) {
  await prisma.test.create({ data: testData });
};

/* export async function checkTableTeacherDisciplines(disciplineId: number) {
  const result = await prisma.teacherDiscipline.findFirst({ where: { disciplineId } })
  const result2 = await prisma.$queryRaw`SELECT * FROM "teacherDisciplines" WHERE "disciplineId" = 1`
  
  const result = await connection.query(
    `SELECT * FROM "teacherDisciplines" WHERE "disciplineId" = $1`,
    [disciplineId])

    console.log(disciplineId)
  console.log(`eu sou a resposta do repository ${result}`)
  console.log(result.id)

  return result;
};
 */

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