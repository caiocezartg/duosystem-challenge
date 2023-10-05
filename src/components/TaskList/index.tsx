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
  const taskList = useTaskListStore((state) => state.taskList);

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
                <Text>Filtrar por:</Text>

                <Select placeholder="Selecione um filtro" width="30%">
                  <option value="status">Por status</option>
                  <option value="data">Por data</option>
                </Select>
              </Flex>

              <VStack
                spacing={3}
                width="100%"
                maxHeight="50vh"
                overflowY="auto"
                sx={{ "::-webkit-scrollbar": { display: "none" } }}
              >
                {taskList.map((task) => {
                  return (
                    <TaskItem
                      key={task.id}
                      id={task.id}
                      isCompleted={task.isCompleted}
                      title={task.taskTitle}
                      createdAt={task.createdAt}
                    />
                  );
                })}
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
