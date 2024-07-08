import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThemeSelect({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  React.useEffect(() => {}, []);
  return (
    <Select defaultValue={theme}  onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="w-[180px] text-black dark:text-white">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value="vs">vs</SelectItem>
          <SelectItem value="vs-dark">vs-dark</SelectItem>
          <SelectItem value="hc-black">hc-black</SelectItem>
          <SelectItem value="cd-game">cd-game</SelectItem>
          <SelectItem value="cd-rose">cd-rose</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
