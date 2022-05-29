import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../../core/services';

@Component({
  selector: 'app-network-info',
  templateUrl: './network-info.component.html',
  styleUrls: ['./network-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkInfoComponent implements OnInit {
  public ips: { title: string, ip: string[] }[];

  constructor(private els: ElectronService) {
  }

  public ngOnInit(): void {
    this.ips = this.els.getIp().sort((a, b) => {
      if (a.title.toLowerCase().includes('ethernet')){
        return -1
      }else {
        return 1
      }


    });
  }

  public copy(http): void {
    navigator.clipboard.writeText(http)
      .then(() => {
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  }
}
