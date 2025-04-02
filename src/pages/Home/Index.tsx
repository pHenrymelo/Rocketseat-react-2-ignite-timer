import { useState, createContext } from "react";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { Countdown } from "./components/Countdown";
import { NewCyleForm } from "./components/NewCicleForm";

import { 
    HomeContainer,
    StartCountdownButton, 
    StopCountdownButton,    
} from "./styles";

const createNewCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'A task deve ser inserida corretamente'),
    time: zod.number().min(5, 'o tempo deve ser superior a 5 minutos').max(60, 'o tempo deve ser inferior a 60 minutos')
})

type NewCicleFormData  = zod.infer<typeof createNewCicleFormValidationSchema>

interface Cycle {
    id: string,
    task: string,
    time: number,
    startDate: Date,
    interuptDate?: Date,
    finishedDate?: Date
}

interface CycleContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    setSecondsPassed: (seconds:number) => void
    markCurrentCycleAsFinished: () => void
    cleanActiveCycle: () => void

}

export const CyclesContext = createContext({} as CycleContextType)

export function Home() {
    
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const newCycleForm = useForm<NewCicleFormData>({
        resolver: zodResolver(createNewCicleFormValidationSchema),
        defaultValues: {
            task: '',
            time: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    console.log(activeCycle)

    function markCurrentCycleAsFinished(){
        setCycles(state =>
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return {...cycle, finishedDate: new Date()}
                } else {
                    return cycle
                }
            })
        )  
    }

    function cleanActiveCycle(){
        setActiveCycleId(null)
    }

    function setSecondsPassed(senconds: number){
        setAmountSecondsPassed(senconds)
    }
    
    function handleCreateNewCicle(data: NewCicleFormData){
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

    function handleStopCountdown() {
        setCycles(state =>
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return {...cycle, interuptDate: new Date()}
                } else {
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
    }

    const task = watch('task')
    const time = watch('time')
    const isSubmitDisabled = !task || !time

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)}>
                <CyclesContext.Provider 
                    value={{ activeCycle, 
                            activeCycleId, 
                            markCurrentCycleAsFinished, 
                            cleanActiveCycle, 
                            amountSecondsPassed, 
                            setSecondsPassed 
                    }}>
                    <FormProvider {...newCycleForm}>
                        <NewCyleForm /> 
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

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