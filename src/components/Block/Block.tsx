import React, {useEffect, useRef, useState} from 'react';
import "./Block.css";
import {ReactComponent as Plus} from "../../assets/icons/plus-solid.svg"
import ConnectionsContainer from "../ConnectionsContainer/ConnectionsContainer";

type Content = {
    tree: any;
    addChild: (a: string) => void;
}

function Block({tree, addChild}: Content) {

    const elementRefs = useRef([]);
    const [cordinate, setCordinate] = useState([])

    useEffect(() => {
        const getCoordinatesRecursive = (elements: any) => {
            elements.forEach((element: any, index: any) => {
                const elementRef = elementRefs.current[index];
                if (elementRef) {
                    // @ts-ignore
                    const rect = elementRef.getBoundingClientRect();
                    // @ts-ignore
                    setCordinate(prev => [...prev, {x: rect.x, y: rect.y}])
                    // console.log(`${element.name} coordinates:`, rect);
                }
                if (element?.childs?.length > 0) {
                    getCoordinatesRecursive(element.childs);
                }
            });
        };

        getCoordinatesRecursive(tree);
    }, [tree]);

    return (
        <div className="block-layer">
            <div>
                {cordinate.map((item)=>(
                    <ConnectionsContainer start={{x: 0, y: 0}} end={item}/>
                ))}
                {tree?.map((branch: any, index: any) => (
                    <div
                        key={branch.version}
                        // @ts-ignore
                        ref={(el) => (elementRefs.current[index] = el)}
                        className="block-container-column">
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