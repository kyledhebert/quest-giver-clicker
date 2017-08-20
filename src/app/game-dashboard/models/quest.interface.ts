export interface Quest {
    id: number;
    name: string;
    turnIn: string;
    turnInQty: number;
    text: string;
    completion: number;
    giveButtonDisabled: boolean;
    rewardButtonDisabled: boolean;
}
