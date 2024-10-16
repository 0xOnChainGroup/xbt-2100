import { useEffect, useRef } from "react";
import style from "./Ticker.module.css"
// import vitalikAvtar from "../../../public/assets/img/MEGA_Vitalik_avatar.png";
// import vitalikDance from "../../../public/assets/img/vitalik_dance.webp";
function Ticker() {
  const scrollRef = useRef(null);
  const items = [
    "Important announcement!",
    {
      type: "image",
      src: "/xbt.png",
    },
    "$XBT2100 up to 2100%",
    {
      type: "image",
      src: "/buyvideo.gif",
    },
    "$XBT2100 up to 2100%",
    {
      type: "image",
      src: "/xbt.png",
    },
    "$XBT2100 up to 2100%",
    {
      type: "image",
      src: "/buyvideo.gif",
    },
    "Important announcement!",
    {
      type: "image",
      src: "/xbt.png",
    },
    "$XBT2100 up to 2100%",
    {
      type: "image",
      src: "/buyvideo.gif",
    },
    "Important announcement!",
    {
      type: "image",
      src: "/xbt.png",
    },
    "XBT2100",
    {
      type: "image",
      src: "/buyvideo.gif",
    },
  ];
  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      const totalWidth = scrollElement.scrollWidth / 2;

      // Ajustement pour que l'animation couvre l'intégralité de la largeur du contenu
      const animation = scrollElement.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(-${totalWidth}px)` },
        ],
        {
          duration: totalWidth * 10, // Ajuster la vitesse
          iterations: Infinity,
          easing: "linear",
        }
      );

      return () => animation.cancel();
    }
  }, []);
  return (
    <div className={style.hero_container}>
      <div className={style.hero_ticker}>
        <div ref={scrollRef} className={style.hero_scroll_content}>
          {items.concat(items).map((item, index) => (
            <span key={index} className="inline-block px-4 font-sans">
              {/* <img
                  className={style.hero_ticker_img}
                  src="/assets/img/vitalik-clapping.gif"
                  alt=""
                /> */}
              {typeof item === "string" ? (
                item
              ) : (
                <img
                  className={style.hero_ticker_img}
                  // src="/buyvideo.gif"
                  src={item.src}
                  alt=""
                />
              )}
            </span>
          ))}
        </div>
      </div>
      {/* <div className={style.hero_wrap}>
        <div className={style.hero_first_bloc_container}>
          <div className={style.hero_first_bloc_img_container}>
            <Image src={vitalikAvtar} alt="" />
          </div>
          <div className={style.hero_first_bloc_title_container}>
            Make Ethereum Great Again
          </div>
          <div className={style.hero_first_bloc_address_container}>
            Address: 0x12318f
          </div>
        </div>
        <div className={style.hero_second_bloc_container}>
          <Image src={vitalikDance} alt="Vitalik dance" />
        </div>
      </div> */}
    </div>
  );
}

export default Ticker;
