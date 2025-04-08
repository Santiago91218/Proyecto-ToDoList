import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { sprintStore } from "../../../../store/sprintStore";
import { useSprints } from "../../../../hooks/useSprints";
import { ISprint } from "../../../../types/ISprint";


interface IProps {
  closeModal: () => void;
  modo: "crear" | "editar";
}
const initialState: ISprint = {
  titulo: "",
  fechaInicio: "",
  fechaCierre: "",
  tareas: [],
};
const EditCreateModalSprint: FC<IProps> = ({ closeModal, modo }) => {
  const sprintActiva = sprintStore((state) => state.sprintActiva);
const setSprintActiva = sprintStore((state) => state.setSprintActiva)
  const {crearSprint, putEditarSprint} = useSprints()
  
  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    if(sprintActiva){
      putEditarSprint(formValues)
    }else{
      crearSprint({... formValues,id: new Date().toISOString()})
      setSprintActiva(null)
      closeModal();
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };
  const [formValues, setFormValues] = useState<ISprint>(initialState);
  useEffect(() => {
    if (modo === "editar" && sprintActiva) {
      setFormValues(sprintActiva);
    } else {
      setFormValues(initialState);
    }
  }, [modo, sprintActiva]);
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999] backdrop-blur-sm backdrop-brightness-90">
        <div className="bg-[#fff] shadow-[5px_5px_10px_5px_gray] w-[30%] !p-[12px] flex flex-col gap-8 items-center justify-center p-1 rounded">
          <div className="w-[100%] flex justify-center items-center !mb-[20px]">
            <h1 className="text-[40px]">
              {modo === "editar" ? "Editar Sprint" : "Crear Sprint"}
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-7 w-[100%] relative"
          >
            <input
              name="titulo"
              type="text"
              required
              placeholder="Ingrese un titulo"
              value={formValues.titulo}
              onChange={handleChange}
              className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
            />
            <label
              htmlFor="fechaInicio"
              className="text-[#696666] absolute top-[45px] left-[75px] text-sm"
            >
              Fecha Inicio
            </label>
            <input
              name="fechaInicio"
              type="date"
              autoComplete="off"
              value={formValues.fechaInicio}
              required
              onChange={handleChange}
              className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
            />
            <label
              htmlFor="fechaCierre"
              className="text-[#696666] absolute top-[112px] left-[75px] text-sm"
            >
              Fecha Cierre
            </label>
            <input
              name="fechaCierre"
              type="date"
              autoComplete="off"
              required
              value={formValues.fechaCierre}
              onChange={handleChange}
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
                className="!p-[0.3rem] w-[7vw] text-[#CAC0B3] bg-[#001233]/95 hover:bg-[#042052] text-[1vw]  rounded-[0.4rem]  cursor-pointer mt-[30px]"
              >
                {modo === "editar" ? "Editar Sprint" : "Crear Sprint"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCreateModalSprint;
