import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../../store/tareaStore";
import { ITarea } from "../../../../types/ITarea";
import { useTareas } from "../../../../hooks/useTareas";
import { sprintStore } from "../../../../store/sprintStore";
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprint";

interface IProps {
  closeModal: () => void;
}

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  estado: "Pendiente",
  fechaLimite: "",
};

export const CrearTarea: FC<IProps> = ({ closeModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const sprintActiva = sprintStore((state) => state.sprintActiva);

  const { crearTarea, putEditarTarea } = useTareas();

  const { putTareaSprint,setSprintActiva } = useSprints();

  const [formValues, setFormValues] = useState<ITarea>(initialState);

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tareaActiva) {
      putEditarTarea(formValues);
    } else if (sprintActiva) {
      const nuevaTarea = { ...formValues, id: new Date().toISOString() };
      const sprintActualizado: ISprint = {
        ...sprintActiva,
        tareas: [...sprintActiva.tareas, nuevaTarea],
      };

      setSprintActiva(sprintActualizado);
      putTareaSprint(sprintActualizado);
    } else {
      crearTarea({ ...formValues, id: new Date().toISOString() });
    }
    setTareaActiva(null);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999] backdrop-blur-sm backdrop-brightness-90">
      <div className="bg-[#fff] shadow-[5px_5px_10px_5px_gray] w-[30%] !p-[12px] flex flex-col gap-8 items-center justify-center p-1 rounded">
        <div className="w-[100%] flex justify-center items-center !mb-[20px]">
          <h3 className="text-[40px]">
            {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
          </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-7 w-[100%] relative"
        >
          <input
            required
            type="text"
            name="titulo"
            placeholder="Titulo de la tarea"
            onChange={handleChange}
            value={formValues.titulo}
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />

          <textarea
            required
            placeholder="Descripción"
            onChange={handleChange}
            value={formValues.descripcion}
            name="descripcion"
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 resize-none border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          ></textarea>

          <label
            htmlFor="fechaCierre"
            className="text-[#696666] absolute top-[132px] left-[80px] text-sm"
          >
            Fecha Límite
          </label>
          <input
            required
            type="date"
            name="fechaLimite"
            onChange={handleChange}
            value={formValues.fechaLimite}
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />

          <div className="flex gap-[4vw] !mt-[30px]">
            <button
              onClick={closeModal}
              className="!p-[0.3rem] w-[6vw] text-[#CAC0B3] bg-[#001233]/95 hover:bg-[#042052] text-[1vw]  rounded-[0.4rem] cursor-pointer mt-[30px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="!p-[0.3rem] w-[6vw] text-[#CAC0B3] bg-[#001233]/95 hover:bg-[#042052] text-[1vw]  rounded-[0.4rem]  cursor-pointer mt-[30px]"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
