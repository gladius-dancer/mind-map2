import React from 'react';
import "./BlocksContainer.css";
import {Block} from "../Block";
import useAddChild from "./hooks/useAddChild";

function BlocksContainer() {

    const {
        tree,
        addChild
    } = useAddChild();

    return (
        <div className="block-container">
            <Block
                tree={tree}
                addChild={addChild}
            />
            {/*{cordinate?.map((start, index) => {
                    return start.childs?.map((end: any) => (
                        <ConnectionsContainer
                            key={index}
                            start={{x: start.start.x, y: start.start.y}}
                            end={{x: end.end.x, y: end.end.y}}
                        />
                    ))
                }
            )
            }*/}
        </div>
    );
}

export default BlocksContainer;