import { Box, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar: React.FC<{
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
  forWho: string;
}> = ({ handleSearchInputChange, searchText, forWho }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "15px",
        boxShadow: "0 0 16px -8px black",
        height: "8vh",
        mb: "15px",
        justifyContent: "left",
        alignItems: "left",
        textAlign: "left",
      }}
    >
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder={`Cauta ${forWho}...`}
        sx={{
          height: "5vh",
          mt: "15px",
          ml: "15px",
          width: "40%",
          borderRadius: "20px",
          fontFamily: "Catesque",
        }}
        onInput={handleSearchInputChange}
        value={searchText}
      />
    </Box>
  );
};
