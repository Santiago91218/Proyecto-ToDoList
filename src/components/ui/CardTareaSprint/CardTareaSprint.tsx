import { IconVer } from "../Icons/IconVer";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { ITarea } from "../../../types/ITarea";
import { FC, useState } from "react";
import { useSprints } from "../../../hooks/useSprints";
import { useTareas } from "../../../hooks/useTareas";
import ModalVerTarea from "../PopUps/ModalTarea/ModalVerTarea";
import { tareaStore } from "../../../store/tareaStore";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import Swal from "sweetalert2";
import { sprintStore } from "../../../store/sprintStore";

interface IProps {
  tareas: ITarea[];
}

const CardTareaSprint: FC<IProps> = ({ tareas }) => {
  const { sprintActiva, setSprintActiva, putTareaSprint } = useSprints();
  const { crearTarea } = useTareas();
  const [modalVer, setModalVer] = useState<boolean>(false);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const editarUnaSprint = sprintStore((state) => state.editarUnaSprint);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const coloresCard = {
    Pendiente: "bg-[#E74C3C]/85",
    Progreso: "bg-[#F1C40F]/85",
    Completado: "bg-[#2ECC71]/85",
  };

  const handleCloseModalVer = () => {
    setModalVer(false);
  };

  const handleCloseModalEdit = () => {
    setModalEdit(false);
    setTareaActiva(null);
  };
  const { eliminarTareaById } = useTareas();

  const actualizarEstadoTarea = (
    idTask: string,
    newState: ITarea["estado"]
  ) => {
    if (!sprintActiva) return;

    const tareasActualizadas = sprintActiva.tareas.map((tarea) =>
      tarea.id === idTask ? { ...tarea, estado: newState } : tarea
    );

    const nuevaSprintActualizada = {
      ...sprintActiva,
      tareas: tareasActualizadas,
    };

    setSprintActiva(nuevaSprintActualizada);
    putTareaSprint(nuevaSprintActualizada);
  };

  const eliminarTareaSprint = async (idTask: string) => {
    try {
      await eliminarTareaById(idTask);

      if (!sprintActiva) return;

      const tareasFiltradas = sprintActiva.tareas.filter(
        (t) => t.id !== idTask
      );

      const nuevaSprint = {
        ...sprintActiva,
        tareas: tareasFiltradas,
      };

      putTareaSprint(nuevaSprint);
      setSprintActiva(nuevaSprint);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const enviarTareaBacklog = async (idTask: string | undefined) => {
    if (!idTask || !sprintActiva) return;

    try {
      const tarea = sprintActiva.tareas.find((t) => t.id === idTask);
      if (!tarea) {
        console.warn("Tarea no encontrada en el sprint.");
        return;
      }

      const tareaParaBacklog: ITarea = {
        ...tarea,
        estado: "Pendiente",
      };

      await crearTarea(tareaParaBacklog);

      const tareasRestantes = sprintActiva.tareas.filter(
        (t) => t.id !== idTask
      );
      const nuevaSprint = {
        ...sprintActiva,
        tareas: tareasRestantes,
      };

      await putTareaSprint(nuevaSprint);
      setSprintActiva(nuevaSprint);
      editarUnaSprint(nuevaSprint);

      Swal.fire({
        title: "Tarea enviada correctamente al backlog",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al enviar tarea al backlog:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar la tarea al backlog",
        icon: "error",
      });
    }
  };
  return (
    <>
      {tareas.map((tarea) => (
        <div
          key={tarea.id}
          className={`w-[90%] flex flex-col gap-[0.2vh] rounded-[4px] !mb-[10px] !px-[0.6vw] !pt-[0.6vw]  ${
            coloresCard[tarea.estado]
          }`}
        >
          <h1 className="text-[1.5vw]">Titulo: {tarea.titulo}</h1>
          <p>
            <b>Descripcion:</b> {tarea.descripcion}
          </p>
          <p>
            <b>Fecha Límite:</b> {tarea.fechaLimite}
          </p>

          <div className="flex justify-center gap-[3%] !py-2 ">
            <button
              className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer"
              onClick={() => {
                enviarTareaBacklog(tarea.id);
              }}
            >
              Enviar al backlog
            </button>
            <select
              value={tarea.estado}
              onChange={(e) =>
                actualizarEstadoTarea(
                  tarea.id!,
                  e.target.value as ITarea["estado"]
                )
              }
              className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 !px-1 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Progreso">En progreso</option>
              <option value="Completado">Completado</option>
            </select>

            {modalVer && (
              <ModalVerTarea tarea={tarea} closeModal={handleCloseModalVer} />
            )}

            {modalEdit && <CrearTarea closeModal={handleCloseModalEdit} />}

            <div className="flex gap-[5%] items-center ">
              <div
                onClick={() => {
                  setModalVer(true);
                }}
              >
                <IconVer size={"1.6vw"} />
              </div>
              <div
                onClick={() => {
                  setModalEdit(true);
                  setTareaActiva(tarea);
                }}
              >
                <IconEditar size={"1.5vw"} />
              </div>
              <div
                onClick={() => {
                  eliminarTareaSprint(tarea.id!);
                }}
              >
                <IconEliminar size={"1.5vw"} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardTareaSprint;
