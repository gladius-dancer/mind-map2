import React, {useState} from 'react';
import "./BlocksContainer.css";
import {Block} from "../Block";
import useAddChild from "./hooks/useAddChild";
import {CordinateType} from "../Block/Block";

function BlocksContainer() {

    const {
        tree,
        addChild
    } = useAddChild();

    const [cords, setCords] = useState<any>([]);
    console.log(cords)

    const distance = (start: CordinateType, end: CordinateType) => {
        const dx = start.x - end.x;
        const dy = start.y - end.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    const calculatePath = (start: CordinateType, end: CordinateType) => {
        const center = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2,
        };

        const controlPoint = {
            x: start.x + Math.min(distance(start, end), Math.abs(end.y - start.y) / 2, 150),
            y: start.y,
        };

        return `
          M ${start.x},${start.y} 
          Q ${controlPoint.x}, ${controlPoint.y} ${center.x},${center.y} 
          T ${end.x},${end.y}
        `;
    }

    return (
        <div className="block-container">
            <svg className='block-image'>
                <path d="M20,4L30,15z" className="path-arrow-top"/>
                <path d="M20,26L30,15z" className="path-arrow-bottom"/>
                {cords.map((itemCords: any) => (
                        <path
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
                addCords={(val: any) => setCords([...cords, val])}
            />
        </div>
    );
}

export default BlocksContainer;