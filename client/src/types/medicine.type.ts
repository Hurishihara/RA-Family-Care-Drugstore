import { medicineSchema } from "@/schemas/medicine.schema.ts";
import { z } from "zod";

type medicineFormType = z.infer<typeof medicineSchema>;

export type { medicineFormType };
// This code defines a TypeScript type `medicineFormType` that is inferred from a Zod schema called `medicineSchema`.