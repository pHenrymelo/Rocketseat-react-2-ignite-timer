import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
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
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="yellow">Em andamento</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="red">Interrompido</Status>
                        </td>
                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>25 minutos</td>
                        <td>Há 3 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>
                    </tr>
                </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    ) 
}