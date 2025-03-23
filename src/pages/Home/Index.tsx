import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { CountdownContainer,
        FormContainer,
        HomeContainer,
        Separator, 
        StartCountdownButton, 
        TaskInput, 
        TimeInput } 
from "./styles";


const createNewCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'A task deve ser inserida corretamente'),
    time: zod.number().min(5, 'o tempo deve ser superior a  minutos').max(60, 'o tempo deve ser inferior a 60 minutos')
})

type NewCicleFormData  = zod.infer<typeof createNewCicleFormValidationSchema>

export function Home() {

    const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
        resolver: zodResolver(createNewCicleFormValidationSchema),
        defaultValues: {
            task: '',
            time: 0
        }
    })

    const handleCreateNewCicle = (data: NewCicleFormData) => {
        console.log(data)
        reset()
    }

    const task = watch('task')
    const time = watch('time')
    const isSubmitDisabled = !task || !time

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em: </label>
                    <TaskInput 
                    type="text" 
                    id="task" 
                    list="task-suggestions"
                    placeholder="Dê um nome para o seu projeto"
                    {...register('task')}
                    />
                    <datalist id="task-suggestions">
                        <option value="asdas" />
                        <option value="ggdfg" />
                        <option value="sffas" />
                        <option value="fdfd" />
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <TimeInput 
                    type="number" 
                    id="time" 
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                    {...register('time', { valueAsNumber: true })}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}