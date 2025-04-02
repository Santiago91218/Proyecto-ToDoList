import axios from "axios";
import { ISprint } from "../types/ISprint";

const API_URL = "http://localhost:3000/sprintsList";

//comunicacion con el json-server
export const getAllSprints = async () => {
  try {
    const response = await axios.get<ISprint[]>(API_URL);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const postNewSprint = async (newSprint:ISprint) => {
  try {
    const response = await axios.post<ISprint>(API_URL,{
      newSprint
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

