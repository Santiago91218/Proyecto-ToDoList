import { FC, FormEvent } from "react";

interface IProps {
  closeModal: () => void;
}

export const CrearTarea: FC<IProps> = ({ closeModal }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-[100%] h-[95vh] backdrop-blur-sm backdrop-brightness-90">
      <div className="bg-[#fff] shadow-[5px_5px_10px_5px_gray] w-[30%] !p-[12px] flex flex-col gap-8 items-center justify-center p-1 rounded">
        <div className="w-[100%] flex justify-center items-center !mb-[20px]">
          <h3 className="text-[40px]">Crear Tarea</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-7 w-[100%] relative"
        >
          <input
            type="text"
            placeholder="Titulo de la tarea"
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />

          <textarea
            placeholder="Descripción"
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 resize-none border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          ></textarea>

          <label
            htmlFor="fechaCierre"
            className="text-[#696666] absolute top-[132px] left-[80px] text-sm"
          >
            Fecha Límite
          </label>
          <input
            type="date"
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
