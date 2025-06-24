import { t } from "i18next";
import SwiperCore from "swiper";
import { useRef, useState, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { Icon } from "../Icon";
import Button from "../Button/Button";

import { EUserType } from "../../types";
import { useUserStore } from "../../store/userStore";

import "swiper/swiper-bundle.css";

type Props = {
  close: () => void;
  userType: EUserType;
};

const Onboarding: FC<Props> = ({ close, userType }) => {
  const setMetadata = useUserStore((state) => state.setMetadata);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const swiperRef = useRef<SwiperCore>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateData =
    userType === EUserType.SELLER
      ? {
          senderOnboarding: true
        }
      : {
          recipientOnboarding: true
        };

  const getActionHandler = () => {
    if (activeSlideIndex !== 2) {
      swiperRef.current?.slideNext();
    } else {
      setMetadata(updateData);
      close();
    }
  };

  return (
    <div className="flex h-full flex-col justify-end">
      <Swiper
        id="onboarding-slider"
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
        allowTouchMove={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        centeredSlides
        speed={300}
        pagination={{ el: ".swiper-pagination" }}
        modules={[Navigation, Pagination]}
        watchSlidesProgress={true}
        className="mx-auto mb-[0px] w-full flex-1"
      >
        {/* Slide #1 */}
        <SwiperSlide className="pt-[8vh]">
          <div ref={contentRef} className="flex flex-col items-center">
            <Icon
              name="onboardingIcon1"
              width={240}
              height={240}
              className="mb-[6vh]"
            />
            <h2 className="custom-container mb-4 text-center text-2xl font-bold">
              {t(`onboarding.slide1.${userType}.title`)}
            </h2>
            <p className="custom-container text-text-secondary text-center">
              {t(`onboarding.slide1.${userType}.description1`)}
              <br />
              {t(`onboarding.slide1.${userType}.description2`)}
            </p>
          </div>
        </SwiperSlide>

        {/* Slide #2 */}
        <SwiperSlide className="pt-[calc(8vh+8px)]">
          <div className="flex flex-col items-center">
            <Icon
              name="onboardingIcon2"
              width={240}
              height={240}
              className="mb-[6vh]"
            />
            <h2 className="custom-container mb-4 text-center text-2xl font-bold">
              {t(`onboarding.slide2.${userType}.title`)}
            </h2>
            <p className="custom-container text-text-secondary text-center">
              {t(`onboarding.slide2.${userType}.description1`)}
              <br />
              {t(`onboarding.slide2.${userType}.description2`)}
            </p>
          </div>
        </SwiperSlide>

        {/* Slide #3 */}
        <SwiperSlide className="pt-[calc(8vh+11px)]">
          <div className="flex flex-col items-center">
            <Icon
              name="onboardingIcon3"
              width={240}
              height={240}
              className="mb-[6vh]"
            />
            <h2 className="custom-container mb-4 text-center text-2xl font-bold">
              {t(`onboarding.slide3.${userType}.title`)}
            </h2>
            <p className="custom-container text-text-secondary text-center">
              {t(`onboarding.slide3.${userType}.description1`)}
              <br />
              {t(`onboarding.slide3.${userType}.description2`)}
            </p>
          </div>
        </SwiperSlide>

        <div
          style={{
            bottom: `calc((100% - 8vh - ${contentRef.current?.clientHeight ?? 0}px)/2)`
          }}
          className="swiper-pagination"
        ></div>
      </Swiper>

      <div className="custom-container primary-button-container">
        <Button actionHandler={getActionHandler}>
          {t(`onboarding.slide${activeSlideIndex + 1}.${userType}.buttonText`)}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
