import React, { useState, useEffect, useRef } from "react";
import { CiMobile3 } from "react-icons/ci";
import { GrPersonalComputer } from "react-icons/gr";
import { MdTabletMac } from "react-icons/md";

const DeviceRenderer = ({
  device,
  url = "https://example.com",
  scale,
  onResize,
}) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const containerRef = useRef(null); // Ref to capture the device container dimensions

  useEffect(() => {
    if (url) {
      setIframeSrc(url);
    } else {
      setIframeSrc("");
    }
  }, [url]);

  // Notify the parent container when the component has been resized
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      onResize(width, height); // Pass the size back to the parent container
    }
  }, [scale]); // Recalculate when scale changes

  const dynamicScale = scale;

  return (
    <div
      ref={containerRef}
      style={{
        width: `${device.width}px`,
        height: `${device.height}px`,
        transform: `scale(${dynamicScale})`,
        transformOrigin: "top left",
      }}
    >
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-primary-text text-[12px]">{device.name}</h3>
        <div className="flex items-center gap-1">
          <span className={`text-secondary-text text-[12px]`}>
            @ {device.width} x {device.height} px
          </span>
          <div className="ml-2">
            {device.category === "Mobile" && (
              <CiMobile3 className="text-primary-text" />
            )}
            {device.category === "Tablet" && (
              <MdTabletMac className="text-primary-text" />
            )}
            {device.category === "Computer" && (
              <GrPersonalComputer className="text-primary-text" />
            )}
          </div>
        </div>
      </div>

      {/* Device Frame */}
      <div
        style={{
          width: `${device.width}px`,
          height: `${device.height}px`,
          border: "1px solid #ccc",
          borderRadius: "5px",
          position: "relative",
          overflow: "hidden",
          transformOrigin: "top left",
        }}
      >
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            title={device.name}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: `${device.width}px`,
              height: `${device.height}px`,
              border: "none",
              transformOrigin: "top left",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceRenderer;
