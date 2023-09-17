import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MY_BU_ID, BASE_API_URL, GET_DEFAULT_HEADERS } from "../globals"
import { IUniversityClass, IGrade } from "../types/api_types";

interface Props {
    updateClassList: (data: IUniversityClass[]) => void;
    updateStudentsData: (data: IGrade[]) => void; 
    classList: IUniversityClass[];
  }

  interface IStudentGrade {
    classId: string;
    grades: Record<string, number>;
    name: string;
    studentId: string;
}

const OnlySemester :string = "fall2022"
const getlistGrades = async (studentId: string, classId: string): Promise<IStudentGrade> => {
    try{
        const response = await axios.get(`${BASE_API_URL}/student/listGrades/${studentId}/${classId}?BUID=${MY_BU_ID}`,{
            headers: GET_DEFAULT_HEADERS(),
        })
        console.log("Recived Grades", response.data)
        return response.data;
    }
    catch (error){
        console.error("error fetching gradelist", error)
        throw error;
    }
}

const getListAssignments = async (classId: string) => {
    try{
        const response = await axios.get(`${BASE_API_URL}/class/listAssignments/${classId}?BUID=${MY_BU_ID}`,{
            headers: GET_DEFAULT_HEADERS(),
        })
        console.log("Recived Assignments", response.data)
        return response.data[0]?.weight || null;
    }
    catch (error){
        console.error("error fetching gradelist", error)
        return null;
    }
}
const getClassesBySemester = async (Semester: string) => {
    try{
        const response = await axios.get(`${BASE_API_URL}/class/listBySemester/${OnlySemester}?BUID=${MY_BU_ID}`,{
            headers: GET_DEFAULT_HEADERS(),
        });
        console.log("Recieved Semester", response.data)
        return response.data;
    }
    catch(error){
        console.error("error fetching semester class", error);
        return null;
    }
}
const getStudentById = async (StudentId: string) : Promise<string | null> => {
    try{
        const response = await axios.get(`${BASE_API_URL}/student/GetById/${StudentId}?BUID=${MY_BU_ID}`,{
            headers: GET_DEFAULT_HEADERS(),
        })
        return response.data[0]?.name || null;
    }catch(error) {
        console.error("error fetching student ID", error)
        return null;
    }
}
const getListStudents = async (classId: string) => {
    try{
        const response = await axios.get(`${BASE_API_URL}/class/listStudents/${classId}?BUID=${MY_BU_ID}`,{
            headers: GET_DEFAULT_HEADERS(),
        });
        console.log("Recieved Id", response.data)
        return response.data;
    }
    catch(error){
        console.error("error fetching ListStudents", error);
        return null;
    }
}
export const PostComponent: React.FC<Props>= ({classList,updateClassList,updateStudentsData}) => {

useEffect(() => {
    const fetchData = async () => {
        const classes = await getClassesBySemester(OnlySemester);
        updateClassList(classes);
    };

    fetchData();
}, [updateClassList]);

useEffect(() => {
    const fetchAllStudentsForClasses = async (classList: IUniversityClass[]) => {
        const fetchedStudents: IGrade[] = await Promise.all(
            classList.map(async (classItem): Promise<IGrade[]> => {
                const studentIDs = await getListStudents(classItem.classId);
                const studentNames = await Promise.all(studentIDs.map((id: string) => getStudentById(id)));
                const assignmentWeight = await getListAssignments(classItem.classId); 
                
                const studentGrades = await Promise.all(studentIDs.map(async (id: string, index: number): Promise<IGrade> => {
                    const gradesObject: IStudentGrade = await getlistGrades(id, classItem.classId); 
                    const gradesValues = Object.values(gradesObject.grades);
                    const gradesOfFirstStudent = gradesValues[0]; // This gives you the object {A1: '97', A2: '92', ...}
                    const numericalGrades = Object.values(gradesOfFirstStudent).map(Number); // Convert strings to numbers
                    const totalGrade = numericalGrades.reduce((a, b) => a + b, 0) * assignmentWeight/100;
                    console.log('gradesValues', gradesValues);
                    console.log('assignmentWeight', assignmentWeight);
                    console.log('totalGrade before formatting', totalGrade);
                    return {
                        StudentID: id,
                        StudentName: studentNames[index] || '',
                        ClassID: classItem.classId,
                        ClassName: classItem.title,
                        Semester: OnlySemester,
                        FinalGrade: totalGrade.toFixed(2), 
                    };
                }));
                return studentGrades
            })
        ).then(data => data.flat());

        updateStudentsData(fetchedStudents);  
    };

    fetchAllStudentsForClasses(classList);
}, [classList, updateStudentsData]);
return null
}
export default PostComponent;

