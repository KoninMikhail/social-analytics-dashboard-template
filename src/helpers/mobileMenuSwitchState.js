
export function mobileMenuSwitchState(menuContainer, itemsSelector){
    // Base variables
    const container  = typeof menuContainer === 'string' ? document.querySelector(menuContainer) :  menuContainer;
    const listItems = typeof itemsSelector === 'string' ? container.querySelectorAll(itemsSelector) :  itemsSelector;
    const collapseClass = container.classList[0] + '--collapsed';

    // State variables.
    let isCollapsed = container.classList.contains(collapseClass);
    let calcHeight = 0;

    // Get hidden items height.
    listItems.forEach((element, index) => {
        if (isCollapsed === false){
            calcHeight += element.offsetHeight;
        }

        if (isCollapsed === true){
            calcHeight = listItems[0].offsetHeight;
        }
    });

    container.style.maxHeight = calcHeight.toString() + 'px';
    container.classList.toggle(collapseClass);


}