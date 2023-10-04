import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

type ITaskItemProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  removeTask: (idTaskRemoved: string) => void;
  completeTask: (idTaskCompleted: string) => void;
};

function TaskItem({
  id,
  title,
  createdAt,
  isCompleted,
  removeTask,
  completeTask,
}: ITaskItemProps) {
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

      <Button
        leftIcon={<CheckIcon />}
        onClick={() => completeTask(id)}
        colorScheme="green"
        isDisabled={isCompleted}
      >
        Concluir tarefa
      </Button>

      <Button
        leftIcon={<DeleteIcon />}
        onClick={() => removeTask(id)}
        colorScheme="red"
      >
        Remover tarefa
      </Button>
    </HStack>
  );
}

export default TaskItem;
