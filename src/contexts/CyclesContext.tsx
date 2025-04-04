import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { Cycle, CyclesReducer } from "../reducers/cycles/reducer";
import { createNewCicleAction, markCurrentCycleAsFinishedAction, stopCountdownAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

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
    }, (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
        return initialState
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    const { activeCycleId, cycles } = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle) {
            return differenceInSeconds(new Date(), activeCycle?.startDate)
        }
        return 0
    })


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