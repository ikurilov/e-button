import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { playerIcons } from '../../../../../../shared/player-icons/player-icons';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { pClientActions } from '../../state/p-client.actions';
import { CLIENT_ICON_KEY } from '../../services/p-client-utils.service';

function getRandomElements<T>(array: T[], n: number): T[] {
  const result: T[] = [...array]; // Создаем копию исходного массива

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]; // Обмен элементов
  }

  return result.slice(0, n); // Возвращаем первые N элементов
}

@Component({
  selector: 'app-modal-icon-select',
  templateUrl: './modal-icon-select.component.html',
  styleUrls: ['./modal-icon-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalIconSelectComponent implements OnInit {
  private icons = playerIcons;

  public scanning = true;

  public coolDown = 5000;

  public displayList: typeof playerIcons = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private modal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.turnOffScanning(3);
    this.pickRandomIcons(9);
    setInterval(() => {
      if (this.coolDown > 0) {
        this.coolDown -= 1000;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  public selectIcon(icon: string): void {
    localStorage.setItem(CLIENT_ICON_KEY, icon);
    this.store.dispatch(pClientActions.changeIcon({ icon }));
    this.modal.close();
  }

  public roll(): void {
    this.scanning = true;
    setTimeout(() => {
      this.pickRandomIcons(9);
      this.scanning = false;
      this.coolDown = 10000;
      this.cdr.detectChanges();
    }, 1500);
  }

  public close(): void {
    this.modal.close();
  }

  private pickRandomIcons(count): void {
    this.displayList = getRandomElements(this.icons, count);
  }

  private turnOffScanning(seconds: number): void {
    setTimeout(() => {
      this.scanning = false;
      this.cdr.detectChanges();
    }, seconds * 1000);
  }
}
