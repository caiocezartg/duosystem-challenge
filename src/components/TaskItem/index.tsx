import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import useTaskListStore from "../../store/TaskListStore";
import ModalEditTask from "../ModalEditTask";

type ITaskItemProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
};

function TaskItem({ id, title, createdAt, isCompleted }: ITaskItemProps) {
  const [completeTask, removeTask] = useTaskListStore((state) => [
    state.completeTask,
    state.removeTask,
  ]);

  const [isMobile] = useMediaQuery("(max-width: 30em)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalEditTask isOpen={isOpen} onClose={onClose} idTask={id} />

      <HStack
        spacing={2}
        bg="gray.800"
        width="100%"
        borderRadius="lg"
        padding={3}
        justifyContent="space-between"
      >
        <Box width="50%">
          <Text
            textDecoration={isCompleted ? "line-through" : "none"}
            color={isCompleted ? "gray.400" : "gray.50"}
            fontSize={["md", "xl"]}
          >
            {title}
          </Text>

          <Text as="em" fontSize="xs" color="gray.500">
            {createdAt}
          </Text>
        </Box>

        {!isMobile ? (
          <HStack>
            <Button
              leftIcon={<CheckIcon />}
              onClick={() => completeTask(id)}
              colorScheme="green"
              isDisabled={isCompleted}
            >
              Concluir
            </Button>

            <Button
              leftIcon={<DeleteIcon />}
              onClick={() => removeTask(id)}
              colorScheme="red"
            >
              Remover
            </Button>

            <Button
              leftIcon={<EditIcon />}
              onClick={onOpen}
              colorScheme="orange"
            >
              Editar
            </Button>
          </HStack>
        ) : (
          <HStack>
            <IconButton
              icon={<CheckIcon />}
              onClick={() => completeTask(id)}
              colorScheme="green"
              isDisabled={isCompleted}
              aria-label="Concluir tarefa"
            />

            <IconButton
              icon={<DeleteIcon />}
              onClick={() => removeTask(id)}
              colorScheme="red"
              aria-label="Remover tarefa"
            />

            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="orange"
              aria-label="Alterar tarefa"
            />
          </HStack>
        )}
      </HStack>
    </>
  );
}

export default TaskItem;
