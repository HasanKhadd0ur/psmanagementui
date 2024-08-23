export class UpdateFinancialSpendItemRequest {
    projectId: number;
    id: number;
    externalPurchase: {
        ammount: number;
        currency: string;
    };
    localPurchase: number;
    costType: string;
    description: string;
    expectedSpendingDate: Date;
}
