import { useEffect, useState } from "react";
import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";
import * as zod from 'zod'

import { CountdownContainer,
        FormContainer,
        HomeContainer,
        Separator, 
        StartCountdownButton, 
        StopCountdownButton, 
        TaskInput, 
        TimeInput } 
from "./styles";


const createNewCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'A task deve ser inserida corretamente'),
    time: zod.number().min(5, 'o tempo deve ser superior a  minutos').max(60, 'o tempo deve ser inferior a 60 minutos')
})

type NewCicleFormData  = zod.infer<typeof createNewCicleFormValidationSchema>

interface Cycle {
    id: string,
    task: string,
    time: number,
    startDate: Date
    interuptDate?: Date
}

export function Home() {
    
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    
    const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
        resolver: zodResolver(createNewCicleFormValidationSchema),
        defaultValues: {
            task: '',
            time: 0
        }
    })
    
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    console.log(activeCycle)

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000) 
        }
        return () => {
            clearInterval(interval)
        }

    }, [activeCycle])

    const handleCreateNewCicle = (data: NewCicleFormData) => {
        const id = String(new Date().getTime())
        
        const newCycle: Cycle = {
            id,
            task: data.task,
            time: data.time,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
    }

    const handleStopCountdown = () => {

        setCycles(
            cycles.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return {...cycle, interuptDate: new Date()}
                } else {
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
    }

    console.log(cycles)

    const task = watch('task')
    const time = watch('time')
    const isSubmitDisabled = !task || !time


    const totalTimeInSeconds = activeCycle ? activeCycle.time * 60 : 0
    const currentSeconds = activeCycle ? totalTimeInSeconds - amountSecondsPassed : 0

    const timeInMinutes = Math.floor(currentSeconds / 60)
    const timeInSeconds = currentSeconds % 60

    const minutes = String(timeInMinutes).padStart(2, '0')
    const seconds = String(timeInSeconds).padStart(2, '0')

    useEffect(()=> {
        if(activeCycle) {
            document.title = `${minutes}:${seconds} `
        }
    }, [minutes, seconds, activeCycle])

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
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>
                { activeCycle ? (
                    <StopCountdownButton type="button" onClick={handleStopCountdown}>
                        <HandPalm size={24}/> 
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                )
            }
            </form>
        </HomeContainer>
    )
}