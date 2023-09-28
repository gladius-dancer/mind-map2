import React, {useEffect, useState} from 'react';
import "./ConnectionsContainer.css";

type CordinateType = {
    x: number;
    y: number;
}

type ConnectionType = {
    start: CordinateType;
    end: CordinateType
}

function ConnectionsContainer({start, end}: ConnectionType) {
    const [line, setLine] = useState("");

    function distance(start: CordinateType, end: CordinateType) {
        const dx = start.x - end.x;
        const dy = start.y - end.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function calculatePath(start: CordinateType, end: CordinateType) {
        const center = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2,
        };

        const controlPoint = {
            x: start.x + Math.min(distance(start, end), Math.abs(end.y - start.y) / 2, 150),
            y: start.y,
        };

        setLine(`
          M ${start.x},${start.y} 
          Q ${controlPoint.x}, ${controlPoint.y} ${center.x},${center.y} 
          T ${end.x},${end.y}
        `);
    }

    useEffect(() => {
        calculatePath(start, end);
    }, []);

    return (
        <svg className="connections-container">
            <g>
                <path
                    d={line}
                    fill="transparent"
                    stroke="red"
                    strokeWidth="2"
                ></path>
            </g>
        </svg>
    );
}

export default ConnectionsContainer;