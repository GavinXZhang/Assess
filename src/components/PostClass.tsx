import axios from 'axios';
import React, { useEffect } from 'react';
import { MY_BU_ID, BASE_API_URL, GET_DEFAULT_HEADERS } from "../globals" 
interface Props {
    updateClassList: (data: any) => void; 
  }
const OnlySemester :string = "fall2022" 
const getClassesBySemester = async (semester: string) => {
    try{
        const response = await axios.get(`${BASE_API_URL}/class/listBySemester/${OnlySemester}?BUID=${MY_BU_ID}`,{
            headers: GET_DEFAULT_HEADERS(),
        });
        console.log("Recieved Semester", response.data)
        return response.data;
    }
    catch(error){
        console.error("error fetching semester class", error);
    }
}
const PostComponent: React.FC<Props>= ({updateClassList}) => {

useEffect(() => {
    const fetchData = async () => {
        const classes = await getClassesBySemester(OnlySemester);
        updateClassList(classes);
    };

    fetchData();
}, [updateClassList]);
return null;
}

export default PostComponent;
