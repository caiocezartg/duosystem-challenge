import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useTaskListStore from "../../store/TaskListStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const inputSchema = z.object({
  taskTitle: z
    .string()
    .min(3, { message: "A sua tarefa não contém, no mínimo, 3 caracteres." }),
});

export type IFormInput = z.infer<typeof inputSchema>;

function FormAddTask() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(inputSchema),
  });
  const addNewTask = useTaskListStore((state) => state.addNewTask);

  return (
    <>
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
    </>
  );
}

export default FormAddTask;
