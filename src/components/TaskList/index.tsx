import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TaskItem from "../TaskItem";
import { useState } from "react";

function TaskList() {
  const [taskList, setTaskList] = useState([""]);

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
            <Text>Nenhum item adicionado a lista de tarefas.</Text>
          ) : (
            <VStack spacing={3}>
              <TaskItem title="Um texto aleatório pra botar aqui" />
              <TaskItem title="Um texto aleatório pra botar aqui" />
              <TaskItem title="Um texto aleatório pra botar aqui" />
            </VStack>
          )}
        </Box>

        <Box width="100%" bg="gray.700" borderRadius="lg" padding={5}>
          <Heading size="md">Adicionar tarefa</Heading>

          <Divider marginY={5} />

          <FormControl as="form">
            <FormLabel>Digite o texto da sua tarefa</FormLabel>

            <Flex>
              <Input
                width="80%"
                borderRightRadius={0}
                borderRight="none"
                borderColor="pink.500"
                focusBorderColor="pink.400"
              />

              <Button
                borderLeftRadius={0}
                leftIcon={<AddIcon />}
                colorScheme="pink"
              >
                Adicionar tarefa
              </Button>
            </Flex>

            <FormHelperText>
              A sua tarefa precisa no mínimo de 3 caracteres.
            </FormHelperText>
          </FormControl>
        </Box>
      </VStack>
    </Container>
  );
}

export default TaskList;
