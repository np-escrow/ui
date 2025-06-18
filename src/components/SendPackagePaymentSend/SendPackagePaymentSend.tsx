import { Button } from "../Button";
import { type ICreatePackage } from "../../pages/SendPackage/SendPackage.type";
import type { FC } from "react";

interface ISendPackagePaymentSendProps {
  createdPackage: null | ICreatePackage;
}

const SendPackagePaymentSend: FC<ISendPackagePaymentSendProps> = () => {
  return (
    <>
      <p>create</p>
      <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
        <Button>Share</Button>
      </div>
    </>
  );
};

export default SendPackagePaymentSend;
