import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialcode = (lang: string): string => {
  switch (lang) {
    case "cpp":
      return `#include <bits/stdc++.h>
  using namespace std;
  int main() {
      // Your code logic here
      return 0;
  }`;
    case "java":
      return `public class Main {
      public static void main(String[] args) {
          // Your code logic here\n
      }
  }`;
    case "c":
      return `#include <stdio.h>
  int main() {
      // Your code logic here
      return 0;
  }`;
    case "javascript":
      return `function main() {
      // Your code logic here
  }
  main();`;
    case "python":
      return `def main():
      # Your code logic here
  if __name__ == "__main__":
      main()`;
    default:
      return `#include <bits/stdc++.h>
  using namespace std;
  int main() {
       // Your code logic here
      return 0;
  }`;
  }
};

export function LangSelect({
  lang,
  setLang,
  code,
  setCode,
}: {
  lang: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [codeStates, setCodeStates] = useState<Record<string, string>>({
    cpp: initialcode("cpp"),
    java: initialcode("java"),
    c: initialcode("c"),
    javascript: initialcode("javascript"),
    python: initialcode("python"),
  });

  const handleLangChange = (newLang: string) => {
    setCodeStates((prevCodeStates) => ({
      ...prevCodeStates,
      [lang]: code,
    }));
    setLang(newLang);
    setCode(codeStates[newLang]);
  };

  useEffect(() => {
    setCode(codeStates["cpp"]);
  }, []);

  return (
    <Select
      defaultValue={lang}
      onValueChange={(value) => handleLangChange(value as string)}
    >
      <SelectTrigger className="w-[180px] text-black dark:text-white">
        <SelectValue placeholder="language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="cpp">c++</SelectItem>
          <SelectItem value="c">c</SelectItem>
          <SelectItem value="java">java</SelectItem>
          <SelectItem value="python">python</SelectItem>
          {/* <SelectItem value="javascript">javascript</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
