import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from './pipe/summary.pipe';
import { AssurancePlan } from '../models/IAP/annual-assurance-plan/assurance-plan.model';
import { AssuranceProviderModel } from '../models/IAP/assurance-provider/assurance-provider.model';
import { Assessor } from '../models/IAP/annual-assurance-plan/assessor/assessor.model';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SummaryPipe,
  ],
  providers: [
  ]
})
export class HelperModule {

  static newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // static getAssuranceLineEnum(assuranceLineName: string): EnumAssuranceLine {
  //   var enumValue = EnumAssuranceLine;
  //   switch (assuranceLineName) {
  //     case 'First Line': return enumValue.FirstLine;
  //     case 'Second Line': return enumValue.SecondLine;
  //     case 'Third Line': return enumValue.ThirdLine;
  //     case 'Regulator Line': return enumValue.RegulatorLine;
  //     case 'External Line': return enumValue.ExternalLine;
  //   }

  //   return EnumAssuranceLine.Other;
  // }

  // static getAssuranceTypeEnum(assuranceTypeName: string): EnumAssuranceType {
  //   return assuranceTypeName == ''
  //     ? EnumAssuranceType.FunctionalChecklist
  //     : EnumAssuranceType.ManagementSystem;
  // }

}
