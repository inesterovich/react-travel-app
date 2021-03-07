import React, { useState } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
  EffectCube,
  Controller,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import russia from "../../../../assets/img/photoGalleryImages/russia.jpg";
import fullscreen from "../../../../assets/img/photoGalleryImages/fullscreen.png";
import "swiper/swiper-bundle.css";
import styles from "./styles.module.css";

const imagesArray = [
  {
    id: "1",
    src: russia,
  },
  {
    id: "2",
    src: russia,
  },
  {
    id: "3",
    src: russia,
  },
  {
    id: "4",
    src: russia,
  },
  {
    id: "5",
    src: russia,
  },
  {
    id: "6",
    src: russia,
  },
];

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
  Thumbs,
  Controller,
]);

const PhotoGallery: React.FC = React.memo(() => {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const handle = useFullScreenHandle();
  return (
    <div className={styles.photoGallery}>
      <div className={styles.swiperContainer}>
        <FullScreen handle={handle}>
          <Swiper
            id="main"
            spaceBetween={1}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // @ts-ignore
            controller={{ control: controlledSwiper }}
            effect="cube"
          >
            {imagesArray.map((item: any) => {
              return (
                <SwiperSlide key={item.id}>
                  <img src={item.src} alt="slider" className={styles.img} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            id="controller"
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            // @ts-ignore
            onSwiper={setControlledSwiper}
            className={styles.galleryThumbs}
          >
            {imagesArray.map((item: any) => {
              return (
                <SwiperSlide key={item.id}>
                  <img
                    src={item.src}
                    alt="slider"
                    className={styles.imgThumbs}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </FullScreen>
      </div>{" "}
      <img
        src={fullscreen}
        alt="fullscreen"
        className={styles.imgFullscreen}
        onClick={handle.enter}
      />
    </div>
  );
});
export default PhotoGallery;
