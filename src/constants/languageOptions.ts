export type ILanguageOption = {
  id: number;
  name: string;
  label: string;
  value: string;
  valueForCodeEditor: string;
};

export const languageOptions: ILanguageOption[] = [
  {
    id: 1,
    name: "NodeJS",
    label: "NodeJS",
    value: "js",
    valueForCodeEditor: "javascript"
  },
  {
    id: 2,
    name: "Python",
    label: "Python",
    value: "py",
    valueForCodeEditor: "python"
  },
  {
    id: 3,
    name: "C++",
    label: "C++",
    value: "cpp",
    valueForCodeEditor: "cpp"
  },
  {
    id: 4,
    name: "C",
    label: "C",
    value: "c",
    valueForCodeEditor: "c"
  },
  {
    id: 5,
    name: "C#",
    label: "C#",
    value: "cs",
    valueForCodeEditor: "csharp"
  },
  {
    id: 6,
    name: "Java",
    label: "Java",
    value: "java",
    valueForCodeEditor: "java"
  }
];
