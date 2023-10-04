import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";

type ITaskItemProps = {
  title: string;
};

function TaskItem({ title }: ITaskItemProps) {
  return (
    <HStack
      spacing={2}
      bg="gray.800"
      width="100%"
      borderRadius="lg"
      padding={3}
    >
      <Text flex={1}>{title}</Text>

      <Button leftIcon={<CheckIcon />} colorScheme="green">
        Concluir tarefa
      </Button>

      <Button leftIcon={<DeleteIcon />} colorScheme="red">
        Remover tarefa
      </Button>
    </HStack>
  );
}

export default TaskItem;
