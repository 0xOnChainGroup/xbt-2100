function SideBlog() {
    return (
      <tr> {/* Ajoutez un <tr> ici pour envelopper les <td> */}
        <td className="windowbg2">
          <div className="catbg" style={{ padding: "5px 5px 5px 10px" }}>
            <a name="" href="">
              Twitter
            </a>
          </div>
          <b>
            <a href="" name="b1">
              XBT 2100
            </a>
          </b>
          <br />
          General discussion about the Bitcoin ecosystem that doesn't fit better
          elsewhere. News, the Bitcoin community, innovations, the general
          environment, etc. Discussion of specific Bitcoin-related services
          usually belongs in other sections.
          <div style={{ paddingTop: "1px" }} className="smalltext">
            <i>
              Moderator:{" "}
              <a href="" title="Board Moderator">
                Len Sassaman aka 'Satoshi Nakamoto'
              </a>
            </i>
          </div>
        </td>
      </tr>
    );
  }
  
  export default SideBlog;