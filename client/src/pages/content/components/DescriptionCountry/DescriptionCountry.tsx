import { Grid, Typography } from "@material-ui/core";
import React from "react";
import VideoCountry from "../VideoCountry";

const DescriptionCountry: React.FC = React.memo(() => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={5}>
          <div className="counryPage__wrap">
            <img
              src="https://images03.nicepage.io/a1389d7bc73adea1e1c1fb7e/2dafdd6ed7d25c1097f9d794/pexels-photo-5893858.jpeg"
              alt=""
              className="counryPage__img"
            />
          </div>
        </Grid>
        <Grid item md={7}>
          <section className="section">
            <Typography variant="h1" gutterBottom>
              Страна
            </Typography>
            <div className="capital">Столица: Страна</div>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur unde suscipit, quam beatae rerum inventore consectetur,
              neque doloribus, cupiditate numquam dignissimos laborum fugiat
              deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Quos blanditiis tenetur unde
              suscipit, quam beatae rerum inventore consectetur, neque
              doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
              Eum quasi quidem quibusdam. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Quos blanditiis tenetur unde
              suscipit, quam beatae rerum inventore consectetur, neque
              doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
              Eum quasi quidem quibusdam.
            </Typography>
          </section>
          <section className="section mb_0">
            <VideoCountry />
          </section>
        </Grid>
      </Grid>
    </>
  );
});
export default DescriptionCountry;
