import React, { useState, useEffect, useCallback } from "react";
import ReactBnbGallery from "react-bnb-gallery";
import "react-bnb-gallery/dist/style.css";
import { useSelector } from "react-redux";
import { CurrentCountry, CurrentCountryLang } from "../../../../types";
import { RootState } from "../../../../redux/rootReducer";
import { Swiper, SwiperSlide } from "swiper/react";
import fullscreen from "../../../../assets/img/fullscreen.png";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCube,
} from "swiper";
import "swiper/swiper-bundle.css";
import styles from "./styles.module.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCube]);
enum Lang {
  Ru = "ru",
  Es = "es",
  En = "en",
}

type State = {
  countries: {
    currentCountry: CurrentCountry;
    attractions: [];
  };
};

const PhotoGallery: React.FC = React.memo(() => {
  const currentCountry = useSelector((state: State) => {
    return state.countries.currentCountry || [];
  });

  const currentLanguage = useSelector(
    (state: RootState) => state.countries.currentLanguage
  );

  const [
    countryLangData,
    setCountryLangData,
  ] = useState<CurrentCountryLang | null>(null);

  useEffect(() => {
    setCountryLangData(currentCountry[currentLanguage as Lang]);
  }, [currentCountry, currentLanguage]);

  const [images, setImages] = useState([]);
  const [galleryOpened, setGalleryOpened] = useState(false);

  const toggleGallery = useCallback(() => {
    setGalleryOpened(!galleryOpened);
  }, [galleryOpened]);

  useEffect(() => {
    if (countryLangData?.attractions) {
      const imagesSlider = countryLangData?.attractions.reduce(
        (acc: any, item) => {
          return (acc = [
            ...acc,
            { photo: item.url, caption: item.name, thumbnail: item.url },
          ]);
        },
        []
      );

      setImages(imagesSlider);
    }
  }, [countryLangData]);

  return (
    <div className={styles.photoGallery}>
      <div className={styles.swiperContainer}>
        <Swiper
          id="main"
          spaceBetween={1}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {countryLangData?.attractions?.map((item: any) => {
            return (
              <SwiperSlide key={item._id}>
                <img src={item.url} alt="slider" className={styles.img} />
                <p className={styles.textImg}>{item.name}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {images.length && (
          <ReactBnbGallery
            photos={images}
            show={galleryOpened}
            onClose={toggleGallery}
          />
        )}
      </div>
      <img
        src={fullscreen}
        alt="fullscreen"
        className={styles.imgFullscreen}
        onClick={toggleGallery}
      />
    </div>
  );
});
export default PhotoGallery;
