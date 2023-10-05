import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

import useTaskListStore from "../../store/TaskListStore";

import TaskItem from "../TaskItem";
import FormAddTask from "../FormAddTask";

function TaskList() {
  const [taskList, filterTaskListByType, filteredTaskList] = useTaskListStore(
    (state) => [
      state.taskList,
      state.filterTaskListByType,
      state.filteredTaskList,
    ]
  );

  return (
    <Container maxWidth="3xl">
      <VStack
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100vh"
        spacing={5}
      >
        <Box width="100%" bg="gray.700" borderRadius="lg" padding={5}>
          <Heading as="h1" size="lg">
            Lista de Tarefas
          </Heading>

          <Divider marginY={5} />

          {taskList.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              Nenhum item adicionado a lista de tarefas.
            </Text>
          ) : (
            <VStack>
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="flex-end"
                gap={2}
              >
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

              <VStack
                spacing={3}
                width="100%"
                maxHeight="50vh"
                overflowY="auto"
                sx={{ "::-webkit-scrollbar": { display: "none" } }}
              >
                {filteredTaskList.length === 0
                  ? taskList.map((task) => (
                      <TaskItem
                        key={task.id}
                        id={task.id}
                        createdAt={task.createdAt}
                        title={task.taskTitle}
                        isCompleted={task.isCompleted}
                      />
                    ))
                  : filteredTaskList.map((task) => (
                      <TaskItem
                        key={task.id}
                        id={task.id}
                        createdAt={task.createdAt}
                        title={task.taskTitle}
                        isCompleted={task.isCompleted}
                      />
                    ))}
              </VStack>
            </VStack>
          )}
        </Box>

        <Box width="100%" bg="gray.700" borderRadius="lg" padding={5}>
          <FormAddTask />
        </Box>
      </VStack>
    </Container>
  );
}

export default TaskList;
