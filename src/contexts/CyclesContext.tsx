import { createContext, useState, type ReactNode } from "react";

interface Cycle {
    id: string,
    task: string,
    time: number,
    startDate: Date,
    interuptDate?: Date,
    finishedDate?: Date
}

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
    cleanActiveCycle: () => void
    createNewCicle: (data: CreateCycleData) => void
    stopCountdown: () => void


}

interface CycesContextProviderProps{
    children: ReactNode
}

export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }:CycesContextProviderProps) {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(senconds: number){
        setAmountSecondsPassed(senconds)
    }

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

    function createNewCicle(data: CreateCycleData){
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

        // reset()
    }

    function stopCountdown() {
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

    return(
        <CyclesContext.Provider 
            value={{cycles,
                    activeCycle, 
                    activeCycleId, 
                    markCurrentCycleAsFinished, 
                    cleanActiveCycle, 
                    amountSecondsPassed, 
                    setSecondsPassed,
                    createNewCicle,
                    stopCountdown
            }}>
            {children}
        </CyclesContext.Provider>
    )
}