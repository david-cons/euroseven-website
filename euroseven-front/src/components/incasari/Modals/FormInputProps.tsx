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
  dates?: string[];
  setDates?: React.Dispatch<React.SetStateAction<string[]>>;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFormInput {
  textValue: string;
  userNameValue: string;
  checkboxValue: any[];
  paymentMethodValue: string;
  dropdownValue: string;
}


