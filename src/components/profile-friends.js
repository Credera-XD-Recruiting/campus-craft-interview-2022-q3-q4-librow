import { removeChildNodes } from "../utils";
import { getAvatarText } from "./helpers/avatar-text";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");
  
  if (topFriend) {
    const topFriendNode = clone.querySelector(".top-friend-flag")
    topFriendNode.style.display = "inline-block";
  }

  nameNode.innerHTML = `${name}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
  } else {
    const nameSplit = name.split(" ");
    avatarNode.appendChild(getAvatarText(nameSplit[0], nameSplit[1], false));
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {

  resultsData.friends.sort(
    (a, b) => b.name.match(/\s(.+)/)[1].localeCompare(a.name.match(/\s(.+)/)[1])
  ).reverse();

  const topFriends = [];
  const temp = resultsData.friends.slice();
  resultsData.friends.map((friend) => {
    if (friend.topFriend) {
      topFriends.push(friend);
      temp.splice(temp.indexOf(friend), 1);
    }
  });

  resultsData.friends = [...topFriends.concat(temp)];

  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    for (let i = 0; i < resultsData.friends.length; i++) {
      const friendsNode = generateListItemNode(resultsData.friends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};
