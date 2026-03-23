import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./Carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image_prev from "assets/icons/arrow_prev.webp";
import image_next from "assets/icons/arrow_next.webp";
import CardList from "./CardList";
import Loading from "components/common/Loading";
import ListSkeleton from "./Skeleton";

function Carousel({ slideItems, isLoading }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = slideItems.length;

  const settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 2,
    draggable: true,
    nextArrow: (
      <NextArrow
        currentSlide={currentSlide}
        slideItems={slideItems}
        length={length}
      />
    ),
    prevArrow: <PrevArrow currentSlide={currentSlide} />,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <Slider {...settings} className={styles.slider}>
          {slideItems?.map((item) => (
            <CardList key={item.id} slideItems={item} />
          ))}
        </Slider>
      )}
    </div>
  );
}

function NextArrow({ custom, styles, onClick, currentSlide, length }) {
  return (
    <div
      className={custom}
      style={{
        ...styles,
        display: "block",
        width: "40px",
        height: "40px",
        right: "-1130px",
        top: "-150px",
        borderRadius: "50%",
        position: "relative",
        visibility:
          length > 4 && currentSlide + 4 < length ? "visible" : "hidden",
      }}
      onClick={onClick}
    >
      <img
        src={image_next}
        alt="Next Arrow"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
function PrevArrow(props) {
  const { custom, styles, onClick, currentSlide } = props;

  return (
    <div
      className={custom}
      style={{
        ...styles,
        display: "block",
        width: "40px",
        height: "40px",
        left: "-30px",
        top: "150px",
        borderRadius: "50%",
        position: "relative",
        zIndex: "3",
        visibility: currentSlide === 0 ? "hidden" : "visible",
      }}
      onClick={() => {
        if (currentSlide !== 0) onClick();
      }}
    >
      <img
        src={image_prev}
        alt="Previous Arrow"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default Carousel;
