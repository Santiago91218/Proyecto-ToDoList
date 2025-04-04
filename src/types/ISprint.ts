import { ITarea } from "./ITarea";

export interface ISprintsList {
  sprints: ISprint[];
}

export interface ISprint {
  id?: string;
  fechaInicio: string;
  fechaCierre: string;
  titulo: string;
  tareas: ITarea[];
}
