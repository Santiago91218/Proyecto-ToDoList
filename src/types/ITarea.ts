export interface ITarea {
  id?: string;
  titulo: string;
  descripcion: string;
  estado: "Pendiente" | "Progreso" | "Completado";
  fechaLimite: string;
  sprintId?: string;
}
