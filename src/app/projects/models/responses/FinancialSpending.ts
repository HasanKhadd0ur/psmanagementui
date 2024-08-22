export class FinancialSpending {
    id: number;
    expectedSpendingDate: number;
    costType: number;
    description: string;
    localPurchase: number;
    externalPurchase: {
        ammount: number;
        currency: string;
    };
}
