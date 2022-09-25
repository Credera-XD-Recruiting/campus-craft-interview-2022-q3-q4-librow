import underlineSrc from "../assets/underline.svg";
import { getAvatarText } from "./helpers/avatar-text";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc } = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const avatarNode = headerNode.querySelector(".profile-avatar");
  const profileAvatarNode = headerNode.querySelector("img");
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");

  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half"
  );

  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);
  profileAvatarNode.src = avatarSrc;
  profileAvatarNode.setAttribute("aria-label", `${firstName} ${lastName}`);
  avatarNode.appendChild((getAvatarText(firstName, lastName, true)));

  if (!avatarSrc) {
    profileAvatarNode.remove();
  }
};
