import { ActionTypes } from "./actions"

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
          return {
              ...state,
              cycles: [...state.cycles, action.payload.newCycle],
              activeCycleId: action.payload.newCycle.id
          }
      case ActionTypes.STOP_CURENT_CYCLE:
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
      case ActionTypes.FINISH_CURENT_CYCLE:
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
}