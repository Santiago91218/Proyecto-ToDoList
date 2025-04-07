import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import {
  editarSprint,
  eliminarSprintPorID,
  getAllSprints,
  postNuevaSprint,
} from "../http/sprints";
import { ISprint } from "../types/ISprint";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Sprint creada con exito",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      eliminarSprint(nuevaSprint.id!);
      console.log("Hubo un error al momento de crear la sprint");
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la sprint.",
        icon: "error",
      });
    }
  };

  const putEditarSprint = async (sprintEditada: ISprint) => {
    const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id);
    editarUnaSprint(sprintEditada);
    try {
      await editarSprint(sprintEditada);
      Swal.fire({
        title: "Sprint editada con exito",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      if (estadoPrevio) editarUnaSprint(estadoPrevio);
      console.log("Hubo un error al editar la sprint", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo editar la sprint.",
        icon: "error",
      });
    }
  };

  const eliminarSprintById = async (idSprint: string) => {
    const estadoPrevio = sprints.find((el) => el.id === idSprint);

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No puedes revertir estos cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (!result.isConfirmed) return;

    eliminarSprint(idSprint);

    try {
      await eliminarSprintPorID(idSprint);
      Swal.fire({
        title: "Eliminado!",
        text: "La sprint se ha eliminado.",
        icon: "success",
      });
    } catch (error) {
      if (estadoPrevio) agregarNuevaSprint(estadoPrevio);
      console.log("Hubo un error al eliminar la sprint");
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la sprint.",
        icon: "error",
      });
    }
  };
  return {
    getSprints,
    crearSprint,
    putEditarSprint,
    eliminarSprintById,
    sprints,
    setSprints,
    sprintActiva,
    setSprintActiva,
  };
};
