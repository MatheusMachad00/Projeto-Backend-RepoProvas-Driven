import { Test } from "@prisma/client";
import { TeacherDiscipline } from "@prisma/client";

export type TypeNewTestData = Omit<Test, 'id'>;
export type TypeGetTeacherDisciplineId = Omit<TeacherDiscipline, 'disciplineId' | 'teacherId'>