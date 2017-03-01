import AlertsReducer from 'reducers/alerts'
import * as ActionTypes from 'constants/ActionTypes'

describe('AlertsReducer', () => {
  it('adds alert to list with willExpire attribute', () => {
    const state = AlertsReducer(undefined, { type: ActionTypes.ALERT, alert: { type: 'HELLO' } })
    expect(state).toEqual([{ type: 'HELLO', willExpire: false }])
  })

  it('un-expires existing alert', () => {
    const beforeState = [
      {
        type: 'HELLO',
        willExpire: true
      }
    ];

    const state = AlertsReducer(beforeState, { type: ActionTypes.ALERT, alert: { type: 'HELLO', willExpire: false }})
    expect(state).toEqual([{ type: 'HELLO', willExpire: false }])
  })

  it('expires willExpire alerts', () => {
    const beforeState = [
      {
        type: 'HELLO',
        willExpire: false
      },
      {
        type: 'GOODBYE',
        willExpire: true
      }
    ]
    
    const state = AlertsReducer(beforeState, { type: ActionTypes.EXPIRE_ALERTS })
    expect(state).toEqual([{ type: 'HELLO', willExpire: true }])
  })
})
