import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWithdrawStore } from "../../store/withdrawStore";

import QrScanner from "qr-scanner";

import { Icon } from "../../components/Icon";
import NavHeader from "../../components/NavHeader/NavHeader";

const Scan = () => {
  const [isScanned, setIsScanned] = useState(false);

  const navigate = useNavigate();

  const setWithdrawAddress = useWithdrawStore(
    (state) => state.setWithdrawAddress
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  const handleScan = useCallback(
    (data: string) => {
      if (isScanned) {
        return;
      }

      setIsScanned(true);
      setWithdrawAddress(data);
      navigate("/withdraw", { replace: true });

      setTimeout(() => {
        setIsScanned(false);
      }, 5000);
    },
    [isScanned, navigate, setWithdrawAddress]
  );

  useEffect(() => {
    if (!videoRef.current) return;

    qrScannerRef.current = new QrScanner(
      videoRef.current,
      (result) => handleScan(result.data),
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 5
      }
    );
    qrScannerRef.current.start();

    return () => {
      qrScannerRef.current?.stop();
      qrScannerRef.current?.destroy();
      qrScannerRef.current = null;
    };
  }, [handleScan, videoRef]);
  return (
    <main className="fixed top-0 z-50 flex h-screen w-screen flex-col justify-center">
      <div className="custom-container mobile-padding flex h-full flex-col">
        <div className="mb-[30px] mt-5">
          <NavHeader
            isLink={true}
            link="/withdraw"
            className="text-white-100 absolute left-0 right-0 top-0 !z-[51]"
          />
        </div>

        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute left-0 top-[25vh] flex h-full w-full items-start justify-center">
          <div className="cutout"></div>
        </div>

        <Icon
          name="qrFrame"
          size={264}
          className="absolute left-1/2 top-[calc(25vh-2px)] -translate-x-1/2"
        />

        <p className="absolute left-1/2 top-[calc(25vh+300px)] z-10 -translate-x-1/2 text-nowrap text-[17px] leading-[1.18] tracking-[0.4px] text-white">
          Find QR that contains address
        </p>
      </div>
    </main>
  );
};

export default Scan;
