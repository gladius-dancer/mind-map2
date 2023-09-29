import React, { useEffect } from "react";
import "./ConnectionsContainer.css";
import useConnect from "./hooks/useConnect";
import { ConnectionType } from "./types/ConnectionType";

function ConnectionsContainer({ start, end }: ConnectionType) {
    const { line, calculatePath } = useConnect();

    useEffect(() => {
        calculatePath(start, end);
    }, []);

    return (
        <svg className="connections-container">
            <path d={line} fill="transparent" stroke="red" strokeWidth="2"></path>
        </svg>
    );
}

export default ConnectionsContainer;
