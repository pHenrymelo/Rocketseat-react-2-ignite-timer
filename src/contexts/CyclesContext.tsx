import { createContext, useReducer, useState, type ReactNode } from "react";

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
    createNewCicle: (data: CreateCycleData) => void
    stopCountdown: () => void


}

interface CycesContextProviderProps{
    children: ReactNode
}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }:CycesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

        switch(action.type) {
            case 'CREATE_NEW_CYCLE':
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id
                }
            case 'STOP_CURENT_CYCLE':
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if(cycle.id === state.activeCycleId) {
                            return {...cycle, interuptDate: new Date()}
                        } else {
                            return cycle
                        }
                    }),
                    activeCycleId: null,
               }
            case 'FINISH_CURENT_CYCLE':
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if(cycle.id === state.activeCycleId) {
                            return {...cycle, finishedDate: new Date()}
                        } else {
                            return cycle
                        }
                    }),
                    activeCycleId: null,
                }

            default:
                return state;
        }
    }, {
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
        dispatch({
            type: 'FINISH_CURENT_CYCLE',
            payload: {
                activeCycleId,
            }
        })
    }

    function createNewCicle(data: CreateCycleData){
        const id = String(new Date().getTime())
        
        const newCycle: Cycle = {
            id,
            task: data.task,
            time: data.time,
            startDate: new Date()
        }

        dispatch({
            type: 'CREATE_NEW_CYCLE',
            payload: {
                newCycle,
            }
        })
        setAmountSecondsPassed(0)
    }

    function stopCountdown() {
        dispatch({
            type: 'STOP_CURENT_CYCLE',
            payload: {
                activeCycleId,
            }
        })
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