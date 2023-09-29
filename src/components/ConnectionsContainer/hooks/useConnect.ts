import { useState } from "react";
import { CordinateType } from "../types/ConnectionType";

function useConnect() {
    const [line, setLine] = useState("");

    const distance = (start: CordinateType, end: CordinateType) => {
        const dx = start.x - end.x;
        const dy = start.y - end.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const calculatePath = (start: CordinateType, end: CordinateType) => {
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

        setLine(`
          M ${start.x},${start.y} 
          Q ${controlPoint.x}, ${controlPoint.y} ${center.x},${center.y} 
          T ${end.x},${end.y}
        `);
    };

    return {
        line,
        setLine,
        calculatePath,
    };
}

export default useConnect;
