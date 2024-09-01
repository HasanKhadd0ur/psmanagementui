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

   static aggregateSpendingByYearAndCurrency(spendings: FinancialSpending[]): FinancialSpending[] {
    const aggregationMap: Record<string, FinancialSpending> = {};

    spendings.forEach(spending => {
        const year = new Date(spending.expectedSpendingDate).getFullYear();
        const currency = spending.externalPurchase.currency;

        // Create a unique key for each year-currency combination
        const key = `${year}-${currency}`;

        if (!aggregationMap[key]) {
            // Initialize an aggregated entry for this year-currency combination
            aggregationMap[key] = {
                id: 0, // Aggregated entries do not have an ID
                expectedSpendingDate: new Date(`${year}-01-01`), // Use the first day of the year for aggregation
                costType: 'Aggregated', // Set as 'Aggregated'
                description: `Aggregated spending for ${currency} in ${year}`,
                localPurchase: 0,
                externalPurchase: {
                    ammount: 0,
                    currency: currency
                }
            };
        }

        // Aggregate values
        aggregationMap[key].localPurchase += spending.localPurchase;
        aggregationMap[key].externalPurchase.ammount += spending.externalPurchase.ammount;
    });

    // Convert the aggregation map back to a list
    return Object.values(aggregationMap);
  }    
}
