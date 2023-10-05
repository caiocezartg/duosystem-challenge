import { Flex, Select, Text } from "@chakra-ui/react";
import useTaskListStore from "../../store/TaskListStore";

function FiltersTaskList() {
  const filterTaskListByType = useTaskListStore(
    (state) => state.filterTaskListByType
  );

  return (
    <Flex width="100%" alignItems="center" justifyContent="flex-end" gap={2}>
      <Text>Filtrar tarefas por:</Text>

      <Select
        width="30%"
        onChange={({ target }) => filterTaskListByType(target.value)}
      >
        <option disabled>Selecione um filtro</option>
        <option value="all">Por todas</option>
        <option value="completed">Por completas</option>
        <option value="uncompleted">Por incompletas</option>
      </Select>
    </Flex>
  );
}

export default FiltersTaskList;
