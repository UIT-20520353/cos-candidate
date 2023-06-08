import Select from "react-select";
import { ILanguageOption, languageOptions } from "../../constants/languageOptions";
import { customStyles } from "../../constants/customStyles";

type IProps = {
  onSelectChange: (sl: ILanguageOption) => void;
};
type ValueType<OptionType> = OptionType | OptionType[] | null | undefined;
function LanguagesDropdown(props: IProps) {
  const handleLanguageChange = (selectedOption: ValueType<ILanguageOption>) => {
    const selectedLanguages = selectedOption as ILanguageOption[];
    props.onSelectChange(selectedLanguages);
  };

  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => handleLanguageChange(selectedOption)}
    />
  );
}

export default LanguagesDropdown;
