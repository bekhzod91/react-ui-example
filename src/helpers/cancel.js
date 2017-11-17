import { clone } from 'ramda'
import { CancelToken } from 'axios'
import { Observable, BehaviorSubject } from 'rxjs'

export const axiosCancelRequest = () => {
  // notice that we return a function here
  return function cancelBeforeRequestImplementation (source) {
    const dispatch$ = new BehaviorSubject({ cancel: () => {} })

    return Observable.create(subscriber => {
      return source.subscribe(
        value => {
          const source = clone(CancelToken.source())

          try {
            subscriber.next([value, source.token])
            dispatch$.getValue().cancel('token')
            dispatch$.next(source)
          } catch (err) {
            subscriber.error(err)
          }
        },
        err => subscriber.error(err),
        () => subscriber.complete()
      )
    })
  }
}
