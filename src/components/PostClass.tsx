import axios from 'axios';
import React, { useEffect } from 'react';
import { MY_BU_ID, BASE_API_URL, GET_DEFAULT_HEADERS } from "../globals" 
interface Props {
    updateClassList: (data: any) => void; 
  }
const PostComponent: React.FC<Props>= ({updateClassList}) => {
useEffect(()=> {
    const postData = async () => {
        try{
            const requestBody = {
                classId: "C123456",
                description: "Introduction to software methodology",
                meetingLocation: "BS23",
                meetingTime: "TR 1700-1830",
                semester: "fall2022",
                status: "active",
                title: "DS 9991"
            }

            const response = await axios.post(`${BASE_API_URL}/student/${MY_BU_ID}`, requestBody, {
                headers: GET_DEFAULT_HEADERS(),
                });
        
            updateClassList(response.data);
        }   catch (error) {
            console.error("Error fetching data: ", {error});
            }
    }

    postData();
},[updateClassList]);

return null;
}
export default PostComponent;