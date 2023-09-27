import React, {useState} from 'react';
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
            childs: [
                {
                    version: "0-0",
                    label: 'Child',
                    childs: [],
                },
                {
                    version: "0-1",
                    label: 'Child',
                    childs: [
                        {
                            version: "0-1-0",
                            label: 'Child',
                            childs: [],
                        },
                        {
                            version: "0-1-1",
                            label: 'Child',
                            childs: [],
                        },
                    ],
                },
                {
                    version: "0-2",
                    label: 'Child',
                    childs: [],
                }
            ],
        }],
    );

    const searchAndChangeElement = (treeArray: any, version: any) => {
        return treeArray.map((node: any) => {
            if (node.version === version.version) {
                return {
                    ...node, childs: [...node.childs, {
                        version: `version ${String(Number(version.version) + 1)}`,
                        label: `Child ${version.version + "." + String(Number(version.version) + 1)}`,
                        childs: []
                    }]
                };
            } else if (node.childs) {
                return {...node, childs: searchAndChangeElement(node.childs, version)};
            } else {
                return node;
            }
        });
    };
    const addChild = (version: string) => {
        const modifiedTree = searchAndChangeElement(tree, version);
        setTree(modifiedTree);
    };

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