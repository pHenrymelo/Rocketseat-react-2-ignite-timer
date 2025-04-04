import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from "date-fns/locale";

export function History() {

    const { cycles } = useContext(CyclesContext)

    return(
        <HistoryContainer>
            <HistoryList>
                <table>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cycles
                        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                        .map(cycle => {
                            return(
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td> {cycle.time} minutos</td>
                                <td> {formatDistanceToNow(cycle.startDate, {
                                    addSuffix: true,
                                    locale: ptBR
                                    })} 
                                </td>
                                <td>
                                    { cycle.finishedDate && <Status statusColor="green">Concluído</Status>}
                                    { cycle.interuptDate && <Status statusColor="red">Interrompido</Status>}
                                    { !cycle.finishedDate && !cycle.interuptDate && <Status statusColor="yellow">Em andamento</Status>}
                                </td>
                            </tr>
                        )})
                    }
                    
                </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    ) 
}