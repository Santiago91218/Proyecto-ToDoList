import axios from "axios";
import { ISprintsList } from "../types/ISprint";

const API_URL = "http://localhost:3000/sprintsList";

//comunicacion con el json-server
export const getAllSprints = async () => {
  try {
    const response = await axios.get<ISprintsList>(API_URL);
    return response.data.sprints;
  } catch (error) {
    console.log(error);
  }
};

