import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  UseModalProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormInput, inputSchema } from "../../schema/InputTaskSchema";

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="gray.700">
        <ModalHeader>Editar tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
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
                  A sua tarefa precisa ter, no mínimo, 3 caracteres e, no
                  máximo, 50 caracteres.
                </FormHelperText>
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
