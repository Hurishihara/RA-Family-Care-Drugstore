import { medicineSchema } from "@/schemas/medicine.schema.ts";
import { z } from "zod";

type medicineFormType = z.infer<typeof medicineSchema>;

type medicineType = {
    id: string;
    medicineName: string;
    category: string;
    quantity: number;
    pricePerUnit: number;
    costPerUnit: number;
    expiryDate: string;
    expirationDate: string;
    dateReceived: string;
}

export type { medicineFormType, medicineType };
// This code defines a TypeScript type `medicineFormType` that is inferred from a Zod schema called `medicineSchema`.