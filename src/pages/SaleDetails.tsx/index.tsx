import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSaleDetailsQuery } from "../../api/graphql/queries";

const SaleDetails = () => {
  const params = useParams();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSaleDetails = async () => {
      try {
        let results = await fetch(
          "https://staging.sparrow.escapes.tech/graphql/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: getSaleDetailsQuery,
              variables: {
                id: params.id,
              },
            }),
          }
        );
        let result = await results.json();
        setData(result.data.sale);
        setLoading(false);
      } catch (error) {
        alert("Unable to fetch data");
        setLoading(false);
      }
    };
    getSaleDetails();
  }, []);

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.editorial.destinationName}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {data.editorial.title}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={data.photos[0].url}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.editorial.hotelDetails,
                }}
              />
            </Typography>
            <Button variant="outlined" style={{ marginTop: "24px" }}>
              Price {data.prices.leadRate.forDisplay}
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default SaleDetails;
