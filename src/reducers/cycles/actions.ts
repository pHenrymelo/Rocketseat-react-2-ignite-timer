import type { Cycle } from "./reducer";

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  STOP_CURENT_CYCLE = 'STOP_CURENT_CYCLE',
  FINISH_CURENT_CYCLE = 'FINISH_CURENT_CYCLE'
}

export function createNewCicleAction(newCycle: Cycle){
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
        newCycle,
    }
  }

}

export function stopCountdownAction(){
  return {
    type: ActionTypes.STOP_CURENT_CYCLE
  } 
}

export function markCurrentCycleAsFinishedAction(){
  return {
    type: ActionTypes.FINISH_CURENT_CYCLE
  } 
}