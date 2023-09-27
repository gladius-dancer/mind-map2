import React from 'react';
import "./Block.css";
import {ReactComponent as Plus} from "../../assets/icons/plus-solid.svg"

type Content = {
    tree: any;
    addChild: (a: string) => void;
}

function Block({tree, addChild}: Content) {

    return (
        <div className="block-layer">
            <div className="block-container-column">
                {tree?.map((item: any) => (
                    <div className="block" key={item.version}>
                        <p>{item.label} {item.version}</p>
                        <span className="add" onClick={() => addChild(item)}>
                            <Plus className="plus"/>
                        </span>
                    </div>
                ))}
            </div>
            {tree?.map((item: any) => (
                item.childs.length > 0 && <Block
                    tree={item.childs}
                    addChild={addChild}/>
            ))}
        </div>

    );
}

export default Block;