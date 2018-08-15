export class MDLocation {
    constructor(
        public id: string,
        public name: string,
        public acronymName: string,
        public description: any,
        public active: boolean,
        public insertedBy: string,
        public insertedAt: string,
        public updatedBy: string,
        public updatedAt: string
    ) { }
}