export class CowTrackingData {
    healthIndex: number;
    endDate: string;
    minValueDateTime: number;
    type: string;
    cowId: number;
    animalId: string;
    eventId: number;
    deletable: boolean;
    lactationNumber: number;
    daysInLactation: number;
    ageInDays: number;
    startDateTime: number;
    reportingDateTime: number;
    alertType?: string;
    selected?: boolean;
    constructor() {
        this.healthIndex = null;
        this.endDate = '';
        this.minValueDateTime = null;
        this.type = '';
        this.cowId = null;
        this.animalId = '';
        this.eventId = null;
        this.deletable = false;
        this.lactationNumber = null;
        this.daysInLactation = null;
        this.ageInDays = null;
        this.startDateTime = null;
        this.reportingDateTime = null;
        this.alertType = '';
        this.selected = false;
    }
}