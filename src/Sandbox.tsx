import "./Sandbox.css";
import Menu from "./components/menu/Menu";
import React, {useState} from "react";

const Sandbox = () => {
    const [isRequestingItems, setIsRequestingItems] = useState(false);
    const [menuItemsNumber, setMenuItemsNumber] = useState(8);
    const [menuObjects, setMenuObjects] = useState([] as any);
    const [fadeDuration, setFadeDuration] = useState(1);
    const [animationDuration, setAnimationDuration] = useState(1);
    const [delayMultiplier, setDelayMultiplier] = useState(0.25);
    const [animationType, setAnimationType] = useState(2);

    const handleMenuItemsNumberChange = (event:any) => {
        setMenuItemsNumber(event.target.value);
    }
    const handleRequestMenuItemsClick = () => {
        if (isRequestingItems) return;
        setMenuObjects([]);
        setIsRequestingItems(true);
        setTimeout(() => {
            setIsRequestingItems(false);
            const newMenuObjects : Object[] = [];
            for (let i = 0; i < menuItemsNumber; i++) {
                newMenuObjects.push(
                    {
                        title: `I am title ${i+1}`,
                        url: "some random url data"
                    }
                )
            }
            setMenuObjects(newMenuObjects);
        }, 1500)
    }
    const handleAnimationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setAnimationType(Number(event.target.value));
    }
    const handleFadeDurationChange = (event:any) => {
        setFadeDuration(event.target.value);
    }
    const handleAnimationDurationChange = (event:any) => {
        setAnimationDuration(event.target.value);
    }
    const handleDelayMultiplierChange = (event:any) => {
        setDelayMultiplier(event.target.value);
    }



    return (
        <div className={"sandbox"}>
            <div className={"controls-container"}>
                <div className={"control-item"}>
                    <div>Menu items:</div>
                    <input type="number" min={0} max={100} value={menuItemsNumber} onChange={handleMenuItemsNumberChange}/>
                </div>
                <div className={"control-item"}>
                    <div>Animation type:</div>
                    <select onChange={handleAnimationTypeChange} value={animationType}>
                        <option value="1">All together</option>
                        <option value="2">One by one</option>
                        <option value="3">Random</option>
                        <option value="4">Inside out</option>
                        <option value="5">Rotate</option>
                        <option value="6">Double rotate</option>
                    </select>
                </div>
                <div className={"control-item"}>
                    <div>Fade duration (s):</div>
                    <input type="number" step={".1"} min={0} max={10} value={fadeDuration} onChange={handleFadeDurationChange}/>
                </div>
                <div className={"control-item"}>
                    <div>Animation duration (s):</div>
                    <input type="number" step={".1"} min={0} max={10} value={animationDuration} onChange={handleAnimationDurationChange}/>
                </div>
                <div className={"control-item"}>
                    <div>One by one delay multiplier:</div>
                    <input type="number" step={".01"} min={0} max={10} value={delayMultiplier} onChange={handleDelayMultiplierChange}/>
                </div>
            </div>
            <div className={"controls-container"}>
                <button
                    className={`request-button ${isRequestingItems ? "request-button-disabled" : ""}`}
                    onClick={handleRequestMenuItemsClick}
                >
                    Request menu items
                </button>
            </div>
            <div className={"menu-sandbox"}>
                <Menu
                    isWaitingMenuItems={isRequestingItems}
                    menuObjects={menuObjects}
                    fadeDuration={fadeDuration}
                    delayMultiplier={delayMultiplier}
                    animationType={animationType}
                    animationDuration={animationDuration}
                />
            </div>
        </div>
    );
}

export default Sandbox;
