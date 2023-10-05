import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import useTaskListStore from "../../store/TaskListStore";

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

  return (
    <HStack
      spacing={2}
      bg="gray.800"
      width="100%"
      borderRadius="lg"
      padding={3}
    >
      <Box flex={1}>
        <Text
          textDecoration={isCompleted ? "line-through" : "none"}
          color={isCompleted ? "gray.400" : "gray.50"}
          fontSize="xl"
        >
          {title}
        </Text>

        <Text as="em" fontSize="xs" color="gray.500">
          {createdAt}
        </Text>
      </Box>

      {!isMobile ? (
        <>
          <Button
            leftIcon={<CheckIcon />}
            onClick={() => completeTask(id)}
            colorScheme="green"
            isDisabled={isCompleted}
          >
            <Text>Concluir tarefa</Text>
          </Button>

          <Button
            leftIcon={<DeleteIcon />}
            onClick={() => removeTask(id)}
            colorScheme="red"
          >
            <Text>Remover tarefa</Text>
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </HStack>
  );
}

export default TaskItem;
