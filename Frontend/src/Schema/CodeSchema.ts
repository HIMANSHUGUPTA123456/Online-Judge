import { z } from 'zod';
const runCodeSchema = z.object({
    lang: z.string(),
    code: z.string(),
    input: z.string(),
});
const submitCodeSchema = z.object({
    lang: z.string(),
    code: z.string(),
    pid: z.string(),
});


export { runCodeSchema, submitCodeSchema };