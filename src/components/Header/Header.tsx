import { Icon } from "../Icon";
import { t } from "i18next";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import userAvatar from "../../assets/images/user-avatar-mock.jpg";

const Header = () => {
  const avatar = useUserStore((state) => state.avatar);
  const username = useUserStore((state) => state.username);
  const getAvatar = useUserStore((state) => state.getAvatar);

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-x-[10px]">
        <div className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-gray-100">
          <div className="outline-white-100 padding-[1px] flex size-[40px] items-center justify-center overflow-hidden rounded-full outline">
            <img
              src={avatar || userAvatar}
              alt="user avatar"
              className="size-full object-cover"
            />
          </div>
        </div>
        <span className="text-[20px] font-semibold">
          {username
            ? t("header.greetingWithName", { name: username })
            : t("header.greeting")}
        </span>
      </div>
      <a
        href="https://t.me/your_support_bot"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="support" size={35} />
      </a>
    </header>
  );
};

export default Header;
