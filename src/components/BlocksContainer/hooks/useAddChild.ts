import {useState} from 'react';

export type TreeType = {
    version: string,
    label: string,
    childs: TreeType[]
}

function useAddChild() {
    const [tree, setTree] = useState<TreeType[]>([
        {
            version: "0",
            label: 'Node',
            childs: [],
        }
    ]);

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
    };

    return {
        tree,
        addChild,
        searchAndChangeElement
    }
}

export default useAddChild;