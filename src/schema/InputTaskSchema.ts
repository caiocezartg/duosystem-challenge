import { z } from "zod";

export const inputSchema = z.object({
    taskTitle: z
      .string()
      .min(3, { message: "A sua tarefa não contém, no mínimo, 3 caracteres." })
      .max(50, { message: "A sua tarefa contém mais de 50 caracteres." }),
  });
  
  export type IFormInput = z.infer<typeof inputSchema>;