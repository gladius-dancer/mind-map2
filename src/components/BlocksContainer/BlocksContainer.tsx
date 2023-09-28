import React from 'react';
import "./BlocksContainer.css";
import {Block} from "../Block";
import useAddChild, {TreeType} from "./hooks/useAddChild";

function BlocksContainer() {

    const {
        tree,
        addChild
    } = useAddChild();

    return (
        <div className="block-container">
            <Block
                treeItem={tree[0]}
                addChild={addChild}
            />
        </div>
    );
}

export default BlocksContainer;