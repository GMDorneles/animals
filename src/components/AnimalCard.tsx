import { Animal } from "@/types/animal/animal";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function AnimalCard(props: Animal) {
  const getImageSrc = (species: string) => {
    return species === "dog" ? "/img/dog.webp" : "/img/cat.webp";
  };

  return (
    <Card>
      <CardMedia
        component="img"
        image={getImageSrc(props?.species)}
        alt="espécie"
      />
      <CardContent
        sx={{
          height: "80px",
          overflow: "hidden",
        }}
      >
        {props?.name && (
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {props.name + ","}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Está a procura de um novo lar.
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions>
        {props?.available && (
          <Button size="small" color="primary">
            Adotar
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
