import { Pipe, PipeTransform } from '@angular/core';
import { PersonalInfo } from '../../../employees/models/vakueObjects/personalInfo';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(personalInfo : PersonalInfo): string {
    if (!personalInfo) {
      return '';
    }
    return `${personalInfo.firstName} ${personalInfo.lastName}`;
  }

}
