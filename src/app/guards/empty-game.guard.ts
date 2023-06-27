import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsGameEmpty } from '../modules/editor/state/editor.selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmptyGameGuard implements CanLoad {
  selectIsGameEmpty = this.store.select(selectIsGameEmpty);
  constructor(private store: Store, private router: Router) {}
  canLoad(): Observable<boolean | UrlTree> {
    return this.selectIsGameEmpty.pipe(
      map((isEmpty) => !isEmpty || this.router.createUrlTree(['../'])),
    );
  }
}
