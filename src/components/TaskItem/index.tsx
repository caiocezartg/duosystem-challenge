import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";

type ITaskItemProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  removeTask: (idTaskRemoved: string) => void;
  completeTask: (idTaskCompleted: string) => void;
};

function TaskItem({
  id,
  title,
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
      <Text flex={1} textDecoration={isCompleted ? "line-through" : "none"}>
        {title}
      </Text>

      <Button
        leftIcon={<CheckIcon />}
        onClick={() => completeTask(id)}
        colorScheme="green"
        disabled={isCompleted}
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
