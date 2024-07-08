import { z } from 'zod';

const testCaseSchema = z.object({
    testin: z.string().min(1, "Test input is required"),
    testout: z.string().min(1, "Test output is required"),
    visible: z.boolean().default(false),
});
const tagSchema = z.object({
    value: z.string().min(1, "Add some tag"),
});
const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Last Title must be at least 5 characters" }),
    active: z.boolean().default(true),
    difficulty: z.string(),
    statement: z.string(),
    tags: z.array(tagSchema).min(1, "At least Tag is required"),
    testCases: z.array(testCaseSchema).min(1, "At least one test case is required"),
});
export { formSchema };