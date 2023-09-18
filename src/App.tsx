import React, { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
import GetSemester from "./components/PostClass";
import GradeTable from "./components/GradeTable";
/**
 * You will find globals from this file useful!
 */
import {} from "./globals";
import { IUniversityClass, IGrade } from "./types/api_types";
import PostComponent from "./components/PostClass";

function App() {
  // You will need to use more of these!
  //studentsData used to print PostClass. currclassId, shows the current class selected.
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [studentsData, setStudentsData] = useState<IGrade[]>([]);

  useEffect(() => {
    console.log(studentsData);
}, [studentsData]);
  const updateClassList = useCallback((newClasses: IUniversityClass[]) => {
    setClassList(newClasses);
},[]);

  const updateStudentsData = useCallback((data:IGrade[]) => {
    setStudentsData(data);
  },[]);
  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <Select fullWidth={true} label="Class" value = {currClassId} onChange={(event) => setCurrClassId(event.target.value)}>
              {/* You'll need to place some code here to generate the list of items in the selection */}
              <PostComponent classList={classList} updateClassList={updateClassList} updateStudentsData={updateStudentsData} />
              {classList.map(clas => (
                <MenuItem key = {clas.classId} value={clas.title}>{clas.title} </MenuItem>)) } 
            </Select>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <GradeTable currClassID ={currClassId} studentsData = {studentsData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
