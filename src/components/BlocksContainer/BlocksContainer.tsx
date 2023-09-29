import React from 'react';
import "./BlocksContainer.css";
import {Block} from "../Block";
import useAddChild from "./hooks/useAddChild";
import useDraw from "./hooks/useDraw";
import {LocationType} from "../Block/types/BlockTypes";

function BlocksContainer() {

    const {
        tree,
        addChild
    } = useAddChild();

    const {
        cords,
        setCords,
        calculatePath
    } = useDraw()

    return (
        <div className="block-container">
            <svg className='block-image'>
                <path d="M20,4L30,15z" className="path-arrow-top"/>
                <path d="M20,26L30,15z" className="path-arrow-bottom"/>
                {cords.map((itemCords: LocationType[], item: number) => (
                        <path
                            key={item}
                            d={calculatePath(itemCords[0], itemCords[1])}
                            fill="transparent"
                            stroke="red"
                            strokeWidth="2"
                        ></path>
                    )
                )}
            </svg>
            <Block
                treeItem={tree[0]}
                addChild={addChild}
                addCords={(val: LocationType[][]) => setCords(val)}
            />
        </div>
    );
}

export default BlocksContainer;