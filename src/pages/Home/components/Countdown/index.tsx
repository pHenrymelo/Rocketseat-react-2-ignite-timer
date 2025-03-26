import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { CyclesContext } from "../../Index";

export function Countdown() {

    const {activeCycle, activeCycleId, markCurrentCycleAsFinished, cleanActiveCycle, amountSecondsPassed, setSecondsPassed} = useContext(CyclesContext)

    const totalTimeInSeconds = activeCycle ? activeCycle.time * 60 : 0
    const currentSeconds = activeCycle ? totalTimeInSeconds - amountSecondsPassed : 0

    const timeInMinutes = Math.floor(currentSeconds / 60)
    const timeInSeconds = currentSeconds % 60

    const minutes = String(timeInMinutes).padStart(2, '0')
    const seconds = String(timeInSeconds).padStart(2, '0')

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if(secondsDifference >= totalTimeInSeconds){
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalTimeInSeconds)
                    clearInterval(interval)
                    cleanActiveCycle()         
                } else {
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }

    }, [activeCycle, totalTimeInSeconds, activeCycleId, setSecondsPassed, cleanActiveCycle, markCurrentCycleAsFinished])

    useEffect(()=> {
        if(activeCycle) {
            document.title = `${minutes}:${seconds} `
        }
    }, [minutes, seconds, activeCycle])

    return(
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}