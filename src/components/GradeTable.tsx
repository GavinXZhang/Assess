import { IGrade } from "../types/api_types"
import{Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
interface GradeTableProps {
  currClassID: string;
  studentsData: IGrade[];
}
export function dummyData(): IGrade[] {
  return[
    {
      StudentID: 'S001',
      StudentName: 'John Doe',
      ClassID: 'C123',
      ClassName: 'ST 519',
      Semester: 'Fall 2023',
      FinalGrade: 'A'
    },
    {
      StudentID: 'S007',
      StudentName: 'John DooDoo',
      ClassID: 'C123',
      ClassName: 'ST 519',
      Semester: 'Fall 2023',
      FinalGrade: 'S+'
    },
    
  ];
}

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable: React.FC<GradeTableProps>= ({currClassID, studentsData}) => {
  const data = studentsData
  const enhancedData = data.map((item, index) => ({ ...item, id: index }));
  const filteredData = enhancedData.filter(item => item.ClassName === currClassID);
  console.log(filteredData)
  const columns = [
    {field: 'StudentID', headerName: 'Student ID', width: 150},
    {field: 'StudentName', headerName: 'Student Name', width: 150},
    {field: 'ClassID', headerName: 'Class ID', width: 150},
    {field: 'ClassName', headerName: 'Class Name', width: 150},
    {field: 'Semester', headerName: 'Semester', width: 150},
    {field: 'FinalGrade', headerName: 'Final Grade', width: 150}
  ];
  return(
  <DataGrid
  rows={filteredData}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 5 },
    },
  }}
  pageSizeOptions={[5, 10]}
/>
);
};
  export default GradeTable

