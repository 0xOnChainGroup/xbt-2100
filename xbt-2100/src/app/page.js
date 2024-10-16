"use client";
import Modal from "./components/Modal/Modal";
import styles from "./page.module.css";
import { useState, useRef, useEffect } from "react";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import Bitcoinlogo from "../../public/firstbitcoinlogo.png";
import { useCustomCursor } from "../../hooks/useCustomCursor";
import Image from "next/image";
import Ticker from "./components/Ticker/Ticker";
import SideBlog from "./components/SideBlog/SideBlog";
export default function Home() {
  const [isEnterClicked, setIsEnterClicked] = useState();
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isMuteClicked, setIsMuteClicked] = useState();
  const [volume, setVolume] = useState(0.25); 
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const socialsRef = useRef(null);
  const audioRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const { positions } = useCustomCursor();
  const videoRef = useRef(null);
  function handleEnterClick() {
    setIsEnterClicked(true);
  }
  const togglePlayPause = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };
  function handleMuteClick() {
    setIsMuteClicked(!isMuteClicked);
  }
  function handleInputClick() {
    setIsInputClicked(!isInputClicked);
  }
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setIsInputClicked(false);
    }
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - socialsRef.current.getBoundingClientRect().left,
      y: e.clientY - socialsRef.current.getBoundingClientRect().top,
    });
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      socialsRef.current.style.left = `${newX}px`;
      socialsRef.current.style.top = `${newY}px`;
      socialsRef.current.style.position = "fixed";
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume; // Appliquer le volume à la vidéo
    }
  };
  useEffect(() => {
    if (isEnterClicked && videoRef.current) {
      videoRef.current.play();
      videoRef.current.volume = volume;
    }
    if (isEnterClicked) {
      document.body.style.overflow = "scroll";
    }
  }, [isEnterClicked, volume]);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Modal
        handleEnterClick={handleEnterClick}
        isEnterClicked={isEnterClicked}
      />
      <div
        style={isEnterClicked ? { overflow: "scroll" } : { overflow: "hidden" }}
        className={styles.page}
        onClick={togglePlayPause}
      >
        <div className="tborder">
          <table
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            border="0"
            id="smfheader"
          >
            <thead>
              <tr>
                <td className="catbg" height="32">
                  <span
                    style={{
                      fontFamily: "Verdana, sans-serif",
                      fontSize: "140%",
                    }}
                  >
                    <img
                      style={{ height: "105px" }}
                      src="/xbt-sticker.png"
                      alt=""
                    />
                    {/* XBT - 2100 */}
                  </span>
                </td>
                <td className="catbg">
                  <div
                    ref={socialsRef}
                    onMouseDown={handleMouseDown}
                    style={{ cursor: "move" }}
                    className="socials-container shake"
                  >
                    <div className="socials-wrap">
                      <div className="socials-title">XBT Socials</div>
                      <button className="socials-button"></button>
                    </div>
                    <div className="socials-content-container">
                      <div
                        onClick={() =>
                          window.open("https://x.com/xbt2100", "_blank")
                        }
                        className="socials-list-item"
                      >
                        <img src="/directory.png" alt="" />
                        <div>Twitter</div>
                      </div>
                      <div
                        onClick={() =>
                          window.open("http://t.me/XBT2100Portal", "blank")
                        }
                        className="socials-list-item"
                      >
                        <img src="/directory.png" alt="" />
                        <div>Telegram</div>
                      </div>
                      <div
                        onClick={() =>
                          window.open("https://dexscreener.com/ethereum/0x303897828FBbce53FdDa62CAeC5F516686d97104", "blank")
                        }
                        className="socials-list-item"
                      >
                        <img src="/directory.png" alt="" />
                        <div>Dexscreener</div>
                      </div>
                    </div>

                    <div className="socials-buy-button-container">
                      <div
                        onClick={() => window.open("https://app.uniswap.org/swap?outputCurrency=0x303897828FBbce53FdDa62CAeC5F516686d97104&chain=ethereum")}
                        className="socials-buy-button"
                      >
                        <p>BUY</p>
                      </div>
                    </div>
                  </div>
                </td>

                

                <td className="catbg">
                  <div
                    onClick={handleMuteClick}
                    className="mute-button-container"
                  >
                    {isMuteClicked ? (
                      <>
                      <img src="sound-off.png" alt="mute sound" />
                      </>
                    ) : (
                      <>
                        <img src="sound-on.png" alt="mute sound" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </thead>
          </table>
          <table
            id="upshrinkHeader2"
            width="100%"
            cellPadding="4"
            cellSpacing="0"
            border="0"
          >
            <thead>
              <tr>
                <td width="90%" className="titlebg2">
                  <span className="smalltext">
                    <b>News</b>: Latest XBT2100 Core release:{" "}
                    <a
                      className="ul"
                      href=""
                    >
                      <b>28.0</b>
                    </a>{" "}
                    [
                    <a
                      className="ul"
                      href=""
                    >
                      Torrent
                    </a>
                    ]
                  </span>
                </td>
                <td
                  className="titlebg2"
                  align="right"
                  nowrap="nowrap"
                  valign="top"
                >
                  <form
                    action="https://bitcointalk.org/index.php?action=search2"
                    method="post"
                    acceptCharset="ISO-8859-1"
                    style={{ margin: 0 }}
                  >
                    <a href="https://bitcointalk.org/index.php?action=search;advanced">
                      <img
                        src="https://bitcointalk.org/Themes/custom1/images/filter.gif"
                        align="middle"
                        style={{ margin: "0 1ex" }}
                        alt=""
                      />
                    </a>
                    <div className="input-container">
                      <div className="input-wrap">
                        <input
                          id="main-input"
                          ref={inputRef}
                          readOnly
                          type="text"
                          name="search"
                          // value=""
                          defaultValue="0x303897828FBbce53FdDa62CAeC5F516686d97104"
                          style={{ width: "230px", padding:"5px" }}
                          onClick={handleInputClick}
                        />
                        {isInputClicked && (
                          <div
                            ref={dropdownRef}
                            onClick={() =>
                              window.open(
                                "https://dexscreener.com/ethereum/0x303897828FBbce53FdDa62CAeC5F516686d97104",
                                "_blank"
                              )
                            }
                            className="input-dropdown"
                          >
                            <span className="input-message">Buy $XBT mfer</span>
                            <img src="/dollar.gif" alt="dollar" />
                          </div>
                        )}
                      </div>
                    </div>
                    &nbsp;
                    <button onClick={(e) => e.preventDefault()}>Search</button>
                    <input readOnly type="hidden" name="advanced" value="" />
                  </form>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <table
          cellPadding="0"
          cellSpacing="0"
          border="0"
          style={{ marginLeft: "10px" }}
        >
          <thead>
            <tr>
              <td className="maintab_first">&nbsp;</td>
              <td className="maintab_active_first">&nbsp;</td>
              <td valign="top" className="maintab_active_back">
                <a href="https://bitcointalk.org/index.php">Home</a>
              </td>
              <td className="maintab_active_last">&nbsp;</td>
              <td valign="top" className="maintab_back">
                <a href="https://bitcointalk.org/index.php?action=help">Help</a>
              </td>
              <td valign="top" className="maintab_back">
                <a href="https://bitcointalk.org/index.php?action=search">
                  Search
                </a>
              </td>
              <td valign="top" className="maintab_back">
                <a href="https://bitcointalk.org/index.php?action=login">
                  Login
                </a>
              </td>
              <td valign="top" className="maintab_back">
                <a href="https://bitcointalk.org/index.php?action=register">
                  Register
                </a>
              </td>
              <td valign="top" className="maintab_back">
                <a href="/more.php">More</a>
              </td>
              <td className="maintab_last">&nbsp;</td>
            </tr>
          </thead>
        </table>
        <div className="video-container">
          {/* <div className="hero-left-column-container">
            <div className="hero-left-column-top">
              <SideBlog />
            </div>
            <div className="hero-left-column-bottom">
              <SideBlog />
            </div>
          </div> */}
          <video
            ref={videoRef}
            autoPlay={false}
            muted={isMuteClicked}
            loop
            preload="auto"
            playsInline
            src="we_are_so_fucking_back.mov"
          ></video>
          
          </div>
          {/* <div className="hero-right-column-container">
            <div className="hero-right-column-top">
              <SideBlog />
            </div>
            <div className="hero-right-column-bottom">
              <SideBlog />
            </div>
          </div> */}
        </div>
        {/* <div className="sideblog-container-responsive">
          <SideBlog />
          <SideBlog />
          <SideBlog />
        </div> */}
        <div className="volume-control">
            <label htmlFor="volume">Volume:</label>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
        <Ticker />
        <div id="bodyarea" style={{ padding: "1ex 0px 2ex 0px" }}>
          <table width="100%" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <td valign="bottom">
                  <div
                    className="nav"
                    style={{
                      fontSize: "smaller",
                      marginBottom: "2ex",
                      marginTop: "2ex",
                    }}
                  >
                    <b>
                      <a href="" className="nav">
                        XBT 2100
                      </a>
                    </b>
                  </div>
                </td>
                <td align="right"></td>
              </tr>
            </thead>
          </table>
          <div className="tborder" style={{ marginTop: 0 }}>
            <div className="catbg" style={{ padding: "5px 5px 5px 10px" }}>
              <a name="" href="">
                Token
              </a>
            </div>
            <table
              border="0"
              width="100%"
              cellSpacing="1"
              cellPadding="5"
              className="bordercolor"
              style={{ marginTop: "1px" }}
            >
              <thead>
                <tr>
                  <td
                    rowSpan="2"
                    className="windowbg"
                    width="6%"
                    align="center"
                    valign="top"
                  >
                    <a href="">
                      <img
                        src="https://bitcointalk.org/Themes/custom1/images/off.gif"
                        alt="No New Posts"
                        title="No New Posts"
                      />
                    </a>
                  </td>
                  <td className="windowbg2">
                    <b>
                      <a href="" name="b1">
                        XBT 2100
                      </a>
                    </b>
                    <br />
                    General discussion about the Bitcoin ecosystem that doesn't
                    fit better elsewhere. News, the Bitcoin community,
                    innovations, the general environment, etc. Discussion of
                    specific Bitcoin-related services usually belongs in other
                    sections.
                    <div style={{ paddingTop: "1px" }} className="smalltext">
                      <i>
                        Moderator:{" "}
                        <a href="" title="Board Moderator">
                          Len Sassaman aka 'Satoshi Nakamoto'
                        </a>
                      </i>
                    </div>
                  </td>
                  <td
                    className="windowbg"
                    valign="middle"
                    align="center"
                    style={{ width: "12ex" }}
                  >
                    <span className="smalltext">
                      2668330 Posts <br />
                      101769 Topics
                    </span>
                  </td>
                  <td className="windowbg2" valign="middle" width="22%">
                    <span className="smalltext">
                      <b>Last post</b> by <a href="">tranthidung</a>
                      <br />
                      in{" "}
                      <a
                        href=""
                        title="Re: Hiccups that can occur during Bitcoin investments."
                      >
                        Re: Hiccups that can occ...
                      </a>
                      <br />
                      on <b>Today</b> at 02:35:19 PM
                    </span>
                  </td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td colSpan="3" className="windowbg3">
                    <span className="smalltext">
                      <b>Child Boards</b>:{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 2844, Posts: 62625)"
                      >
                        Legal
                      </a>
                      ,{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 35087, Posts: 127920)"
                      >
                        Press
                      </a>
                      ,{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 1891, Posts: 13013)"
                      >
                        Meetups
                      </a>
                      ,{" "}
                      <a href="" title="No New Posts (Topics: 54, Posts: 129)">
                        Important Announcements
                      </a>
                    </span>
                  </td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td
                    rowSpan="2"
                    className="windowbg"
                    width="6%"
                    align="center"
                    valign="top"
                  >
                    <a href="">
                      <img
                        src="https://bitcointalk.org/Themes/custom1/images/off.gif"
                        alt="No New Posts"
                        title="No New Posts"
                      />
                    </a>
                  </td>
                  <td className="windowbg2">
                    <b>
                      <a href="" name="b6">
                        MT Gox announce 2100 listing soon!
                      </a>
                    </b>
                    <br />
                    One of the strongest and most reliable crypto exchange
                    announced in presence of Donald Trump, they will list $XBT.
                    <div style={{ paddingTop: "1px" }} className="smalltext">
                      <i>
                        Moderators:{" "}
                        <a href="" title="Board Moderator">
                          Karpelès
                        </a>
                        ,{" "}
                        <a href="" title="Board Moderator">
                          Trump
                        </a>
                      </i>
                    </div>
                  </td>
                  <td
                    className="windowbg"
                    valign="middle"
                    align="center"
                    style={{ width: "12ex" }}
                  >
                    <span className="smalltext">
                      340955 Posts <br />
                      25898 Topics
                    </span>
                  </td>
                  <td className="windowbg2" valign="middle" width="22%">
                    <span className="smalltext">
                      <b>Last post</b> by <a href="">rionika</a>
                      <br />
                      in{" "}
                      <a href="" title="Re: AboutFull rbf ">
                        Re: AboutFull rbf{" "}
                      </a>
                      <br />
                      on <b>February 7th 2014</b> at 12:48:29 PM
                    </span>
                  </td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td colSpan="3" className="windowbg3">
                    <span className="smalltext">
                      <b>Child Boards</b>:{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 12290, Posts: 153355)"
                      >
                        Wallet software
                      </a>
                    </span>
                  </td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td
                    rowSpan="2"
                    className="windowbg"
                    width="6%"
                    align="center"
                    valign="top"
                  >
                    <a href="">
                      <img
                        src="https://bitcointalk.org/Themes/custom1/images/off.gif"
                        alt="No New Posts"
                        title="No New Posts"
                      />
                    </a>
                  </td>
                  <td className="windowbg2">
                    <b>
                      <a href="" name="b14">
                        $XBT legal tender in USA?? Gary gensler
                      </a>
                    </b>
                    <br />
                    Generating bitcoins.
                    <div style={{ paddingTop: "1px" }} className="smalltext">
                      <i>
                        Moderators:{" "}
                        <a href="" title="Board Moderator">
                          FED, SEC
                        </a>
                      </i>
                    </div>
                  </td>
                  <td
                    className="windowbg"
                    valign="middle"
                    align="center"
                    style={{ width: "12ex" }}
                  >
                    <span className="smalltext">
                      965466 Posts <br />
                      27612 Topics
                    </span>
                  </td>
                  <td className="windowbg2" valign="middle" width="22%">
                    <span className="smalltext">
                      <b>Last post</b> by <a href="">_oh_no_stop_this_</a>
                      <br />
                      in{" "}
                      <a href="" title="Re: Discovering Kyrgyzstan">
                        Re: Discovering Kyrgyzst...
                      </a>
                      <br />
                      on <b>Today</b> at 01:24:14 PM
                    </span>
                  </td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td colSpan="3" className="windowbg3">
                    <span className="smalltext">
                      <b>Child Boards</b>:{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 7430, Posts: 60511)"
                      >
                        Mining support
                      </a>
                      ,{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 2085, Posts: 213971)"
                      >
                        Pools
                      </a>
                      ,{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 1640, Posts: 61324)"
                      >
                        Mining software (miners)
                      </a>
                      ,{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 6826, Posts: 467712)"
                      >
                        Hardware
                      </a>
                      ,{" "}
                      <a
                        href=""
                        title="No New Posts (Topics: 3781, Posts: 76520)"
                      >
                        Mining speculation
                      </a>
                    </span>
                  </td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td
                    className="windowbg"
                    width="6%"
                    align="center"
                    valign="top"
                  >
                    <a href="">
                      <img
                        src="https://bitcointalk.org/Themes/custom1/images/off.gif"
                        alt="No New Posts"
                        title="No New Posts"
                      />
                    </a>
                  </td>
                  <td className="windowbg2">
                    <b>
                      <a href="" name="b12">
                        Project Development
                      </a>
                    </b>
                    <br />
                    Organization of Bitcoin and related projects, bounty
                    campaigns, advertising etc.
                  </td>
                  <td
                    className="windowbg"
                    valign="middle"
                    align="center"
                    style={{ width: "12ex" }}
                  >
                    <span className="smalltext">
                      186874 Posts <br />
                      16120 Topics
                    </span>
                  </td>
                  <td className="windowbg2" valign="middle" width="22%">
                    <span className="smalltext">
                      <b>Last post</b> by <a href="">CryptoSwapTraiding</a>
                      <br />
                      in{" "}
                      <a
                        href=""
                        title="We are recruiting staff for the Swap Trading team"
                      >
                        We are recruiting staff ...
                      </a>
                      <br />
                      on <b>Today</b> at 11:28:51 AM
                    </span>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <br />
          <div className="tborder">
            <div
              className="catbg"
              style={{
                padding: "6px",
                verticalAlign: "middle",
                textAlign: "center",
              }}
            >
              <a
                href="#"
                // onClick="shrinkHeaderIC(!current_header_ic); return false;"
              >
                <img
                  id="upshrink_ic"
                  src="https://bitcointalk.org/Themes/custom1/images/collapse.gif"
                  alt="*"
                  title="Shrink or expand the header."
                  style={{ marginRight: "2ex" }}
                  align="right"
                />
              </a>
              Bitcoin Forum - Info Center
            </div>
            <div id="upshrinkHeaderIC">
              <table
                border="0"
                width="100%"
                cellSpacing="1"
                cellPadding="4"
                className="bordercolor"
              >
                <thead>
                  <tr>
                    <td className="titlebg" colSpan="2">
                      Recent Posts
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <td
                      className="windowbg"
                      width="20"
                      valign="middle"
                      align="center"
                    >
                      <a href="">
                        <img
                          src="https://bitcointalk.org/Themes/custom1/images/post/xx.gif"
                          alt="Recent Posts"
                        />
                      </a>
                    </td>
                    <td className="windowbg2">
                      <table
                        cellPadding="0"
                        cellSpacing="0"
                        width="100%"
                        border="0"
                      >
                        <thead>
                          <tr>
                            <td className="middletext" valign="top">
                              <b>
                                <a href="">
                                  Re: &#128373;&#127995;&#8205;&#9794;&#65039;
                                  [BOUNTY DETECTIVE] &#128309; Neuton - 1500
                                  USDT REWARD POOL&#128309;
                                </a>
                              </b>{" "}
                              by{" "}
                              <a href="">
                                Herison77
                              </a>{" "}
                              (
                              <a href="">
                                Bounties (Altcoins)
                              </a>
                              )
                            </td>
                            <td
                              className="middletext"
                              align="right"
                              valign="top"
                              nowrap="nowrap"
                            >
                              <b>Today</b> at 02:32:29 PM
                            </td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <td className="middletext" valign="top">
                              <b>
                                <a href="">
                                  Re: Curiosity made me ask.
                                </a>
                              </b>{" "}
                              by{" "}
                              <a href="">
                                Apocollapse
                              </a>{" "}
                              (
                              <a href="">
                                Speculation
                              </a>
                              )
                            </td>
                            <td
                              className="middletext"
                              align="right"
                              valign="top"
                              nowrap="nowrap"
                            >
                              <b>Today</b> at 02:32:23 PM
                            </td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <td className="middletext" valign="top">
                              <b>
                                <a href="">
                                  Re: League and Domestic Cricket discussion{" "}
                                </a>
                              </b>{" "}
                              by{" "}
                              <a href="">
                                Nalain420
                              </a>{" "}
                              (
                              <a href="">
                                Gambling discussion
                              </a>
                              )
                            </td>
                            <td
                              className="middletext"
                              align="right"
                              valign="top"
                              nowrap="nowrap"
                            >
                              <b>Today</b> at 02:31:46 PM
                            </td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <td className="middletext" valign="top">
                              <b>
                                <a href="">
                                  Re: Why gambling beginners must not joke with
                                  casino announcement{" "}
                                </a>
                              </b>{" "}
                              by{" "}
                              <a href="">
                                vs2014
                              </a>{" "}
                              (
                              <a href="">
                                Gambling discussion
                              </a>
                              )
                            </td>
                            <td
                              className="middletext"
                              align="right"
                              valign="top"
                              nowrap="nowrap"
                            >
                              <b>Today</b> at 02:31:26 PM
                            </td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <td className="middletext" valign="top">
                              <b>
                                <a href="">Re: Betplays.com scam casino</a>
                              </b>{" "}
                              by <a href="">Betesports</a> (
                              <a href="">Scam Accusations</a>)
                            </td>
                            <td
                              className="middletext"
                              align="right"
                              valign="top"
                              nowrap="nowrap"
                            >
                              <b>Today</b> at 02:31:26 PM
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <td className="titlebg" colSpan="2">
                      Forum Stats
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <td
                      className="windowbg"
                      width="20"
                      valign="middle"
                      align="center"
                    >
                      <a href="">
                        <img
                          src="https://bitcointalk.org/Themes/custom1/images/icons/info.gif"
                          alt="Forum Stats"
                        />
                      </a>
                    </td>
                    <td className="windowbg2" width="100%">
                      <span className="middletext">
                        64594159 Posts in 1392561 Topics by 3644303 Members.
                        Latest Member:{" "}
                        <b>
                          {" "}
                          <a href="">Rdavis2478</a>
                        </b>
                        <br /> Latest Post:{" "}
                        <b>
                          &quot;
                          <a
                            href=""
                            title="Re:  &#128293; CLOUDBLAST.IO / AMD Epyc VPS &#9729;&#65039; 10 Gbps&#9729;&#65039; DDoS Protection &#9729;&#65039; Hourly Billing"
                          >
                            Re: &#128293; CLOUDBLAST.IO / A...
                          </a>
                          &quot;
                        </b>{" "}
                        ( <b>Today</b> at 02:35:28 PM )<br />
                        <a href="">View the most recent posts on the forum.</a>
                        <br />
                        <a href="">[More Stats]</a>
                      </span>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        <script type="text/javascript"></script>

        <div
          id="footerarea"
          style={{ textAlign: "center", paddingBottom: "1ex" }}
        >
          <table
            cellSpacing="0"
            cellPadding="3"
            border="0"
            align="center"
            width="100%"
          >
            <thead>
              <tr>
                <td width="28%" valign="middle" align="right">
                  <a href="" target="_blank">
                    <img
                      id="powered-mysql"
                      src="https://bitcointalk.org/Themes/custom1/images/powered-mysql.gif"
                      alt="Powered by MySQL"
                      width="54"
                      height="20"
                      style={{ margin: "5px 16px" }}
                      //   onmouseover="smfFooterHighlight(this, true);"
                      //   onmouseout="smfFooterHighlight(this, false);"
                    />
                  </a>
                  <a href="" target="_blank">
                    <img
                      id="powered-php"
                      src="https://bitcointalk.org/Themes/custom1/images/powered-php.gif"
                      alt="Powered by PHP"
                      width="54"
                      height="20"
                      style={{ margin: "5px 16px" }}
                      //   onmouseover="smfFooterHighlight(this, true);"
                      //   onmouseout="smfFooterHighlight(this, false);"
                    />
                  </a>
                </td>
                <td
                  valign="middle"
                  align="center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span
                    className="smalltext"
                    style={{
                      display: "inline",
                      visibility: "visible",
                      fontFamily: "Verdana, Arial, sans-serif",
                    }}
                  >
                    <a
                      href=""
                      title="Simple Machines Forum"
                      target="_blank"
                    >
                      Powered by SMF 1.1.19
                    </a>{" "}
                    |
                    <a
                      href=""
                      title="Free Forum Software"
                      target="_blank"
                    >
                      SMF &copy; 2006-2009, Simple Machines
                    </a>
                  </span>
                </td>
                <td width="28%" valign="middle" align="left">
                  <a href="" target="_blank">
                    <img
                      id="valid-xhtml10"
                      src="https://bitcointalk.org/Themes/custom1/images/valid-xhtml10.gif"
                      alt="Valid XHTML 1.0!"
                      width="54"
                      height="20"
                      style={{ margin: "5px 16px;" }}
                      //   onmouseover="smfFooterHighlight(this, true);"
                      //   onmouseout="smfFooterHighlight(this, false);"
                    />
                  </a>
                  <a href="" target="_blank">
                    <img
                      id="valid-css"
                      src="https://bitcointalk.org/Themes/custom1/images/valid-css.gif"
                      alt="Valid CSS!"
                      width="54"
                      height="20"
                      style={{ margin: "5px 16px;" }}
                      //   onmouseover="smfFooterHighlight(this, true);"
                      //   onmouseout="smfFooterHighlight(this, false);"
                    />
                  </a>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {positions.map((pos) => (
        <Image
          key={pos.id}
          src={Bitcoinlogo}
          alt="Trail of cursor"
          className={`falling-image ${pos.type}-${pos.direction}`}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            "--rand": pos.rand,
            "--rand-x": pos.randX,
            "--rand-y": pos.randY,
          }}
        />
      ))}
      <MediaPlayer audioRef={audioRef} togglePlayPause={togglePlayPause} />
    </>
  );
}
