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
                {tree?.map((branch: any) => (
                    <div key={branch.version} className="block-container-column">
                        <div className="block">
                            <p>{branch.label} {branch.version}</p>
                            <span className="add" onClick={() => addChild(branch.version)}>
                                <Plus className="plus"/>
                            </span>
                        </div>
                        {branch.childs.length > 0 && (
                            <div className='.block-container-row'>
                                {tree?.map((item: any) => {
                                    if(branch.version === item.version){
                                        return (
                                            <Block
                                                tree={item.childs}
                                                addChild={addChild}
                                            />
                                        )
                                    }
                                }
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>

    );
}

export default Block;