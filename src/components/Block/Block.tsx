import React, {useEffect, useRef, useState} from 'react';
import "./Block.css";
import {ReactComponent as Plus} from "../../assets/icons/plus-solid.svg"
import {TreeType} from "../BlocksContainer/hooks/useAddChild";

type Content = {
    treeItem: TreeType;
    addChild: (a: string) => void;
    addCords: (val: CordinateType[]) => void
}

type LocationType = {
    x: number;
    y: number;
}

export type CordinateType = {
    x: number;
    y: number;
}

function Block({treeItem, addChild, addCords}: Content) {
    const {version, label, childs} = treeItem;
    const childRef = useRef<HTMLDivElement>(null);
    const [parentCord, setParentCord] = useState<CordinateType>({x: 0, y: 0});
    const [childCord, setChildCord] = useState([]);

    console.log(parentCord);

    const getParentCordinate = (event: MouseEvent)=>{
        setParentCord({x: event.clientX, y: event.clientY});
    }

    const getCordinates = (element: HTMLDivElement): CordinateType => {
        const parent = element.getBoundingClientRect();
        return { x: parent.x, y: parent.y }
    };

    useEffect(() => {
        const elements = document.querySelectorAll(`[data-id="0"]`);

        elements.forEach((child) => {
            const childCords = getCordinates(child as HTMLDivElement)
            addCords([{x: parentCord.x, y: parentCord.y + 30}, {x: childCords.x + 180, y: childCords.y + 50}])
        })
    }, []);

    return (
        <div className="block-layer">
            <div className="block-container-column">
                <div className="block" ref={childRef} onClick={(event:any)=>getParentCordinate(event)}>
                    <p>{label} {version}</p>
                    <span className="add" onClick={() => addChild(version)}>
                        <Plus className="plus"/>
                    </span>
                </div>
                <div className='.block-container-row'>
                    {childs?.map((item: TreeType) => (
                            <div key={item.version} data-id={treeItem.version}>
                                <Block
                                    key={item.version}
                                    treeItem={item}
                                    addChild={addChild}
                                    addCords={addCords}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Block;