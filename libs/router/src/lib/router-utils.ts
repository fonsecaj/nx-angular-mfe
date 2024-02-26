import { EventType, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Subscription, concatMap, filter, forkJoin, merge, mergeMap } from 'rxjs';

const routers$ = new BehaviorSubject<ReadonlyMap<symbol, Router>>(new Map());

let synchronizeRoutersSubscription: Subscription;

const synchronizeRouters$ = routers$.pipe(
  filter((routers) => routers.size > 1),
  concatMap((routers) => {
    const routerArray = [...routers.values()];

    const navigationEnds$ = routerArray.map(
      (router) => router.events.pipe(
        filter((event): event is NavigationEnd => event.type === EventType.NavigationEnd)
      )
    );

    return merge(...navigationEnds$).pipe(
      mergeMap((event) => {
        return forkJoin(
          routerArray.map(
            (router) => router.url !== event.urlAfterRedirects ? router.navigateByUrl(event.urlAfterRedirects) : EMPTY
          )
        );
      })
    );
  })
);

export function registerRouter(router: Router) {
  if (!synchronizeRoutersSubscription) {
    synchronizeRoutersSubscription = synchronizeRouters$.subscribe();
  }

  const routerSymbol = Symbol('Router');
  const routers = new Map([...routers$.value]);
  routers.set(routerSymbol, router);

  routers$.next(routers);

  return {
    unregister: () => {
      const routers = new Map([...routers$.value]);
      routers.delete(routerSymbol);

      routers$.next(routers);
    },
  };
}