import React, {MutableRefObject, RefObject, useEffect, useRef, useState} from 'react';
import "./Block.css";
import {ReactComponent as Plus} from "../../assets/icons/plus-solid.svg"
import {ConnectionType} from "../ConnectionsContainer/types/ConnectionType";
import {TreeType} from "../BlocksContainer/hooks/useAddChild";
import {ConnectionsContainer} from "../ConnectionsContainer";

type Content = {
    tree: any;
    addChild: (a: string) => void;
}

type LocationType = {
    x: number;
    y: number;
}

type CordinateType = {
    start: LocationType;
    end: LocationType;
    childs: ConnectionType[]
}


function Block({tree, addChild}: Content) {

    const elementRefs = useRef<any[]>([]);
    const [cordinate, setCordinate] = useState<CordinateType[]>([]);

    const getCordinates = (tree: any) => {
        // tree.forEach((item: any)=>{
        //     console.log(elementRefs.current[item.version]);
        //
        // })

        elementRefs.current.map((item)=>{
            console.log(item.key);
        })

        /*tree?.forEach((node: any, index: any) => {
            if (node.childs.length > 0) {
                const elementRef = elementRefs.current[node.version];
                const rect = elementRef.getBoundingClientRect();
                setCordinate((prev: any) => {
                    return prev.map((item: any) => {
                        if (item.version === node.version) {
                            return {...item, start: {x: rect.x + 180, y: rect.y + 30}, end: {x: rect.x, y: rect.y + 30}}
                        }
                    })
                })
                getCordinates(node.childs);
            } else {
                const elementRef = elementRefs.current[node.version];
                const rect = elementRef.getBoundingClientRect();
                setCordinate((prev: any) => {
                    return prev.map((item: any) => {
                        if (item.version === node.version) {
                            return {...item, start: {x: rect.x + 180, y: rect.y + 30}, end: {x: rect.x, y: rect.y + 30}}
                        }
                    })
                })
            }
        });*/
    };

    useEffect(() => {
        getCordinates(tree);

    }, [tree]);

    return (
        <div className="block-layer">
            {/*{cordinate?.map((start, index) => {*/}
            {/*        return start.childs?.map((end: any) => (*/}
                        <ConnectionsContainer
                            // key={index}
                            // start={{x: start.start.x, y: start.start.y}}
                            // end={{x: end.end.x, y: end.end.y}}
                            start={{x: 300, y: 300}}
                            end={{x: 400, y: 500}}
                        />
            {/*        ))*/}
            {/*    }*/}
            {/*)*/}
            {/*}*/}
            <div>
                {tree?.map(({childs, label, version}: TreeType, index: number) => (
                    <div
                        key={version}
                        ref={(el:HTMLDivElement | null) => elementRefs.current[index] = el}
                        className="block-container-column">
                        <div className="block">
                            <p>{label} {version}</p>
                            <span className="add" onClick={() => addChild(version)}>
                                <Plus className="plus"/>
                            </span>
                        </div>
                        {childs?.length > 0 && (
                            <div className='.block-container-row'>
                                {tree?.map((item: any) => {
                                        if(version === item.version){
                                            return (
                                                <Block
                                                    key={version}
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