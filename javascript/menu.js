window.onload = pageReady;
function pageReady() {
  // desktop menu elements
  const desktopMenuIcon = document.getElementsByClassName(
    "desktopMenuIconContainer"
  );
  const desktopMenuIconsHover = document.getElementsByClassName(
    "desktopMenuIconHoverEffect"
  );
  let desktopIconIndex = null;

  // Desktop menu icon hover effect mouse enter
  Array.from(desktopMenuIcon).forEach((desktopMenuIconContainer, index) => {
    desktopMenuIconContainer.onmouseover = menuIconHoverEffect;
    function menuIconHoverEffect() {
      desktopIconIndex = index;
      desktopMenuIconsHover[desktopIconIndex].style.display = "flex";
    }
  });
  // Desktop menu icon hover effect mouse leave
  Array.from(desktopMenuIcon).forEach((desktopMenuIconContainer, index) => {
    desktopMenuIconContainer.onmouseleave = menuItemMouseLeave;
    function menuItemMouseLeave() {
      desktopIconIndex = index;
      desktopMenuIconsHover[desktopIconIndex].style.display = "none";
    }
  });

  // 🍇
}
