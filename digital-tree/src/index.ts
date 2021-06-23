class TNode {
    value: string;
}


class Trie {
    private tree: any;
    constructor() {
        this.tree = {};
    }

    /**
     * 
     * Iterating each keyof the node and recursing and printing node data 
     * at each recursion step over and over until we exhaust all of the tree 
     * in which case we return .
     * @param node 
     * @param level 
     * @returns 
     */
    private _walk(node: TNode, level: number) {
        let keys = Object.keys(node).filter(key => key !== "value");
        for (let [idx, key] of keys.entries()) {
            console.log(
                `${"\t".repeat(level - 1)}-> ${level}.${idx + 1} ${node[key].value}`
            );
            this._walk(node[key], level + 1);
        }
        return;
    }

    /**
     * 
     *  Check if we have reached the end of string, we save it as last node and return the node.
     *  If not, we check if we already have the key (character at entry[index]) in current node .
     *  If we don’t, we create it, else, we recursively run this method on the key, 
     *  creating/accessing the key at each recursive call until we run the entire character 
     *  length of entry and store it at last node we reach. By doing this, we are using the already existing path (if it exists) 
     *  thereby saving repetitions of same characters at same index of two strings until we reach distinct characters 
     *  where in we create a different path (key).
     * @param node 
     * @param entry 
     * @param index 
     * @returns 
     */
    private _walkAndInsert(node: TNode, entry: string, index: number) {
        if (index === entry.length - 1) {
            return (node[entry[index]] = {
                value: entry
            });
        } else {
            if (!node[entry[index]]) {
                node[entry[index]] = {
                    value: entry.slice(0, index + 1)
                };
            }

            node[entry[index]][entry[index + 1]] = {
                ...node[entry[index]][entry[index + 1]],
                ...this._walkAndInsert(node[entry[index]], entry, index + 1)
            };
        }
        return node[entry[index]];
    }

    /**
     * 
     * recursively traverse the nodes based on current key (entry[index]) checking if the key exists at each step. 
     * If we run the entire entry string length, that means it exists and we simply return the value at that node . 
     * If the node doesn’t exist at any point that means the entry does not exist at all in which case we return an error.
     * @param entry 
     * @param node 
     * @param index 
     * @returns 
     */

    private _walkAndSearch(entry: string, node: TNode, index: number) {
        if (!node) {
            console.error("Not found!");
            return;
        }
        if (index === entry.length) {
            console.info("Found!");
            return node.value;
        } else {
            return this._walkAndSearch(entry, node[entry[index]], index + 1);
        }
    }

    /**
     * In this method we are recursively traversing tree until we reach the keyof our entry 
     * which contains the entry and we delete that and return.
     * @param entry 
     * @param node 
     * @param index 
     * @returns 
     */
    private _walkAndDelete(entry: string, node: TNode, index: number) {
        if (index === entry.length - 1) {
            delete node[entry[index]];
            return;
        }
        this._walkAndDelete(entry, node[entry[index]], index + 1);
    }

    insert(entry: string) {
        this._walkAndInsert(this.tree, entry, 0);
    }

    search(entry: string) {
        let res = this._walkAndSearch(entry, this.tree, 0);
        console.log(res);
    }

    delete(entry: string) {
        this._walkAndDelete(entry, this.tree, 0);
    }

    printAll() {
        console.info("Printing Hierarchy...");
        this._walk(this.tree, 1);
    }
}

let sampleTrie = new Trie()
sampleTrie.insert("elaps");
sampleTrie.insert("ex");
sampleTrie.insert("exist");
sampleTrie.insert("exam");
sampleTrie.insert("exit");
sampleTrie.insert("exibit");
sampleTrie.insert("exhodus");
sampleTrie.search("exam"); // found
sampleTrie.delete("exam");
sampleTrie.search("exam"); // not found
sampleTrie.printAll();
