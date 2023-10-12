import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";
import { GridFilterInputValueProps } from "@mui/x-data-grid";

export const CustomDateInput: React.FC<GridFilterInputValueProps> = (props) => {
  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      props.applyValue({
        ...props.item,
        value: format(newValue, "yyyy-MM-dd"),
      });
    } else {
      props.applyValue({ ...props.item, value: "" });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        format="dd/MM/yyyy"
        value={props.item.value ? new Date(props.item.value) : null}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
};
