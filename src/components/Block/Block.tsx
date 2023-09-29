import React, {useEffect} from 'react';
import "./Block.css";
import {ReactComponent as Plus} from "../../assets/icons/plus-solid.svg"
import {TreeType} from "../BlocksContainer/hooks/useAddChild";

type Props = {
    treeItem: TreeType;
    addChild: (a: string) => void;
    addCords: (val: any[]) => void;
}

type LocationType = {
    x: number;
    y: number;
}

export type CordinateType = {
    x: number;
    y: number;
}

function Block({treeItem, addChild, addCords}: Props) {
    const {version, label, childs} = treeItem;

    const getParrentCordinates = (element: HTMLElement | null): CordinateType => {
        const parent = element?.getBoundingClientRect();
        if (parent) return {x: parent.x + 180, y: parent.y + 30};
        return {x: 0, y: 0};
    };

    const getChildCordinates = (element: HTMLElement | null): CordinateType => {
        const parent = element?.getBoundingClientRect();
        if (parent) return {x: parent.x, y: parent.y + 30};
        return {x: 0, y: 0};
    };

    useEffect(() => {
        const cords: any = [];
        const getRefCordinates = (branch: TreeType[]) => {
            branch.map((item: TreeType) => {
                item.childs.map((child) => {
                    cords.push([
                        getParrentCordinates(document.getElementById(item.version)),
                        getChildCordinates(document.getElementById(child.version))
                    ])
                })
                getRefCordinates(item?.childs)
            })

        }
        getRefCordinates([treeItem]);
        addCords(cords);
    }, [treeItem]);

    return (
        <div className="block-layer">
            <div className="block-container-column">
                <div className="block" id={treeItem.version}>
                    <p>{label} {version}</p>
                    <span className="add" onClick={() => addChild(version)}>
                        <Plus className="plus"/>
                    </span>
                </div>
                <div className='.block-container-row'>
                    {childs?.map((item: TreeType) => (
                            <Block
                                key={item.version}
                                treeItem={item}
                                addChild={addChild}
                                addCords={addCords}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Block;