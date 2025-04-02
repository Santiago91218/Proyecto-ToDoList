import { CardTareaBacklog } from "../CardTareaBacklog/CardTareaBacklog"

export const ListTareasBacklog = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[3vh] w-[100%] !mt-[10px] !p-[1vw]">
        <CardTareaBacklog />
        <CardTareaBacklog />
        <CardTareaBacklog />
    </div>
  )
}
