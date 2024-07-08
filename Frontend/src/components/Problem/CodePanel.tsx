import { useState } from "react";
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditorMonaco";
import { LangSelect } from "./LangSelect";
import { useToast } from "../ui/use-toast";
import { apicallcompile, apicallsubmit } from "@/api/compilation";
import { FcProcess } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeSelect } from "./ThemeSelect";
import { MultiTab } from "./MultiTab";
import axios from "axios";

const CodePanel = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [lang, setLang] = useState<string>("cpp");
  const [activetheme, setActivetheme] = useState<string>("vs");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [output, setOutput] = useState("");
  const [loading, setloading] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [val, setVal] = useState<string>("input");
  const [casepassed, setCasepassed] = useState<number>(-1); //-1->No n->casespassed
  const [lastwa, setlastwa] = useState<number>(0); //0->No 1->WA 2->TLE

  const { toast } = useToast();
  const onRun = async () => {
    setCasepassed(-1);
    setRunning(true);
    setloading(true);
    setError("");
    const data = {
      lang,
      code,
      inputValue: [inputValue],
    };
    try {
      const res = await apicallcompile(data);
      setOutput(res?.data?.output[0]);
      setVal("output");
      //console.log("[successful]", res, output);
      setError("");
    } catch (err) {
      //console.log("[Unsuccessful]", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          if (err.response?.data.error.status == 1) {
            let _error = String(err);
            if (["py", "python", "cpp", "c", "java"].includes(data.lang)) {
              _error = err.response?.data.error.formattedErrors.join("\n");
            }
            setError(_error);
          } else setError(err.response?.data.message);
        } else if (err.response?.status === 403) {
          if (err.response.data.isAuthenticated) {
            toast({
              title: "Unauthorized",
              description: "Only Non-Admin user can submit a Solution",
            });
          } else {
            toast({
              title: "Unauthorized",
              description: "Login to submit Solutions",
            });
            navigate("/login");
          }
        } else if (err.message == "Network Error") {
          setError("Unable to connect with the server!");
        }
      } else {
        setError("An unexpected error occurred.");
      }
      setVal("console");
      setOutput("");
    } finally {
      setloading(false);
      setRunning(false);
    }
    //console.log(data);
  };
  const onSubmit = async () => {
    setCasepassed(-1);
    setSubmitting(true);
    setloading(true);
    setError("");
    const data = {
      lang,
      code,
      prob_id: problemId || " ",
    };
    try {
      setVal("console");
      const res = await apicallsubmit(data);
      //console.log("[Successful]", res);
      setError("SOLUTION SUBMITTED");
      toast({
        title: "Solution Submitted ",
        description: "Congratulations on a successful submission!!",
      });
      setCasepassed(res.data?.submission.casespassed);
      setlastwa(0);
    } catch (err) {
      //console.log("[Unsuccessful]", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 400) {
          if (err.response?.data.error.status == 0) {
            setCasepassed(err.response?.data.error.error.casespassed);
            setlastwa(2);
          } else if (err.response?.data.error.status == 1) {
            let _error = String(err);
            if (["py", "python", "cpp", "c", "java"].includes(data.lang)) {
              _error = err.response?.data.error.formattedErrors.join("\n");
            }
            setlastwa(1);
            setError(_error);
          } else if (err.response?.data.error.status == 2) {
            setCasepassed(err.response?.data.error.error.casespassed);
            setlastwa(1);
          } else setError(err.response?.data.message);
        } else if (err.response?.status === 403) {
          if (err.response.data.isAuthenticated) {
            toast({
              title: "Unauthorized",
              description: "Only Non-Admin user can submit a Solution",
            });
          } else {
            toast({
              title: "Unauthorized",
              description: "Login to submit Solutions",
            });
            navigate("/login");
          }
        } else if (err.message == "Network Error") {
          setError("Unable to connect with the server!");
        }
      }
    } finally {
      setloading(false);
      setSubmitting(false);
    }
    //console.log(data);
  };
  return (
    <div className="h-full md:py-0 py-2 overflow-y-scroll no-scrollbar bg-white shadow-md dark:bg-transparent">
      <div className="p-6 space-y-5">
        <div className="grid gap-4">
          <div className="space-y-2 overflow-x-scroll">
            <div className="flex space-x-5 items-center">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="result"
              >
                Code
              </label>
              <LangSelect
                code={code}
                setCode={setCode}
                lang={lang}
                setLang={setLang}
              />
              <ThemeSelect theme={activetheme} setTheme={setActivetheme} />
            </div>
            <div
              className="shadow-sm relative flex w-full  no-scrollbar"
              style={{ height: "300px", overflowY: "auto" }}
            >
              <CodeEditor
                setCode={setCode}
                code={code}
                lang={lang}
                activetheme={activetheme}
                disabled={loading}
              ></CodeEditor>
            </div>
          </div>
          <MultiTab
            casepassed={casepassed}
            lastwa={lastwa}
            setVal={setVal}
            val={val}
            error={error}
            output={output}
            setInputValue={setInputValue}
            inputValue={inputValue}
            loading={loading}
          ></MultiTab>
        </div>
        <div className="flex w-full gap-4 flex-col sm:flex-row">
          <Button
            variant={"outline"}
            className="w-full h-8 dark:bg-slate-800 dark:text-white bg-slate-200 text-black hover:bg-slate-300"
            onClick={() => {
              loading
                ? toast({
                    title: "Wait till code is running",
                    description: "User activity restricted",
                  })
                : onRun();
            }}
          >
            <div className="gap-4 flex items-center">
              <span className="">{running ? "Code Running" : "Run Code"}</span>
              {running && <FcProcess className="animate-spin"></FcProcess>}
            </div>
          </Button>
          <Button
            className="w-full h-8 dark:bg-slate-700 dark:text-white"
            onClick={() => {
              loading
                ? toast({
                    title: "Wait till code is submitting",
                    description: "User activity restricted",
                  })
                : onSubmit();
            }}
          >
            <div className="gap-4  flex items-center">
              <span className="">
                {submitting ? "Code Submitting" : "Submit"}
              </span>
              {submitting && <FcProcess className="animate-spin"></FcProcess>}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodePanel;
