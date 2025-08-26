import { medicineSchema } from "@/schemas/medicine.schema.ts";
import { z } from "zod";

type medicineFormType = z.infer<typeof medicineSchema>;

type medicineType = medicineFormType & {
    id: string;
};

export type { medicineFormType, medicineType };
// This code defines a TypeScript type `medicineFormType` that is inferred from a Zod schema called `medicineSchema`.