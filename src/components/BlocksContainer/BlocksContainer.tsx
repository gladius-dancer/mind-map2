import React, {useEffect, useState} from 'react';
import "./BlocksContainer.css";
import {Block} from "../Block";

type TreeType = {
    version: string,
    label: string,
    childs?: TreeType[]
}

function BlocksContainer() {
    const [tree, setTree] = useState<TreeType[]>(
        [{
            version: "0",
            label: 'Node',
            childs: [],
        }],
    );

    const searchAndChangeElement = (treeArray: any, version: any) => {
        return treeArray?.map((node: any) => {
            if (node.version === version) {
                if(node.childs.length > 0){
                    return {
                        ...node, childs: [...node.childs, {
                            version: `${node.version}-${node.childs.length}`,
                            label: `Child`,
                            childs: []
                        }]
                    };
                }else{
                    return {
                        ...node, childs: [...node.childs, {
                            version: `${node.version}-0`,
                            label: `Child`,
                            childs: []
                        }]
                    };
                }

            }
            else if (node.childs.length > 0) {
                return {...node, childs: searchAndChangeElement(node.childs, version)};
            }
            else {
                return node;
            }
        });
    };
    const addChild = (version: string) => {
        const modifiedTree = searchAndChangeElement(tree, version);
        setTree(modifiedTree);
        console.log(modifiedTree);
    };

    useEffect(() => {
        console.log(tree);
    }, [tree]);

    return (
        <div className="block-container">
            <Block
                tree={tree}
                addChild={addChild}
            />
        </div>
    );
}

export default BlocksContainer;