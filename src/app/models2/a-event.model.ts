export class AEvent {
  public id: bigint;
  public title: string;
  public description: string;
  public status: AEventStatus;
  public isTicketed: boolean;
  public participationFee: number;
  public maxParticipants: number;
  public start: Date;
  public end: Date;

  constructor(id: bigint, title: string, description: string, status: AEventStatus, isTicketed: boolean, participationFee: number,
              maxParticipants: number, start: Date, end: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.isTicketed = isTicketed;
    this.participationFee = participationFee;
    this.maxParticipants = maxParticipants;
    this.start = start;
    this.end = end;
  }
}

export enum AEventStatus {
  'DRAFT' = 'DRAFT',
  'PUBLISHED' = 'PUBLISHED',
  'CANCELLED' = 'CANCELLED'
}
