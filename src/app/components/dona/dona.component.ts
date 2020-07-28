import { Component, Input} from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
    @Input() title: string = 'Sin Titulo';
    
    @Input('labels') public doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
    @Input('data')   public doughnutChartData: MultiDataSet = [
      [100, 100, 100]
    ];;


}
