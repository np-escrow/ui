import { useEffect, useState } from "react";
import { t } from "i18next";

import { Header } from "../../components/Header";

import { EUserType } from "../../types";
import Button from "../../components/Button/Button";

const Withdraw = () => {

  return <main className="page-with-button flex flex-col justify-center">
    <div className="custom-container flex-1">
      <div className="flex flex-col h-full">
        <div className="my-5">
          <Header />
        </div>

        {/* Content block */}

      </div>
    </div>
  </main>;
};

export default Withdraw;