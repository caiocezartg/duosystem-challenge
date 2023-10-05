import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import useTaskListStore from "../../store/TaskListStore";

import TaskItem from "../TaskItem";
import FormAddTask from "../FormAddTask";
import FiltersTaskList from "../FiltersTaskList";

function TaskList() {
  const [taskList, filteredTaskList] = useTaskListStore((state) => [
    state.taskList,
    state.filteredTaskList,
  ]);

  return (
    <Container maxWidth="4xl">
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
              <FiltersTaskList />

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
