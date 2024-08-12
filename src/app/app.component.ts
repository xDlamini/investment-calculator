import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { UserInputComponent } from "./components/user-input/user-input.component";
import type { InvestmentInput } from './investment-input-model';
import { InvestmentResultsComponent } from "./components/investment-results/investment-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  resultsData?: {
    year: number;
    interest: number;
    valueEndOfYear:number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
    }[];

  onCalculateInvestmentResults(data:InvestmentInput) {
    const {initialInvestment, annualInvestment, expectedReturn, duration} = data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
        const year = i + 1;
        const interestEarnedInYear = investmentValue * (expectedReturn / 100);
        investmentValue += interestEarnedInYear + annualInvestment;
        const totalInterest =
            investmentValue - annualInvestment * year - initialInvestment;
        annualData.push({
            year: year,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: annualInvestment,
            totalInterest: totalInterest,
            totalAmountInvested: initialInvestment + annualInvestment * year,
        });
    }

    this.resultsData = annualData;
    
}
}
