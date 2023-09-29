import { useState } from "react";
import { TreeType } from "../../../types/TreeType";

function useAddChild() {
    const [tree, setTree] = useState<TreeType[]>([
        {
            version: "0",
            label: "Node",
            childs: [],
        },
    ]);

    const searchAndChangeElement = (
        tree: TreeType[],
        version: string,
    ): TreeType[] => {
        return tree.map((node: TreeType) => {
            if (node.version === version) {
                if (node.childs.length > 0) {
                    return {
                        ...node,
                        childs: [
                            ...node.childs,
                            {
                                version: `${node.version}-${node.childs.length}`,
                                label: `Child`,
                                childs: [],
                            },
                        ],
                    };
                } else {
                    return {
                        ...node,
                        childs: [
                            ...node.childs,
                            {
                                version: `${node.version}-0`,
                                label: `Child`,
                                childs: [],
                            },
                        ],
                    };
                }
            } else if (node.childs.length > 0) {
                return {
                    ...node,
                    childs: searchAndChangeElement(node.childs, version),
                };
            }

            return node;
        });
    };

    const addChild = (version: string) => {
        const modifiedTree = searchAndChangeElement(tree, version);
        setTree(modifiedTree);
    };

    return {
        tree,
        addChild,
        searchAndChangeElement,
    };
}

export default useAddChild;
