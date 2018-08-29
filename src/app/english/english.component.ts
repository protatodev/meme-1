import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styleUrls: ['./english.component.css'],
  providers: [QuoteService]
})
export class EnglishComponent implements OnInit {
  quote: string = '';

  constructor(private quoteService: QuoteService) {}

  buildEnglishQuotes(quotePackage): void {
    for(let i = 0; i < quotePackage.length; i++) {
      if(quotePackage[i].quote.length <= 100) {
        QuoteService.quoteLibrary.push(quotePackage[i].quote);
      }
    }
  }

  getEnglishQuote() {
    if(QuoteService.quoteLibrary.length > 0) {
      let randomNum = Math.floor(Math.random() * (QuoteService.quoteLibrary.length - 1));
      this.quote = QuoteService.quoteLibrary[randomNum];
      QuoteService.quoteLibrary.splice(randomNum, 1);

      return this.quote;
    } else {
      this.populateQuotes();
    }
  }

  populateQuotes() {
    let quotePromise = this.quoteService.getQuote();
    quotePromise.then(quoteData => {
      this.buildEnglishQuotes(quoteData);
      let randomNum = Math.floor(Math.random() * (QuoteService.quoteLibrary.length - 1));
      this.quote = QuoteService.quoteLibrary[randomNum];
      QuoteService.quoteLibrary.splice(randomNum, 1);
    }).catch(error => {
      console.log(error);
    })
  }

  ngOnInit() {
  }

}
