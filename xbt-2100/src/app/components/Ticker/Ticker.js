import { useEffect, useRef } from "react";
import style from "./Ticker.module.css";
// import vitalikAvtar from "../../../public/assets/img/MEGA_Vitalik_avatar.png";
// import vitalikDance from "../../../public/assets/img/vitalik_dance.webp";
function Ticker() {
  const scrollRef = useRef(null);
  const items = [
    "$BTC -99%",
    {
      type: "image",
      src: "/inithforthetech.png",
    },
    "$XBT +2100%",
    {
      type: "image",
      src: "/buyvideo.gif",
    },
    "$XBT +2100%",
    {
      type: "image",
      src: "/shrek.png",
    },
    "$XBT +2100%",
    {
      type: "image",
      src: "/buyvideo.gif",
    },
    "$ETH -147%",
    {
      type: "image",
      src: "/inithforthetech.png",
    },
    "$XBT +2100%",
    {
      type: "image",
      src: "/pokemon-card.png",
    },
    "$MTGOX +0.21%",
    {
      type: "image",
      src: "/xbt.png",
    },
    "$ETH -147%",
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
            <span key={index} className="">
              {typeof item === "string" ? (
                <div className={style.hero_written_container}>
                  <div style={{ color: item.includes("+") ? "green" : item.includes("-") ? "red" : "white" }}>
                    {item}
                  </div>
                </div>
              ) : (
                <img
                  className={style.hero_ticker_img}
                  src={item.src}
                  alt=""
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticker;
