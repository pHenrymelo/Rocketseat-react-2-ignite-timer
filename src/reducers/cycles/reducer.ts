import { ActionTypes } from "./actions"
import { produce } from "immer"

export interface Cycle {
  id: string,
  task: string,
  time: number,
  startDate: Date,
  interuptDate?: Date,
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesReducer(state: CyclesState, action: any){

  switch(action.type) {
      case ActionTypes.CREATE_NEW_CYCLE:
        return produce(state, (draft) => {
            draft.cycles.push(action.payload.newCycle)  
            draft.activeCycleId = action.payload.newCycle.id
        })
      case ActionTypes.STOP_CURENT_CYCLE: {
          const currentCycleIndex = state.cycles.findIndex((cycle) => {
              return cycle.id === state.activeCycleId
          })
  
          if (currentCycleIndex < 0) {
              return state
          }
  
          return produce(state, (draft) => {
              draft.cycles[currentCycleIndex].finishedDate = new Date()
              draft.activeCycleId = null
          })
      }

      case ActionTypes.FINISH_CURENT_CYCLE: {
          const currentCycleIndex = state.cycles.findIndex((cycle) => {
              return cycle.id === state.activeCycleId
          })
  
          if (currentCycleIndex < 0) {
              return state
          }
  
          return produce(state, (draft) => {
              draft.cycles[currentCycleIndex].finishedDate = new Date()
              draft.activeCycleId = null
          })
      }

      default:
          return state;
  }
}