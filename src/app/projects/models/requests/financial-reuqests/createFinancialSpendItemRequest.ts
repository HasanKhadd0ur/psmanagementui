
export class CreateFinancialSpendItemRequest {
    projectId: number;
    externalPurchase: {
        ammount: number;
        currency: string;
    };
    localPurchase: number;
    costType: string;
    description: string;
    expectedSpendingDate: Date;
}
