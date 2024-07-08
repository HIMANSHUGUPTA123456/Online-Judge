import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubmissionData } from "./SubmissionProblemPanel";

export function SubmissionModal({
  submission,
  isOpen,
  setOpen,
}: {
  submission: SubmissionData | null;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="submission-details dark:bg-gray-800 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex flex-col space-y-2">
            <div>
              <strong>Submission ID:</strong> {submission?._id.slice(-10)}
            </div>
            <div>
              <strong>Problem ID:</strong> {submission?.prob_id.slice(-10)}
            </div>
            <div>
              <strong>Language:</strong> {submission?.language}
            </div>
            {/*
            <div>
              <strong>Code Reference:</strong> {submission?.code_ref}
            </div>*/}
            <div>
              <strong>Verdict:</strong>{" "}
              <span
                className={
                  submission?.verdict ? "text-green-600" : "text-red-600"
                }
              >
                {submission?.verdict ? "Passed" : "Failed"}
              </span>
            </div>
            <div>
              <strong>Comment:</strong> {submission?.comment}
            </div>
            <div>
              <strong>Execution Time:</strong>{" "}
              <span className="text-blue-600">
                {submission?.execution_time} ms
              </span>
            </div>
            <div>
              <strong>Cases Passed:</strong> {submission?.casespassed}
            </div>
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(submission?.createdAt || "").toLocaleString()}
            </div>
          </div>
        </div>
        {/*<CodeEditor lang={submission?.language || ""}
  code={submission?.code_ref || ""}
  disabled={true}></CodeEditor>*/}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
