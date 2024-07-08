import { Problem, apicalltagproblems, tags } from "@/api/problemUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";

export function TagFilterModal({
  setTags,
  tags,
  isOpen,
  setOpen,
  activetags,
  setActiveTags,
  setProblems,
  pagenumber,
}: {
  pagenumber: number;
  setProblems: Dispatch<React.SetStateAction<Problem[]>>;
  isOpen: boolean;
  tags: tags[] | null | undefined;
  setTags: Dispatch<SetStateAction<tags[] | null | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activetags: tags[] | null | undefined;
  setActiveTags: Dispatch<React.SetStateAction<tags[] | null | undefined>>;
}) {
  // Move tag from tags to activetags
  const handleTagClick = (tag: tags) => {
    setTags((prevTags) => prevTags?.filter((t) => t._id !== tag._id));
    setActiveTags((prevActiveTags) =>
      prevActiveTags ? [...prevActiveTags, tag] : [tag]
    );
  };
  const getnewprob = async () => {
    const res = await apicalltagproblems(pagenumber, activetags);
    if (res) setProblems(res?.problems);
    //console.log("[tagres]", res);
  };
  const getnewprobempty = async () => {
    const res = await apicalltagproblems(pagenumber, []);
    if (res) setProblems(res?.problems);
    //console.log("[tagres]", res);

    setTags((prevTags) => [...(prevTags ?? []), ...(activetags ?? [])]);
    setActiveTags([]);
  };
  // Move tag from activetags to tags
  const handleActiveTagClick = (tag: tags) => {
    setActiveTags((prevActiveTags) =>
      prevActiveTags?.filter((t) => t._id !== tag._id)
    );
    setTags((prevTags) => (prevTags ? [...prevTags, tag] : [tag]));
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tag Filter</DialogTitle>
          <DialogDescription>Select and manage your tags</DialogDescription>
        </DialogHeader>
        <div className="submission-details dark:bg-transparent bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-2 pb-2 mb-2  border-b-2">
            {activetags?.map((tag) => (
              <button
                onClick={() => handleActiveTagClick(tag)}
                className="bg-green-500 flex justify-center items-center  text-white px-2  gap-2 rounded-lg"
                key={tag._id}
              >
                {tag.value}
                <IoMdClose className="" />
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <button
                onClick={() => handleTagClick(tag)}
                className=" dark:text-white text-black border-2 px-2  rounded-lg "
                key={tag._id}
              >
                {tag.value}
              </button>
            ))}
          </div>
        </div>
        <DialogFooter className="">
          <Button
            onClick={() => {
              getnewprob();
              setOpen(false);
            }}
          >
            Filter
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              getnewprobempty();
              setOpen(false);
            }}
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
