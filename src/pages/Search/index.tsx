import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSalesSearchQuery } from "../../api/graphql/queries";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = searchParams.get("query");
    const getSearchResult = async () => {
      try {
        const results = await fetch(
          "https://staging.sparrow.escapes.tech/graphql/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: getSalesSearchQuery,
              variables: {
                query: params,
                offset: page,
              },
            }),
          }
        );
        const result = await results.json();
        if (result.data.saleSearch.sales.length > 0) {
          setData(result.data.saleSearch.sales);
          setPageSize(result.data.saleSearch.resultCount);
        }
        setLoading(false);
      } catch(error) {
        setLoading(false);
        alert("Unable to fetch data");
      }
    };
    getSearchResult();
  }, [page]);

  const navigateToDetailPage = (id: string) => {
    navigate(`/sale/${id}`);
  };

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  return loading ? (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      {data.map((k: any) => {
        return (
          <Box
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Card
              key={k.id}
              sx={{ maxWidth: 345, marginBottom: "12px" }}
              onClick={() => navigateToDetailPage(k.id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={k.photos[0].url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {k.editorial.destinationName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {k.editorial.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        );
      })}
      <Pagination
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        count={pageSize}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};

export default Search;
