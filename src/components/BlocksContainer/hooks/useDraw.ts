import { useState } from "react";
import { CoordinateType } from "../../../types/CoordinateType";

function useDraw() {
    const [coords, setCoords] = useState<CoordinateType[][]>([]);

    const distance = (start: CoordinateType, end: CoordinateType) => {
        const dx = start.x - end.x;
        const dy = start.y - end.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const calculatePath = (start: CoordinateType, end: CoordinateType) => {
        const center = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2,
        };

        const controlPoint = {
            x:
        start.x +
        Math.min(distance(start, end), Math.abs(end.y - start.y) / 2, 150),
            y: start.y,
        };

        return `
          M ${start.x},${start.y} 
          Q ${controlPoint.x}, ${controlPoint.y} ${center.x},${center.y} 
          T ${end.x},${end.y}
        `;
    };

    return {
        coords,
        setCoords,
        calculatePath,
    };
}

export default useDraw;
