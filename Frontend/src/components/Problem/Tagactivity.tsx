import { tags } from "@/api/problemUser";
import { IoMdClose } from "react-icons/io";

const Tagactivity = ({
  activetags,
  setIsopen,
}: {
  setIsopen: React.Dispatch<React.SetStateAction<boolean>>;
  activetags: tags[] | null | undefined;
}) => {
  return (
    <div className="flex flex-wrap gap-2 pb-2 mb-2  border-b-2">
      {activetags?.map((tag) => (
        <button
          className="bg-green-500 flex justify-center items-center  text-white px-2  gap-2 rounded-lg"
          key={tag._id}
          onClick={() => setIsopen(true)}
        >
          {tag.value}
          <IoMdClose className="" />
        </button>
      ))}
    </div>
  );
};

export default Tagactivity;
/* { onClick={() => {
            handleActiveTagClick(tag);
            getnewprob();
          }}}*/
