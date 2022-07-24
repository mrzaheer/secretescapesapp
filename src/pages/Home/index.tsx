import { Box } from "@mui/material";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate({
      pathname: "search",
      search: createSearchParams({
        query: searchQuery,
      }).toString(),
    });
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <SearchBar setSearchQuery={setSearchQuery} onSubmit={onSubmit} />
    </Box>
  );
};

export default Home;
