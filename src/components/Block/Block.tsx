import React, {useEffect} from 'react';
import "./Block.css";
import {ReactComponent as Plus} from "../../assets/icons/plus-solid.svg"
import {TreeType} from "../BlocksContainer/hooks/useAddChild";
import useBlock from "./hooks/useBlock";
import {LocationType} from "./types/BlockTypes";

type Props = {
    treeItem: TreeType;
    addChild: (a: string) => void;
    addCords: (val: LocationType[][]) => void;
}

function Block({treeItem, addChild, addCords}: Props) {
    const {version, label, childs} = treeItem;

    const {
        getParrentCordinates,
        getChildCordinates
    } = useBlock();

    useEffect(() => {
        const cords: LocationType[][] = [];
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