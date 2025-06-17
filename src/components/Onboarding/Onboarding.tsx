import { useRef, useState, type FC } from "react"
import "swiper/swiper-bundle.css"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { PrimaryButton } from "../Buttons/PrimaryButton"
import { Icon } from "../Icon"
import { t } from "i18next"
import type { EUserType } from "../../types"

type Props = {
    close: () => void;
    userType: EUserType;
}

const Onboarding: FC<Props> = ({ close, userType }) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

    const swiperRef = useRef<SwiperCore>(null);

    const getActionHandler = () => {
        if (activeSlideIndex !== 2) {
            swiperRef.current?.slideNext();
        } else {
            close();
        }
    }

    return <div className="flex flex-col justify-end h-full">
        <Swiper
            id="onboarding-slider"
            slidesPerView={1}
            onSlideChange={swiper => setActiveSlideIndex(swiper.activeIndex)}
            allowTouchMove={true}
            onBeforeInit={swiper => {
                swiperRef.current = swiper;
            }}
            centeredSlides
            speed={300}
            pagination={{ el: ".swiper-pagination" }}
            modules={[Navigation, Pagination]}
            watchSlidesProgress={true}
            className="mx-auto w-full flex-1 mb-[0px]"
        >

            {/* Slide #1 */}
            <SwiperSlide className="pt-[8vh]">
                <div className="flex flex-col items-center">
                    <Icon name="onboardingIcon1" width={301} height={301} className="mb-[6vh]" />
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        {t(`onboarding.slide1.${userType}.title`)}
                    </h2>
                    <p className="text-text-secondary text-center">
                        {t(`onboarding.slide1.${userType}.description1`)}
                        <br />
                        {t(`onboarding.slide1.${userType}.description2`)}
                    </p>
                </div>
            </SwiperSlide>

            {/* Slide #2 */}
            <SwiperSlide className="pt-[calc(8vh+8px)]">
                <div className="flex flex-col items-center">
                    <Icon name="onboardingIcon2" width={301} height={301} className="mb-[6vh]" />
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        {t(`onboarding.slide2.${userType}.title`)}
                    </h2>
                    <p className="text-text-secondary text-center">
                        {t(`onboarding.slide2.${userType}.description1`)}
                        <br />
                        {t(`onboarding.slide2.${userType}.description2`)}
                    </p>
                </div>
            </SwiperSlide>

            {/* Slide #3 */}
            <SwiperSlide className="pt-[calc(8vh+11px)]">
                <div className="flex flex-col items-center">
                    <Icon name="onboardingIcon3" width={301} height={301} className="mb-[6vh]" />
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        {t(`onboarding.slide3.${userType}.title`)}
                    </h2>
                    <p className="text-text-secondary text-center">
                        {t(`onboarding.slide3.${userType}.description1`)}
                        <br />
                        {t(`onboarding.slide3.${userType}.description2`)}
                    </p>
                </div>
            </SwiperSlide>

            <div
                className="swiper-pagination"
            >
            </div>
        </Swiper>

        <div className="custom-container fixed bottom-7 left-1/2 -translate-x-1/2">
            <PrimaryButton actionHandler={getActionHandler}>{t(`onboarding.slide${activeSlideIndex + 1}.${userType}.buttonText`)}</PrimaryButton>
        </div>
    </div>
};

export default Onboarding;