import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import TaskItem from "../TaskItem";
import getDateNow from "../../utils/getDateNow";
import FormAddTask from "../FormAddTask";

const inputSchema = z.object({
  taskTitle: z
    .string()
    .min(3, { message: "A sua tarefa não contém, no mínimo, 3 caracteres." }),
});

export type IFormInput = z.infer<typeof inputSchema>;

type ITask = {
  id: string;
  taskTitle: string;
  createdAt: string;
  isCompleted: boolean;
};

function TaskList() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(inputSchema),
  });
  const [taskList, setTaskList] = useState<ITask[]>([]);

  function addNewTask(data: IFormInput) {
    const formattedDate = getDateNow();

    const newTask = {
      id: uuidv4(),
      taskTitle: data.taskTitle,
      createdAt: formattedDate,
      isCompleted: false,
    };

    setTaskList([...taskList, newTask]);
  }

  function removeTask(idTaskRemoved: string) {
    const newTaskListFiltered = taskList.filter((task) => {
      return task.id !== idTaskRemoved;
    });

    setTaskList(newTaskListFiltered);
  }

  function completeTask(idTaskCompleted: string) {
    const newTaskListFiltered = taskList.map((task) => {
      return task.id === idTaskCompleted
        ? { ...task, isCompleted: !task.isCompleted }
        : task;
    });

    setTaskList(newTaskListFiltered);
  }

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
            <VStack spacing={3}>
              {taskList.map((task) => {
                return (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    isCompleted={task.isCompleted}
                    title={task.taskTitle}
                    createdAt={task.createdAt}
                    removeTask={removeTask}
                    completeTask={completeTask}
                  />
                );
              })}
            </VStack>
          )}
        </Box>

        <Box width="100%" bg="gray.700" borderRadius="lg" padding={5}>
          <FormAddTask
            addNewTask={addNewTask}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
          />
        </Box>
      </VStack>
    </Container>
  );
}

export default TaskList;
