import { Component, OnInit,Output, Input} from '@angular/core';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { EventEmitter } from '@angular/core';
import { string } from 'prop-types';

@Component({
  selector: 'intl-tel-input',
  templateUrl: './intl-tel-input.component.html',
  styleUrls: ['./intl-tel-input.component.scss']
})
export class IntlTelInputComponent implements OnInit {
   @Input() phoneNumber: string;
   @Output() messageToEmit = new EventEmitter();
   @Output() getNumber = new EventEmitter();

  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates, CountryISO.India];

  constructor() { }

    ngOnInit()
    {

    }
    onChange(data) {
        if (data) {
            let string = data.number;
            this.messageToEmit.emit(string);
            this.getNumber.emit(string)
        }
    }
    //onChange(data)
    //{
    //    var string = data.number;
    //    this.messageToEmit.emit(string);
    //    this.getNumber.emit(string)

    //}

}
