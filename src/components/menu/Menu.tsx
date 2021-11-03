import "./Menu.scss";
import Pulse from "./pulse/Pulse";
import MenuItem from "./menuItem/MenuItem";
import React from "react";

//TODO add default values to props
type Props = {
    isWaitingMenuItems: boolean; //if true a pulse loading animation is shown
    menuObjects: { //menu objects that will be rendered into a circle
        title: string, //title will be displayed as a menu item label
        url: string  //TODO not used right now, can be used to add redirect logic in MenuItem.tsx
    }[];
    animationType: number, //animation types:
    // 1-all items are immediately on circle,
    // 2-items are immediately on circle, but will appear one by one in clockwise
    // 3-items are immediately on circle, but will appear one by one randomly
    // 4-items are at the center and then will scatter into the circle
    // 5-items are at the center and then will move in place with spiral animation
    // 6-items are at the center and then will move in place with spiral animation and additionally each item will rotate
    fadeDuration: number, //duration in seconds how long fade will last. Applies for animation type 1,2,3.
    animationDuration: number,// will apply on types 4,5,6
    delayMultiplier: number //will be multiplied with one second, determines the gap between two appearances on type 2 and 3.
}

const Menu = ({
    isWaitingMenuItems,
    menuObjects,
    fadeDuration,
    animationDuration,
    animationType,
    delayMultiplier,
}: Props) => {
    let menuCenter = <div className={"center-label"}>TOORU</div>;
    let selectPlugin = <div className={"select-plugin"}>Select a plugin</div>;
    let selectOperation = <select></select>;
    let innerCircle = <div className={"inner-circle"} />;

    let animationClass: string;
    switch (animationType) {
        case 1:
            animationClass = "initiallyPositioned fade-in-menu";
            break;
        case 2:
            animationClass = "initiallyPositioned fade-in-menu-one-by-one";
            break;
        case 3:
            animationClass = "initiallyPositioned fade-in-menu-one-by-one";
            break;
        case 4:
            animationClass = "moveToCircleInsideOut";
            break;
        case 5:
            animationClass = "moveToCircleRotate";
            break;
        case 6:
            animationClass = "moveToCircleDoubleRotate";
            break;
        default:
            animationClass = "initiallyPositioned";
    }

    //these indexes will be used to populate menuElements array that will be rendered. Determines in what order the menu items are placed.
    const indexes = Array.from(Array(menuObjects.length).keys());
    indexes.reverse();
    if (animationType === 3) indexes.sort(() => Math.random() - 0.5);

    const menuElements = [];
    for (let i = 0; i < menuObjects.length; i++) {
        const index = indexes.pop();
        const styleVariables = {
            "--i": i,
            "--m": menuObjects.length,
            "--appear-delay": `${(index ? index : 0) * delayMultiplier}s`,
            "--fade-duration": `${fadeDuration}s`,
            "--animation-duration": `${animationDuration}s`
        } as React.CSSProperties;

        menuElements.push(
            <div key={i} className={`menu-items-container ${animationClass}`} style={styleVariables}>
                <MenuItem data={menuObjects[i]} />
            </div>
        )
    }

    return (
        <div className={"menu-main-container"}>
            {(!isWaitingMenuItems && menuObjects.length !== 0) &&
                <div className="center-items">
                    {menuCenter}
                    {selectPlugin}
                    {selectOperation}
                    {innerCircle}
                </div>
            }
            {isWaitingMenuItems &&
                <Pulse/>
            }
            {menuElements}
        </div>
    );
}

export default Menu;
