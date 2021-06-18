import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAppState } from "../hooks/useAppState";
import useGetAttempt from "../hooks/useAttempts";
import { ReactComponent as Camera } from "../icons/camera.svg";
import { ReactComponent as CameraOff } from "../icons/camera-off.svg";
import { ReactComponent as Crosshair } from "../icons/crosshair.svg";
import { ReactComponent as Info } from "../icons/info.svg";
import { ReactComponent as Check } from "../icons/check-circle.svg";

interface NavButtonProps {
  icon: ReactNode;
  href?: string;
}

const NavButton = ({ icon, href = "" }: NavButtonProps) => {
  return (
    <NavLink
      exact
      className="w-11 h-11 flex justify-center items-center rounded-xl transition-transform transform scale-100"
      activeClassName="text-gray-100 bg-blue-600 scale-110"
      to={href}
    >
      {icon}
    </NavLink>
  );
};

const Nav = () => {
  const { user } = useAppState();
  const currentUserAttempt = useGetAttempt(user?._id);
  const targetAttempt = useGetAttempt(user?.target?._id);

  return (
    <nav className="absolute bottom-0 container text-gray-500 bg-gray-100 h-16 flex justify-around items-center border-t border-gray-200">
      <NavButton href="/target" icon={<Crosshair />} />
      {!user?.killed && !!currentUserAttempt?.data?.length && <NavButton href="/attempt" icon={<Check/>}></NavButton>}
      {(user?.killed || !!targetAttempt?.data?.length) && !currentUserAttempt?.data?.length && <NavButton href="/" icon={<CameraOff/>}></NavButton>}
      {!user?.killed && !targetAttempt?.data?.length && !currentUserAttempt?.data?.length && <NavButton href="/camera" icon={<Camera className="w-6 h-6"/>}></NavButton>}
      <NavButton href="/info" icon={<Info />} />
    </nav>
  );
};

export default Nav;
