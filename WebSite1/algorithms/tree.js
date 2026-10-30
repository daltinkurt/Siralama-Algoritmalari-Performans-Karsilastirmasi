export default {

    name: "Tree",

    sort(arr, metrics) {

        let root = null;

        for (const value of arr) {

            root = insert(
                root,
                value,
                metrics
            );
        }

        let index = 0;

        const stack = [];

        let current = root;

        while (
            current ||
            stack.length > 0
        ) {

            while (current) {

                stack.push(
                    current
                );

                current =
                    current.left;
            }

            current =
                stack.pop();

            arr[index++] =
                current.value;

            metrics.assign();

            current =
                current.right;
        }
    }
};

class Node {

    constructor(value) {

        this.value =
            value;

        this.left =
            null;

        this.right =
            null;
    }
}

function insert(
    root,
    value,
    metrics
) {

    const newNode =
        new Node(value);

    if (!root) {
        return newNode;
    }

    let current = root;

    while (true) {

        if (
            metrics.compare(
                value,
                current.value
            ) < 0
        ) {

            if (
                current.left === null
            ) {

                current.left =
                    newNode;

                break;
            }

            current =
                current.left;
        }
        else {

            if (
                current.right === null
            ) {

                current.right =
                    newNode;

                break;
            }

            current =
                current.right;
        }
    }

    return root;
}