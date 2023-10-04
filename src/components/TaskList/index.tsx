import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import TaskItem from "../TaskItem";

const inputSchema = z.object({
  taskTitle: z
    .string()
    .min(3, { message: "A sua tarefa não contém, no mínimo, 3 caracteres." }),
});

type IFormInput = z.infer<typeof inputSchema>;

type ITask = {
  id: string;
  taskTitle: string;
  createdAt: Date;
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
    const newTask = {
      id: uuidv4(),
      taskTitle: data.taskTitle,
      createdAt: new Date(),
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
                    removeTask={removeTask}
                    completeTask={completeTask}
                  />
                );
              })}
            </VStack>
          )}
        </Box>

        <Box width="100%" bg="gray.700" borderRadius="lg" padding={5}>
          <Heading size="md">Adicionar tarefa</Heading>

          <Divider marginY={5} />

          <form onSubmit={handleSubmit(addNewTask)}>
            <FormControl isInvalid={errors.taskTitle ? true : false}>
              <FormLabel>Digite o texto da sua tarefa:</FormLabel>

              <Flex>
                <Input
                  width="80%"
                  borderRightRadius={0}
                  borderRight="none"
                  borderColor="pink.500"
                  focusBorderColor="pink.400"
                  {...register("taskTitle")}
                />

                <Button
                  borderLeftRadius={0}
                  leftIcon={<AddIcon />}
                  colorScheme="pink"
                  type="submit"
                >
                  Adicionar tarefa
                </Button>
              </Flex>

              {errors.taskTitle ? (
                <FormErrorMessage>{errors.taskTitle.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  A sua tarefa precisa ter, no mínimo, 3 caracteres.
                </FormHelperText>
              )}
            </FormControl>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default TaskList;
