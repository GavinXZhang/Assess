import { IGrade } from "../types/api_types"
import{Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
interface GradeTableProps {
  currClassID: string;
}
export function dummyData(): IGrade[] {
  return[
    {
      StudentID: 'S001',
      StudentName: 'John Doe',
      ClassID: 'C123',
      ClassName: 'DS 519',
      Semester: 'Fall 2023',
      FinalGrade: 'A'
    },
    {
      StudentID: 'S007',
      StudentName: 'John DooDoo',
      ClassID: 'C123',
      ClassName: 'DS 519',
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
export const GradeTable: React.FC<GradeTableProps>= ({currClassID}) => {
  const data = dummyData()
  const filteredData = data.filter(item=> item.ClassName === currClassID)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Student ID</TableCell>
          <TableCell>Student Name</TableCell>
          <TableCell>Class ID</TableCell>
          <TableCell>Class Name</TableCell>
          <TableCell>Semester</TableCell>
          <TableCell>Final Grade</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredData.map((item, index) =>( 
        <TableRow key = {index}>
        <TableCell>{item.StudentID}</TableCell>
        <TableCell>{item.StudentName}</TableCell>
        <TableCell>{item.ClassID}</TableCell>
        <TableCell>{item.ClassName}</TableCell>
        <TableCell>{item.Semester}</TableCell>
        <TableCell>{item.FinalGrade}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
  export default GradeTable

