import { UseFormSetValue } from "react-hook-form";
import { UserEntity } from "../../../types";

export interface FormInputProps {
  name: any;
  control: any;
  label: string;
  disabled?: boolean;
  textFieldName?: string;
  setValue?: UseFormSetValue<IFormInput>;
  nrFacturi?: string[];
  setNrFacturi?: React.Dispatch<React.SetStateAction<string[]>>;
  sume?: string[];
  setSume?: React.Dispatch<React.SetStateAction<string[]>>;
  amount?: number | undefined;
  changeAmount?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user?: UserEntity | undefined;
  setUser?: React.Dispatch<React.SetStateAction<UserEntity | undefined>>;
}

export interface IFormInput {
  textValue: string;
  radioValue: string;
  checkboxValue: string[];
  dateValue: Date;
  dropdownValue: string;
  sliderValue: number;
}
