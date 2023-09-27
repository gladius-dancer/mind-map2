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
            <div>
                {tree?.map((item: any) => (
                    <div key={item.version} className="block-container-column">
                        <div className="block">
                            <p>{item.label} {item.version}</p>
                            <span className="add" onClick={() => addChild(item)}>
                                <Plus className="plus"/>
                            </span>
                        </div>
                        <div className='.block-container-row'>
                            {tree?.map((item: any) => (
                                <Block
                                    tree={item.childs}
                                    addChild={addChild}/>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

        </div>

    );
}

export default Block;