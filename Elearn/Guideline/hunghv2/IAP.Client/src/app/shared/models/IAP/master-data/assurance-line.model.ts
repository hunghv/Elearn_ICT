export class MDAssuranceLine {
    constructor(
        public id: string,
        public name: string,
        public description: any,
        public active: boolean,
        public insertedBy: string,
        public insertedAt: string,
        public updatedBy: string,
        public updatedAt: string
    ) { }
}