/**
 * Function which accepts two strings (firstName, lastName) and a boolean (header)
 */

export const getAvatarText = ((firstName, lastName, header) => {
    const avatarText = document.createElement(header ? "h1" : "p");

    avatarText.className = header ? "" : "page-paragraph";
    avatarText.innerHTML = firstName.charAt(0).concat(lastName.charAt(0));
    
    return avatarText;
})