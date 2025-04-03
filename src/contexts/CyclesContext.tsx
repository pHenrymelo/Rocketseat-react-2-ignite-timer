import { createContext, useReducer, useState, type ReactNode } from "react";
import { Cycle, CyclesReducer } from "../reducers/cycles/reducer";
import { createNewCicleAction, markCurrentCycleAsFinishedAction, stopCountdownAction } from "../reducers/cycles/actions";

interface CreateCycleData {
    task: string
    time: number
}

interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    setSecondsPassed: (seconds:number) => void
    markCurrentCycleAsFinished: () => void
    createNewCicle: (data: CreateCycleData) => void
    stopCountdown: () => void
}

interface CycesContextProviderProps{
    children: ReactNode
}

export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }:CycesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(CyclesReducer, {
        cycles: [],
        activeCycleId: null
    })

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { activeCycleId, cycles } = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(senconds: number){
        setAmountSecondsPassed(senconds)
    }

    function markCurrentCycleAsFinished(){
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function createNewCicle(data: CreateCycleData){
        const id = String(new Date().getTime())
        
        const newCycle: Cycle = {
            id,
            task: data.task,
            time: data.time,
            startDate: new Date()
        }

        dispatch(createNewCicleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function stopCountdown() {
        dispatch(stopCountdownAction())
    }

    return(
        <CyclesContext.Provider 
            value={{cycles,
                    activeCycle, 
                    activeCycleId, 
                    markCurrentCycleAsFinished, 
                    amountSecondsPassed, 
                    setSecondsPassed,
                    createNewCicle,
                    stopCountdown
            }}>
            {children}
        </CyclesContext.Provider>
    )
}