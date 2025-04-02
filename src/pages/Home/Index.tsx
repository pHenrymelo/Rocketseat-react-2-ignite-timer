import { useContext } from "react";
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
import { CyclesContext } from "../../contexts/CyclesContext";

const createNewCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'A task deve ser inserida corretamente'),
    time: zod.number().min(5, 'o tempo deve ser superior a 5 minutos').max(60, 'o tempo deve ser inferior a 60 minutos')
})

type NewCicleFormData  = zod.infer<typeof createNewCicleFormValidationSchema>



export function Home() {

    const { activeCycle, createNewCicle, stopCountdown } = useContext(CyclesContext) 
    
    const newCycleForm = useForm<NewCicleFormData>({
        resolver: zodResolver(createNewCicleFormValidationSchema),
        defaultValues: {
            task: '',
            time: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    const task = watch('task')
    const time = watch('time')
    const isSubmitDisabled = !task || !time

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCicle)}>
                    <FormProvider {...newCycleForm}>
                        <NewCyleForm /> 
                    </FormProvider>
                    <Countdown />
                    { activeCycle ? (
                        <StopCountdownButton type="button" onClick={stopCountdown}>
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