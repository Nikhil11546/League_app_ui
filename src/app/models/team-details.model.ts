import { MemberDetails } from "./member-details.model";


export class TeamDetails {
    GroupId!:number;
    GroupName!: string;
    OrganizationName!: string;
    SponsorName!: string;
    SponsorPhone!: string;
    SponsorEmail!:string;
    ImageUrl!: string;
    MaxGroupSize!: number;
    WinsRatio!: number;
    Members!: MemberDetails[]; 
}

