import CarouselComponent from "nuka-carousel";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import CloudinaryImage from "./CloudinaryImage";
function Carousel({ images, preview }: any) {
  return (
    <CarouselComponent
      className="w-full h-full -z-10"
      defaultControlsConfig={{
        pagingDotsClassName: "mx-1",
      }}
      renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
        <button
          onClick={previousSlide}
          disabled={previousDisabled}
          aria-label="Previous slide"
        >
          {!previousDisabled && (
            <AiFillLeftCircle
              size={25}
              color={previousDisabled ? "grey" : "white"}
            />
          )}
        </button>
      )}
      renderCenterRightControls={({ nextDisabled, nextSlide }) => (
        <button
          onClick={nextSlide}
          disabled={nextDisabled}
          aria-label="Next slide"
        >
          {!nextDisabled && (
            <AiFillRightCircle
              size={25}
              color={nextDisabled ? "grey" : "white"}
            />
          )}
        </button>
      )}
      renderBottomCenterControls={({
        pagingDotsIndices,
        goToSlide,
        currentSlide,
      }) => (
        <ul
          style={{
            display: "flex",
            gap: 10,
            listStyle: "none",
            padding: 0,
          }}
        >
          {pagingDotsIndices.length > 1 &&
            pagingDotsIndices.map((i) => (
              <li key={uuidv4()}>
                <button
                  type="button"
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === i ? "bg-black" : "bg-white"
                  }`}
                ></button>
              </li>
            ))}
        </ul>
      )}
    >
      {preview
        ? images?.map((image: any) => (
            <img key={image} src={image} alt="previewImage" />
          ))
        : images?.map((image: any) => (
            <CloudinaryImage key={image} image={image} />
          ))}
    </CarouselComponent>
  );
}

export default Carousel;
