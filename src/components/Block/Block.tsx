import React, {MutableRefObject, RefObject, useEffect, useRef, useState} from 'react';
import "./Block.css";
import {ReactComponent as Plus} from "../../assets/icons/plus-solid.svg"
import {ConnectionType} from "../ConnectionsContainer/types/ConnectionType";
import {TreeType} from "../BlocksContainer/hooks/useAddChild";
import {ConnectionsContainer} from "../ConnectionsContainer";

type Content = {
    treeItem: TreeType;
    addChild: (a: string) => void;
}

type LocationType = {
    x: number;
    y: number;
}

type CordinateType = {
    x: number;
    y: number;
}


function Block({treeItem, addChild}: Content) {
    const {version, label, childs} = treeItem;

    const parentRef = useRef<HTMLDivElement>(null);
    const [parentCor, setParentCor] = useState<CordinateType>({x: 0, y: 0});
    const [cordinates, setCordinates] = useState<CordinateType[]>([]);

    const getCordinates = (element: HTMLDivElement): CordinateType => {
        const parent = parentRef?.current?.getBoundingClientRect() as any;
        return {x: parent.x, y: parent.y}
    };

    useEffect(() => {
        const elCor: CordinateType[] = [];
        const elements = document.querySelectorAll(`[data-id="0"]`)
        elements.forEach((child, index) => {
            // elCor.push(getCordinates(child as HTMLDivElement))
            setCordinates(prev =>[...prev, getCordinates(child as HTMLDivElement)]) ;
        })

        setParentCor(getCordinates(parentRef.current as HTMLDivElement));


    }, []);

    return (
        <div className="block-layer">
            {cordinates.map((cor, index) => (
                <ConnectionsContainer
                    key={index}
                    start={parentCor}
                    end={cor}
                />
            ))}

            <div className="block-container-column">
                <div className="block" ref={parentRef}>
                    <p>{label} {version}</p>
                    <span className="add" onClick={() => addChild(version)}>
                        <Plus className="plus"/>
                    </span>
                </div>

                <div className='.block-container-row'>
                    {childs?.map((item: TreeType) => (
                            <div key={item.version} data-id={treeItem.version}>
                                <Block
                                    treeItem={item}
                                    addChild={addChild}
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