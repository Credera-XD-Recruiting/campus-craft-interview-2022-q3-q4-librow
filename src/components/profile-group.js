import { removeChildNodes } from "../utils";

const activityStates = {
  active: "active",
  inactive: "inactive",
  moderate: "moderate",
  low: "low",
};

const activityColors = {
  active: "#52C1AD",
  inactive: "#C4C4C4",
  moderate: "#58B1C9",
  low: "#C152A2",
}
/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const { name, href, image, activity, favorite } = data;
  const templateId = "profile-group-results-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const titleNode = clone.querySelector("p.page-paragraph");
  const referenceNode = clone.querySelector("a.profile-group-results-card");
  const groupImageNode = clone.querySelector(
    "a.profile-group-results-card img"
  );

  if (activity === activityStates.active) {
    referenceNode.style["background-color"] = activityColors.active;
  } else if (activity === activityStates.moderate) {
    referenceNode.style["background-color"] = activityColors.moderate;
  } else if (activity === activityStates.low) {
    referenceNode.style["background-color"] = activityColors.low;
  } else if (activity === activityStates.inactive) {
    referenceNode.style["background-color"] = activityColors.inactive;
  }

  if (favorite) {
    referenceNode.style["border-style"] = "solid";
    referenceNode.style["border-color"] = "black";
    referenceNode.style["border-width"] = "medium";
  }

  titleNode.innerHTML = `${name}`;
  referenceNode.href = href;
  groupImageNode.src = image;

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateProfileGroupItemsFromTemplate = (resultsData) => {
  const profileGroupsList = document.querySelector(
    "#profile-groups .profile-group-results"
  );

  const favGroups = [];
  const temp = resultsData.groups.slice();
  resultsData.groups.map((group) => {
    if (group.favorite) {
      favGroups.push(group);
      temp.splice(temp.indexOf(group), 1);
    }
  });

  resultsData.groups = [...favGroups.concat(temp)];

  removeChildNodes(profileGroupsList);

  if (resultsData.groups && resultsData.groups.length > 0) {
    for (let i = 0; i < resultsData.groups.length; i++) {
      const groupNode = generateCardNode(resultsData.groups[i]);
      profileGroupsList.appendChild(groupNode);
    }
  }
};
