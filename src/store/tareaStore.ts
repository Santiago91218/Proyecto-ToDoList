import { create } from "zustand";
import { ITarea } from "../types/ITarea";

interface ITareaStore {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  setTareaActiva: (tareaActiva: ITarea | null) => void;
  setArrayTareas: (arrayDeTareas: ITarea[]) => void;
  agregarNuevaTarea: (nuevaTarea: ITarea) => void;
  editarUnaTarea: (tareaEditada: ITarea) => void;
  eliminarTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
  tareas: [],
  tareaActiva: null,

  setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),

  setTareaActiva: (tareaActivaIn) =>
    set(() => ({ tareaActiva: tareaActivaIn })),

  agregarNuevaTarea: (nuevaTarea) =>
    set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),

  editarUnaTarea: (tareaEditada) =>
    set((state) => {
      const arrayTareas = state.tareas.map((tarea) =>
        tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
      );
      return { tareas: arrayTareas };
    }),

  eliminarTarea: (idTarea) =>
    set((state) => {
      const arrayTareas = state.tareas.filter((tarea) => tarea.id !== idTarea);
      return { tareas: arrayTareas };
    }),
}));
