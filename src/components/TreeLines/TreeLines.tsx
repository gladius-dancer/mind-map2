import { CoordinateType } from "../../types/CoordinateType";
import React from "react";
import "./TreeLines.css";

type Props = {
  coords: CoordinateType[][];
  calculatePath: (start: CoordinateType, end: CoordinateType) => string;
};

export function TreeLines({ coords, calculatePath }: Props) {
    return (
        <svg className="block-image">
            <path d="M20,4L30,15z" className="path-arrow-top" />
            <path d="M20,26L30,15z" className="path-arrow-bottom" />
            {coords.map((itemCords: CoordinateType[], item: number) => (
                <path
                    key={item}
                    d={calculatePath(itemCords[0], itemCords[1])}
                    fill="transparent"
                    stroke="red"
                    strokeWidth="2"
                ></path>
            ))}
        </svg>
    );
}
