class Playfield {
    constructor() {
        this.rows = 20;
        this.cols = 10;
        this.matrix = this.create();
    }

    create() {
        const m = [];
        while(this.rows--) {
            m.push(Array(this.cols).fill(0));
        }
        return m;
    }

}

const playfield = new Playfield();