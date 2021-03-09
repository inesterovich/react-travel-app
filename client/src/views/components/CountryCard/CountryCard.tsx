import styles from "./styles.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ApartmentIcon from "@material-ui/icons/Apartment";
import Rating from "@material-ui/lab/Rating";
import Russia from "./Russia.jpg";
import { ICountry } from "../../../types";

const CountryCard: React.FC<ICountry> = ({ name, snippet }) => {
  return (
    <Card className={styles.Card}>
      <CardActionArea href="/country" className={styles.CardActionArea}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={Russia}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={styles.card_title} component="h2" gutterBottom>
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={styles.card__snippet}
            component="p"
          >
            {snippet}...
          </Typography>
          <div className={styles.meta}>
            <Rating
              name="read-only"
              value={3}
              readOnly
              size="small"
              className={styles.meta__rating}
            />
            <div className={styles.meta__city}>
              Столица <ApartmentIcon></ApartmentIcon>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
