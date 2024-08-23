export class FinancialSpending {
    id: number;
    expectedSpendingDate: Date;
    costType: string;
    description: string;
    localPurchase: number;
    externalPurchase: {
        ammount: number;
        currency: string;
    };
}
