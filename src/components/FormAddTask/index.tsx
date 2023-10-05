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
  IconButton,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useTaskListStore from "../../store/TaskListStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormInput, inputSchema } from "../../schema/InputTaskSchema";

function FormAddTask() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(inputSchema),
  });
  const addNewTask = useTaskListStore((state) => state.addNewTask);

  const [isMobile] = useMediaQuery("(max-width: 30em)");

  return (
    <>
      <Heading size="md">Adicionar tarefa</Heading>

      <Divider marginY={5} />

      <form onSubmit={handleSubmit((data) => addNewTask(data, reset))}>
        <FormControl isInvalid={errors.taskTitle ? true : false}>
          <FormLabel>Digite o texto da sua tarefa:</FormLabel>

          <Flex>
            <Input
              width={["100%", "80%"]}
              borderRightRadius={0}
              borderRight="none"
              borderColor="pink.500"
              focusBorderColor="pink.400"
              {...register("taskTitle")}
            />

            {!isMobile ? (
              <>
                <Button
                  borderLeftRadius={0}
                  leftIcon={<AddIcon />}
                  colorScheme="pink"
                  type="submit"
                >
                  Adicionar tarefa
                </Button>
              </>
            ) : (
              <IconButton
                borderLeftRadius={0}
                icon={<AddIcon />}
                colorScheme="pink"
                type="submit"
                aria-label="Adicionar tarefa"
              />
            )}
          </Flex>

          {errors.taskTitle ? (
            <FormErrorMessage>{errors.taskTitle.message}</FormErrorMessage>
          ) : (
            <FormHelperText>
              A sua tarefa precisa ter, no mínimo, 3 caracteres e, no máximo, 50
              caracteres.
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </>
  );
}

export default FormAddTask;
