import { useContext } from "react";
import { FormContainer, TaskInput, TimeInput } from "./styles";
import { CyclesContext } from "../../Index";
import { useFormContext } from "react-hook-form";


export function NewCyleForm(){

    const {register} = useFormContext()

    const { activeCycle } = useContext(CyclesContext)

    return(
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em: </label>
            <TaskInput 
            type="text" 
            id="task" 
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
            />
            <datalist id="task-suggestions">
                <option value="projeto AOTD" />
                <option value="projeto SLS" />
                <option value="estudar react" />
                <option value="estudar node" />
            </datalist>
            <label htmlFor="minutesAmount">durante</label>
            <TimeInput 
            type="number" 
            id="time" 
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('time', { valueAsNumber: true })}
            />
            <span>minutos.</span>
        </FormContainer>
    )
}