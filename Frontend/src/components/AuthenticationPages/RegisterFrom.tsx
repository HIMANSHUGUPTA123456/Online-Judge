import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { z } from "zod";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BACKENDURL } from "@/api/api";
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,15}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterFrom = () => {
  const { toast } = useToast();
  const [showp, setShowp] = useState(false);
  const [showc, setShowc] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const formSchema = z
    .object({
      lname: z
        .string()
        .min(5, { message: "Last name must be at least 5 characters" })
        .max(15, { message: "Last name must be at most 15 characters" }),
      fname: z
        .string()
        .min(5, { message: "First name must be at least 5 characters" })
        .max(15, { message: "First name must be at most 15 characters" }),
      username: z
        .string()
        .min(5, { message: "Username must be at least 5 characters" })
        .max(15, { message: "Username must be at most 15 characters" }),
      email: z.string().regex(emailRegex, { message: "Invalid email format" }),
      password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters" })
        .max(15, { message: "Password must be at most 15 characters" })
        .regex(passwordRegex, {
          message:
            "Password must include at least one uppercase letter, one number, and one special character (@,$,!,%,*,?,&)",
        }),
      cpassword: z.string(),
      isAdmin: z
        .string()
        .max(1, { message: "isAdmin must be a single character" }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.cpassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cpassword"],
          message: "Passwords do not match",
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setValid(true);
    try {
       await axios.post(`${BACKENDURL}/auth/register`, values);
      //console.log("Data saved successfully:", response.data);
      toast({
        title: "User Registered",
        description: "You will be redirected to Login page",
      });
      navigate("/login");
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status == 400) {
          if (error.response.data.on == "username") {
            form.setError("username", {
              type: "manual",
              message: "Username is already taken",
            });
          } else if (error.response.data.on == "email") {
            form.setError("email", {
              type: "manual",
              message: "Email already registered",
            });
          }
        }
        setValid(false);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(values);
  }

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="first-name">
                    First Name
                  </Label>
                  <FormControl>
                    <Input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                      id="first-name"
                      placeholder="First name"
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
              name="lname"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor="last-name">
                    Last Name
                  </Label>
                  <FormControl>
                    <Input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                      id="last-name"
                      placeholder="Last name"
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="username">
                  Username
                </Label>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                    id="username"
                    placeholder="Username"
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="email">
                  Email
                </Label>

                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                    id="email"
                    placeholder="Your email"
                    required
                    type="email"
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
            name="isAdmin"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="account-type">
                  Account Type
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="T">Admin</SelectItem>
                    <SelectItem value="F">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="password">
                  Password
                </Label>

                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                      id="password"
                      required
                      type={showp ? "text" : "password"}
                      {...field}
                    />
                    <FaEye
                      className={cn(
                        "w-5 h-5",
                        !showp ? "text-black" : "text-blue-600"
                      )}
                      onClick={() => setShowp(!showp)}
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label className="text-sm font-medium" htmlFor="cpassword">
                  Confirm Password
                </Label>

                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-50 dark:focus:ring-gray-50"
                      id="cpassword"
                      required
                      type={showc ? "text" : "password"}
                      {...field}
                    />
                    <FaEye
                      className={cn(
                        "w-5 h-5",
                        !showc ? "text-black" : "text-blue-600"
                      )}
                      onClick={() => setShowc(!showc)}
                    />
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex-col items-center flex justify-center">
            <Button disabled={valid} type="submit" className="w-full">
              Submit
            </Button>
            <div className="w-full text-sm text-right mt-2">
              Already have an account?{" "}
              <Link className="text-blue-600 italic" to="/login">
                {" "}
                Login
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterFrom;
