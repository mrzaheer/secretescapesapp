import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  onSubmit: () => void;
}

export const SearchBar = ({setSearchQuery, onSubmit}: SearchBarProps) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="search-bar"
        className="text"
        onInput={(event) => {
          setSearchQuery((event.target as HTMLInputElement).value);
        }}
        label="Enter a location"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
};
