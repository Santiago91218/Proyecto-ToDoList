import { FC, useEffect, useState } from "react";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";
import { ITarea } from "../../../types/ITarea";
import { tareaStore } from "../../../store/tareaStore";
import { useTareas } from "../../../hooks/useTareas";
import { useSprints } from "../../../hooks/useSprints";
import ModalVerTarea from "../PopUps/ModalTarea/ModalVerTarea";
import { putTareaSprint } from "../../../http/sprints";
import Swal from "sweetalert2";
import { eliminarTareaBacklog } from "../../../http/tarea";
import { sprintStore } from "../../../store/sprintStore";

type ICardTareaBacklog = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardTareaBacklog: FC<ICardTareaBacklog> = ({
  tarea,
  handleOpenModalEdit,
}) => {
  const [modalVer, setModalVer] = useState<boolean>(false);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [sprintSeleccionado, setSprintSeleccionado] = useState<string | "">("");
  const { sprintActiva, setSprintActiva } = sprintStore();
  const { sprints } = useSprints();
  const [vencer, setVencer] = useState<boolean>(false);
  const { eliminarTareaById } = useTareas();

  useEffect(() => {
    filtrarTareasVencer();
  }, [tarea.fechaLimite]);

  const handleCloseModalVer = () => {
    setModalVer(false);
  };

  const editarTarea = () => {
    setTareaActiva(tarea);
    handleOpenModalEdit(tarea);
  };

  const handleEliminarTarea = () => {
    eliminarTareaById(tarea.id!);
  };

  const filtrarTareasVencer = () => {
    const fechaLimiteTarea = new Date(tarea.fechaLimite);
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 3);

    if (fechaLimiteTarea >= fechaActual && fechaLimiteTarea <= fechaLimite) {
      return setVencer(true);
    }

    setVencer(false);
  };

  const enviarTareaASprint = async () => {
    if (!sprintSeleccionado) return;

    const sprintDestino = sprints.find((s) => s.id === sprintSeleccionado);
    if (!sprintDestino) return;

    const nuevaTarea: ITarea = {
      ...tarea,
      estado: "Pendiente" as const,
    };

    const nuevasTareas = [...sprintDestino.tareas, nuevaTarea];
    const sprintActualizada = { ...sprintDestino, tareas: nuevasTareas };

    try {
      await putTareaSprint(sprintActualizada);

      if (sprintActiva?.id === sprintSeleccionado) {
        setSprintActiva(sprintActualizada);
      }

      if (tarea.id) {
        await eliminarTareaBacklog(tarea.id);
        eliminarTareaById(tarea.id);
      } else {
        console.error(
          "La tarea no tiene un ID válido, no se puede eliminar del backlog."
        );
      }

      Swal.fire({
        title: "Tarea enviada correctamente al sprint",
        icon: "success",
      });
      setSprintSeleccionado("");
    } catch (error) {
      console.error("Error al asignar tarea:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo asignar la tarea al sprint",
        icon: "error",
      });
    }
  };

  return (
    <div
      className={`${
        vencer ? "bg-red-300" : "bg-[#D9D9D9]"
      } flex !p-[0.6vw] w-[90%] justify-between rounded-[0.5rem] shadow-xs`}
    >
      <div className="flex flex-col gap-[2vh]">
        <p>
          <b>Titulo: {tarea.titulo}</b>
        </p>
        <p>
          <b>Descripción: {tarea.descripcion}</b>
        </p>
      </div>

      {modalVer && (
        <ModalVerTarea tarea={tarea} closeModal={handleCloseModalVer} />
      )}

      <div className="flex items-center gap-[1vw] ">
        <button
          onClick={enviarTareaASprint}
          className="bg-[#001233]/90 text-[#CAC0B3] cursor-pointer rounded-md hover:bg-[#001233] flex items-center gap-[0.4vw] !p-[0.3vw]"
        >
          Enviar a <span className="material-symbols-outlined ">send</span>
        </button>

        <select
          value={sprintSeleccionado}
          onChange={(e) => setSprintSeleccionado(e.target.value)}
          className="!p-[0.5vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none"
        >
          <option value="" disabled>
            Selecciona una sprint
          </option>
          {sprints.map((sprint) => (
            <option value={sprint.id} key={sprint.id}>
              {sprint.titulo}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-[0.36vw]">
          <button
            onClick={() => {
              setModalVer(true);
            }}
          >
            <IconVer size="1.72vw" />
          </button>
          <button onClick={editarTarea}>
            <IconEditar size="1.72vw" />
          </button>
          <button onClick={handleEliminarTarea}>
            <IconEliminar size="1.72vw" />
          </button>
        </div>
      </div>
    </div>
  );
};
