import React, { useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/themes/prism.css";
const initialcode = (lang: string) => {
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
      return `#include <bits/sdtc++.h>
using namespace std;
int main() {
     // Your code logic here
    return 0;
}`;
  }
};
const highlight = (lang: string, code: string) => {
  switch (lang) {
    case "cpp":
      return Prism.highlight(code, Prism.languages.cpp, "cpp");
    case "java":
      return Prism.highlight(code, Prism.languages.java, "java");
    case "c":
      return Prism.highlight(code, Prism.languages.c, "c");
    case "javascript":
      return Prism.highlight(code, Prism.languages.javascript, "javascript");
    case "python":
      return Prism.highlight(code, Prism.languages.python, "python");
    default:
      return Prism.highlight(code, Prism.languages.javascript, "javascript");
  }
};
const handleKeyDown = (
  event: React.KeyboardEvent<HTMLTextAreaElement | HTMLDivElement>,
  code: string,
  setCode: React.Dispatch<React.SetStateAction<string>>
) => {
  if (event.key === "Tab") {
    event.preventDefault();
    const target = event.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const newCode = code.substring(0, start) + "  " + code.substring(end);
    setCode(newCode);
    // Move cursor
    setTimeout(() => {
      target.selectionStart = target.selectionEnd = start + 2;
    }, 0);
  } else if (["(", "{", "[", '"', "'", "<", "`"].includes(event.key)) {
    event.preventDefault();
    const target = event.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    let closingChar = event.key;
    switch (event.key) {
      case "(":
        closingChar = ")";
        break;
      case "{":
        closingChar = "}";
        break;
      case "[":
        closingChar = "]";
        break;
      case "<":
        closingChar = ">";
        break;
      case '"':
      case "`":
      case "'":
        closingChar = event.key;
        break;
      default:
        break;
    }
    const newCode =
      code.substring(0, start) + event.key + closingChar + code.substring(end);
    setCode(newCode);
    setTimeout(() => {
      target.selectionStart = target.selectionEnd = start + 1;
    }, 0);
  }
};

const CodeEditor = ({
  lang,
  setCode,
  code,
  disabled,
}: {
  code: string;
  lang: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}) => {
  useEffect(() => {
    setCode(initialcode(lang));
  }, [lang]);

  return (
    <Editor
      disabled={disabled}
      value={code}
      onValueChange={setCode}
      highlight={() => highlight(lang, code)}
      padding={10}
      onKeyDown={(e) => handleKeyDown(e, code, setCode)}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        border: "1px solid #ddd",
        borderRadius: "5px",
        minHeight: "300px",
      }}
    />
  );
};

export default CodeEditor;
