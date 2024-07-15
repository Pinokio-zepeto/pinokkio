import React from "react";
import { Router, Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import Menu from "../../../components/kiosk/Menu";

function MenuPage() {
  const navigate = useNavigate();

  const goPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="MenuPage">
      this is menu-page
      <div id="layout-container">
    {localTrack && (
        <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
    )}
    {remoteTracks.map((remoteTrack) =>
        remoteTrack.trackPublication.kind === "video" ? (
            <VideoComponent
                key={remoteTrack.trackPublication.trackSid}
                track={remoteTrack.trackPublication.videoTrack!}
                participantIdentity={remoteTrack.participantIdentity}
            />
        ) : (
            <AudioComponent
                key={remoteTrack.trackPublication.trackSid}
                track={remoteTrack.trackPublication.audioTrack!}
            />
        )
    )}
</div>
      <Menu />
      <Button onClick={goPayment} text="결제" />
    </div>
  );
}

export default MenuPage;
