import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import remarkGfm from "remark-gfm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import Markdown from "react-markdown";
import { formSchema } from "@/Schema/CreateProblem";
import { Checkbox } from "@/components/ui/checkbox";
import { TiDeleteOutline } from "react-icons/ti";
import { cn } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
interface Testcase {
  testin: string;
  testout: string;
  visible: boolean;
}
interface Problem {
  title: string;
  difficulty: string;
  statement: string;
  active: boolean;
  testCases: [Testcase];
  tags: [{ value: string }];
}
export default function Problemform({
  defaultvalue,
  update = false,
  api,
}: {
  update: boolean;
  defaultvalue: null | Problem;
  api: (
    values: z.infer<typeof formSchema>
  ) => Promise<AxiosResponse<unknown, unknown>>;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(`
  ##### Note: (if any)
## Problem Statement

[Write Your Problem Statement here]

##### Example:
[Provide an example case with explanation]

## Constraints

- [Put Some Constraints]
- [Put Some Constraints]

## Input Format

- [Format for each line of input]

## Output Format

- [Format for each line of Output]

## Hints (if any)

- [Hints to approach the problem]

  
  `);
  const [valid, setValid] = useState(false);
  const defaultval = {
    title: "",
    statement: editorState,
    active: true,
    testCases: [{ testin: "", testout: "", visible: true }],
    tags: [{ value: "" }],
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultvalue || defaultval,
  });
  const { control } = form;
  const tc = useFieldArray({
    control,
    name: "testCases", //
  });
  const tags = useFieldArray({
    control,
    name: "tags",
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values);
    setValid(true);
    try {
      await api(values);
      //console.log(res);
      toast({
        title: `Problem ${defaultvalue ? "Updated" : "Created"} Successfully`,
        description: "You will be redirected to Dashboard",
      });
      if (!defaultvalue) form.reset();
      setValid(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status == 400) {
          if (err.response.data.on == "title") {
            form.setError("title", {
              type: "manual",
              message: "Problem with this title exists",
            });
          }
        } else if (err.response && err.response.status == 403) {
          //console.log("[LOGIN REDIRECT]");
          return navigate("/login");
        }
        setValid(false);
      } else {
        console.error("Unexpected error:", err);
      }
      //console.log("Unexpected error:", err);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"active"}
          render={({ field }) => (
            <FormItem className="flex  items-center ">
              <FormControl>
                <Checkbox
                  className="justify-self-start mr-2"
                  id={`active`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="-translate-y-1">
                <Label className="" htmlFor={`active`}>
                  Status Active
                </Label>
                <FormDescription></FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="title">
                  Title
                </Label>

                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                    id="title"
                    placeholder="Title"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="difficulty">
                  Difficulty Level
                </Label>
                <Select
                  onValueChange={(val) => {
                    //tags.update(0, { value: val });
                    ////console.log(tags.fields.at(0), val);
                    field.onChange(val);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={update}>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent id="difficulty">
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Cannot be modified later</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <Label className="text-sm font-medium ">Tags</Label>
          <div className="flex gap-4 flex-row mt-2  flex-wrap">
            {tags.fields.map((field, index) => (
              <div
                className="flex items-center justify-center gap-1 "
                id={field.id}
                key={index}
              >
                <FormField
                  control={form.control}
                  name={`tags.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          className="resize-none rounded-md border border-gray-300 w-32 px-3 h-8  py-2 overflow-auto text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                          id={`test-input-${index}`}
                          placeholder={
                            //index == 0 ? "Select Difficulty" :
                            "Enter Tag"
                          }
                          disabled={
                            defaultvalue &&
                            update &&
                            index < defaultvalue?.tags.length
                              ? true
                              : false
                          }
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  onClick={() => {
                    if (
                      !(
                        defaultvalue &&
                        update &&
                        index < defaultvalue?.tags.length
                      )
                    )
                      tags.remove(index);
                  }}
                  className={cn(
                    "cursor-pointer items-center mb-2",
                    index == 0 ? "hidden" : "flex"
                  )}
                >
                  <div className="justify-self-start  mr-1">
                    <TiDeleteOutline className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </div>
            ))}

            <div className="mb-2 flex items-center">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => tags.append({ value: "" })}
                className="p-2 h-4 w-4 rounded"
              >
                +
              </Button>
            </div>
          </div>
          <FormDescription>
            Tags once submitted cannot be removed
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="statement"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="statement">
                Problem Description
              </Label>
              <div className="grid md:grid-cols-2  grid-rows-2 md:grid-rows-1  gap-4">
                <FormControl>
                  <Textarea
                    className="resize-none rounded-md border border-gray-300 px-3 h-64 md:h-[500px] py-2 overflow-auto text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                    id="statement"
                    placeholder=""
                    onChangeCapture={(e) =>
                      setEditorState(e.currentTarget.value)
                    }
                    required
                    {...field}
                  />
                </FormControl>
                <div className="h-64 overflow-auto rounded-md border border-gray-300 px-3 py-2 md:h-[500px]  text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50">
                  <Markdown className={"markdown"} remarkPlugins={[remarkGfm]}>
                    {editorState}
                  </Markdown>
                </div>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          {tc.fields.map((field, index) => (
            <div className="flex flex-col" key={index}>
              <div className="">
                <Label className=" col-span-2" htmlFor="test-case-visible">
                  Test Case {index + 1}
                </Label>
              </div>
              <div className="flex space-x-5">
                <div className="">
                  <FormField
                    control={form.control}
                    name={`testCases.${index}.visible`}
                    render={({ field }) => (
                      <FormItem className="flex  items-center ">
                        <FormControl>
                          <Checkbox
                            className="justify-self-start mr-2"
                            id={`test-case-visible-${index}`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="-translate-y-1">
                          <Label
                            className=""
                            htmlFor={`test-case-visible-${index}`}
                          >
                            Visible
                          </Label>
                          <FormDescription></FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  onClick={() => {
                    tc.remove(index);
                  }}
                  className={cn(
                    "cursor-pointer items-center ",
                    index == 0 ? "hidden" : "flex"
                  )}
                >
                  <div className="justify-self-start  mr-1">
                    <TiDeleteOutline className="h-5 w-5 text-red-600" />
                  </div>
                  <Label
                    className="mt-0"
                    htmlFor={`test-case-visible-${index}`}
                  >
                    Remove
                  </Label>
                </div>
              </div>
              <div
                className="grid flex-1 sm:grid-cols-2 sm:grid-row-1 grid-row-2 sm:gap-4 gap-2"
                id={field.id}
              >
                <FormField
                  control={form.control}
                  name={`testCases.${index}.testin`}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <Label
                        className="text-sm font-medium"
                        htmlFor={`test-input-${index}`}
                      >
                        Input
                      </Label>
                      <FormControl>
                        <Textarea
                          className="resize-none rounded-md border border-gray-300 px-3 h-40  py-2 overflow-auto text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                          id={`test-input-${index}`}
                          placeholder="Enter test case"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`testCases.${index}.testout`}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <Label
                        className="text-sm font-medium"
                        htmlFor={`test-out-${index}`}
                      >
                        Output
                      </Label>

                      <FormControl>
                        <Textarea
                          className="resize-none rounded-md border border-gray-300 px-3 h-40 py-2 overflow-auto text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                          id={`test-out-${index}`}
                          placeholder="Enter expected output"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <div className="">
            <Button
              type="button"
              variant={"outline"}
              onClick={() =>
                tc.append({ testin: "", testout: "", visible: false })
              }
              className="p-2  rounded"
            >
              Add Test Case
            </Button>
          </div>
        </div>

        <div className="w-full flex-col items-center flex justify-center">
          <Button disabled={valid} type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
