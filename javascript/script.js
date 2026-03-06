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

// profile bio buttons
 const cradledButtons = document.querySelectorAll('.cradled--bubble--btn');
    cradledButtons.forEach(button => {
        const bloatEffect = button.querySelector('.cradledbubble--bloat--effect');
        const shadow = button.querySelector('.cradled--bubble--btn--shadow');
        const textContainer = button.querySelector('.cradledBubble--txt--nd--icon--container');
        
        // Store original styles
        const originalStyles = {
            bloatEffect: {
                border: bloatEffect.style.border,
                transform: bloatEffect.style.transform
            },
            shadow: {
                border: shadow.style.border
            },
            textContainer: {
                transform: textContainer.style.transform,
                color: textContainer.style.color,
                opacity: textContainer.style.opacity
            }
        };

        button.addEventListener('mousedown', () => {
            bloatEffect.style.border = '0.001rem solid #676a7291';
            bloatEffect.style.transform = 'scaleY(0.98)';
            bloatEffect.style.animation = 'quickBounce 0.6s ease-in-out';
            textContainer.style.transform = 'translateY(-2px)';
            textContainer.style.color = 'rgb(183, 191, 197)';
            textContainer.style.opacity = '100%';
        });

        button.addEventListener('mouseup', () => {
            bloatEffect.style.border = originalStyles.bloatEffect.border;
            bloatEffect.style.transform = originalStyles.bloatEffect.transform;
            shadow.style.border = originalStyles.shadow.border;
            textContainer.style.transform = originalStyles.textContainer.transform;
            textContainer.style.color = originalStyles.textContainer.color;
            textContainer.style.opacity = originalStyles.textContainer.opacity;
        });
    });








}
