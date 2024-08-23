import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateTranslate'
})
export class StateTranslatePipe implements PipeTransform {

  transform(state : string ): string  {

    switch (state){
    case "InPlan":
      return "يخطط";
    case "Complete": 
      return "مكتمل";
    case "InProgress" :
      return "التنفيذ";
    case "Proposed" : 
      return "مطروح";
    case "CancledState":
      return "ملغى";

    default : 
    return "غير معروف"
    }
  }

}
