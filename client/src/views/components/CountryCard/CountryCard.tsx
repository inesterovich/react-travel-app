import React from "react";
import styles from "./styles.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ApartmentIcon from "@material-ui/icons/Apartment";
import Rating from "@material-ui/lab/Rating";
import {Link} from "react-router-dom";
import noImageIcon from "./no-image-icon.png";
import { ICountry } from "../../../types";

const CountryCard: React.FC<ICountry> = ({image, name, description}) => (
    <Card className={styles.Card}>
      <CardActionArea
        component={Link}
        to={`/${name}`}
        className={styles.CardActionArea}
      >
        <CardMedia
          component="img"
          alt={image ? image?.caption : ""}
          height="140"
          image={image ? image?.url : noImageIcon}
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
            {description}...
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
)

export default CountryCard;
