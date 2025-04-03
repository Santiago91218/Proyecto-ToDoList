import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import {
  editarSprint,
  eliminarSprintPorID,
  getAllSprints,
  postNuevaSprint,
} from "../http/sprints";
import { ISprint } from "../types/ISprint";

export const useSprints = () => {
  const {
    sprints,
    setSprints,
    sprintActiva,
    setSprintActiva,
    agregarNuevaSprint,
    eliminarSprint,
    editarUnaSprint,
  } = sprintStore(
    useShallow((state) => ({
      sprints: state.sprints,
      setSprints: state.setSprints,
      sprintActiva: state.sprintActiva,
      setSprintActiva: state.setSprintActiva,
      agregarNuevaSprint: state.agregarNuevaSprint,
      eliminarSprint: state.eliminarSprint,
      editarUnaSprint: state.editarUnaSprint,
    }))
  );

  const getSprints = async () => {
    const result = await getAllSprints();
    if (result) setSprints(result);
  };

  const crearSprint = async (nuevaSprint: ISprint) => {
    agregarNuevaSprint(nuevaSprint);
    try {
      await postNuevaSprint(nuevaSprint);
    } catch (error) {
      eliminarSprint(nuevaSprint.id!);
      console.log("Hubo un error al momento de crear la sprint");
    }
  };

  const putEditarSprint = async (sprintEditada: ISprint) => {
    const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id);
    editarUnaSprint(sprintEditada);
    try {
      await editarSprint(sprintEditada);
    } catch (error) {
      if (estadoPrevio) editarUnaSprint(estadoPrevio);
      console.log("Hubo un error al editar la sprint");
    }
  };

  const eliminarSprintById = async (idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint);
    eliminarSprint(idSprint);

    try {
      await eliminarSprintPorID(idSprint);
    } catch (error) {
      if (estadoPrevio) agregarNuevaSprint(estadoPrevio);
      console.log("Hubo un error al eliminar la sprint");
    }
  };

  return {
    getSprints,
    crearSprint,
    putEditarSprint,
    eliminarSprintById,
    sprints,
    sprintActiva,
    setSprintActiva,
  };
};
