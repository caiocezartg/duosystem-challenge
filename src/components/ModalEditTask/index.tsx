import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  UseModalProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormInput, inputSchema } from "../../schema/InputTaskSchema";
import useTaskListStore from "../../store/TaskListStore";

type IModalEditTask = {
  idTask: string;
} & UseModalProps;

function ModalEditTask({ isOpen, onClose, idTask }: IModalEditTask) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(inputSchema),
  });

  const [isMobile] = useMediaQuery("(max-width: 30em)");
  const editTask = useTaskListStore((state) => state.editTask);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="gray.700">
        <ModalHeader>Editar tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={handleSubmit((data) => editTask(idTask, data.taskTitle))}
          >
            <FormControl isInvalid={errors.taskTitle ? true : false}>
              <FormLabel>Digite o novo texto da sua tarefa:</FormLabel>

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
                      leftIcon={<EditIcon />}
                      colorScheme="pink"
                      type="submit"
                    >
                      Alterar tarefa
                    </Button>
                  </>
                ) : (
                  <IconButton
                    borderLeftRadius={0}
                    icon={<EditIcon />}
                    colorScheme="pink"
                    type="submit"
                    aria-label="Alterar tarefa"
                  />
                )}
              </Flex>

              {errors.taskTitle && (
                <FormErrorMessage>{errors.taskTitle.message}</FormErrorMessage>
              )}
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalEditTask;
