import React from "react";
import "./BlocksContainer.css";
import { Block } from "../Block";
import useAddChild from "./hooks/useAddChild";
import useDraw from "./hooks/useDraw";
import { TreeLines } from "../TreeLines/TreeLines";

function BlocksContainer() {
    const { tree, addChild } = useAddChild();

    const { coords, setCoords, calculatePath } = useDraw();

    return (
        <div className="block-container">
            <TreeLines coords={coords} calculatePath={calculatePath} />
            <Block treeItem={tree[0]} addChild={addChild} addCords={setCoords} />
        </div>
    );
}

export default BlocksContainer;
