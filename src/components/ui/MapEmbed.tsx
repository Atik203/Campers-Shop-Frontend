const MapEmbed = () => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
        maxHeight: "700px",
        margin: "auto",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.406242760321!2d90.38027950993701!3d23.87520917849619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5af73f5ecb7%3A0xf53688f0cb4836b8!2sCamper&#39;s%20Gear!5e0!3m2!1sen!2sbd!4v1722425413620!5m2!1sen!2sbd"
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "70%",
        }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
