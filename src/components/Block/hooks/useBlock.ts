import { CoordinateType } from "../../../types/CoordinateType";

function useBlock() {
    const getParrentCordinates = (
        element: HTMLElement | null,
    ): CoordinateType => {
        const parent = element?.getBoundingClientRect();
        if (parent) return { x: parent.x + 180, y: parent.y + 30 };
        return { x: 0, y: 0 };
    };

    const getChildCordinates = (element: HTMLElement | null): CoordinateType => {
        const parent = element?.getBoundingClientRect();
        if (parent) return { x: parent.x, y: parent.y + 30 };
        return { x: 0, y: 0 };
    };

    return {
        getParrentCordinates,
        getChildCordinates,
    };
}

export default useBlock;
