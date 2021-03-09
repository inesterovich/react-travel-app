import styles from "./styles.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ApartmentIcon from "@material-ui/icons/Apartment";
import Rating from "@material-ui/lab/Rating";
import Russia from "./Russia.jpg";
import React from "react";
import {Link} from "react-router-dom";

const CountryCard: React.FC = () => (
  <Card>
    <Link to={"/country"} className={styles.link}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={Russia}
          title="Contemplative Reptile"
        />
        <CardContent className={styles.CardContent}>
          <div className={styles.meta}>
            <Typography className={styles.meta__country} component="h2">
              Россия
            </Typography>
            <div className={styles.meta__city}>
              Москва <ApartmentIcon></ApartmentIcon>
            </div>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            Россия – крупнейшая страна мира, расположенная в Восточной Европе и
            Северной Азии и омываемая водами Тихого и Северного Ледовитого
            океанов. Ландшафт России крайне разнообразен: на ее территории есть и
            тундра, и леса, и субтропические пляжи...
          </Typography>
          <Rating name="read-only" value={3} readOnly size="small" />
        </CardContent>
      </CardActionArea>
    </Link>
  </Card>
);

export default CountryCard;
