export class Metrics {

    constructor() {

        this.comparisons = 0;
        this.swaps = 0;
        this.assignments = 0;
    }

    compare(a, b) {

        this.comparisons++;

        return a - b;
    }

    swap(arr, i, j) {

        this.swaps++;

        [arr[i], arr[j]] =
            [arr[j], arr[i]];
    }

    assign(count = 1) {

        this.assignments += count;
    }

    total() {

        return (
            this.comparisons +
            this.swaps +
            this.assignments
        );
    }
}