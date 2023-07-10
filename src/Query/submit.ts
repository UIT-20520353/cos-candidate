import { IProblem, IResponseSubmission } from "~/types";
import axios from "axios";
import { getTestcaseList, insertSubmission } from "~/Query";
import { ILanguageOption } from "~/constants/languageOptions";

async function compileCode(input: string, language: string, code: string): Promise<IResponseSubmission> {
  const formData = {
    language,
    input,
    code
  };
  const options = {
    method: "POST",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formData
  };

  try {
    return await axios.request<IResponseSubmission, any>(options);
  } catch (err) {
    console.error(err);
    return err as IResponseSubmission;
  }
}

export async function handleSubmit(
  problem: IProblem,
  language: ILanguageOption,
  code: string,
  userId: number,
  problemId: number
): Promise<boolean> {
  try {
    const resultExample = await compileCode(problem.example_input, language.value, code);
    if (resultExample.data.error !== "") {
      return await insertSubmission("Compilation Error", language.label, code, problemId, userId);
    }

    if (resultExample.data.output !== problem.example_output) {
      return await insertSubmission("Wrong Answer", language.label, code, problemId, userId);
    }

    const testcases = await getTestcaseList(problem.id);
    for (const testcase of testcases) {
      const resultTestcase = await compileCode(testcase.input, language.value, code);
      if (resultTestcase.data.error !== "") {
        return await insertSubmission("Compilation Error", language.label, code, problemId, userId);
      }
      if (resultTestcase.data.output !== testcase.output) {
        return await insertSubmission("Wrong Answer", language.label, code, problemId, userId);
      }
    }

    return await insertSubmission("Accepted", language.label, code, problemId, userId);
  } catch (error) {
    console.error("handleSubmit: ", error);
    return false;
  }
}
