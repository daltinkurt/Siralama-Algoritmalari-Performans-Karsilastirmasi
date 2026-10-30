export class WorkerPool {

    constructor(workerUrl, size = 4) {

        this.workerUrl = workerUrl;
        this.size = size;

        this.idle = [];
        this.queue = [];

        for (let i = 0; i < size; i++) {

            this.idle.push(
                new Worker(
                    workerUrl,
                    { type: "module" }
                )
            );
        }
    }

    run(data) {

        return new Promise((resolve) => {

            this.queue.push({
                data,
                resolve
            });

            this.process();
        });
    }

    process() {

        if (
            this.idle.length === 0 ||
            this.queue.length === 0
        ) {
            return;
        }

        const worker = this.idle.pop();

        const task =
            this.queue.shift();

        worker.onmessage = e => {

            this.idle.push(worker);

            task.resolve(e.data);

            this.process();
        };

        worker.postMessage(
            task.data
        );
    }
}