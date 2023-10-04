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
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IFormInput } from "../TaskList";

type IFormAddTaskProps = {
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  addNewTask: (data: IFormInput) => void;
};

function FormAddTask({
  handleSubmit,
  addNewTask,
  register,
  errors,
}: IFormAddTaskProps) {
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
