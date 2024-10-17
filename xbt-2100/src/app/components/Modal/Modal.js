import style from "./Modal.module.css";
import gif from "../../../../public/buyvideo.gif";
import Image from "next/image";
function Modal({ handleEnterClick, isEnterClicked }) {
  return (
    <>
      <div
        className={style.modal_container}
        style={isEnterClicked ? { display: "none" } : { display: "flex" }}
      >
        <div className={style.modal_wrap}>
          <div className={style.modal_header}>
            <div className={style.modal_header_wrap}>
              XBT - 2100 <br />
            </div>
          </div>
          <div className={style.page_enter_page_button}>
            Do you accept the truth?
          </div>
          <div className={style.modal_buttons_container}>
            <button onClick={handleEnterClick}>YES</button>
            <button onClick={handleEnterClick}>NO <p>(YES)</p></button>
          </div>
          <div className={style.modal_gif_container}>
            <Image src={gif} alt="buyvideo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
