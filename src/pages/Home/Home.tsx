import { useEffect, useState } from "react";

import { Onboarding } from "../../components/Onboarding";
import { EUserType } from "../../types";

const Home = () => {
  const [isShown, setIsShown] = useState<boolean>(true);
  // todo: get user type from backend
  const [userType] = useState<EUserType>(EUserType.RECIPIENT);

  const shownOnboarding = false;
  // todo
  // const shownPrivateModeOnboarding =
  // userData?.authData?.user.metadata?.shownPrivateModeOnboarding;

  useEffect(() => {
    setIsShown(shownOnboarding);
  }, [shownOnboarding]);

  const handleClose = () => {
    console.log("todo send request to change user metadata");
    setIsShown(true);
  };

  return <main className="page-with-button flex flex-col justify-center">
    <div className="custom-container flex-1">
      {isShown ? <h2>Home page</h2> : <Onboarding userType={userType} close={handleClose} />}
    </div>
  </main>;
};

export default Home; 