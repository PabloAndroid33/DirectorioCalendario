import { types } from "../../types/types"

describe('Pruebas en Types',()=>{

    test('Los types deben ser iguales',()=>{

        expect(types).toEqual({
            uiOpenModal:'[ui] Open modal',
            uiCloseModal:'[ui] Close modal',
        
            eventSetActive:'[event] Set active',
            eventLogout:'[event] Event logout',
            eventStartAddNew:'[event] Start add New',
            eventAddNew:'[event] Add new',
        
            eventClearActiveEvent:'[event] Clear active event',
            eventUpdated:'[event] Event updated',
            eventDeleted:'[event] Event deleted',
            eventLoaded:'[event] Events loaded',
        
        
        
        
          
            authCheckingFinish:'[auth] Finish checking login state',
            authStartLogin:'[auth] Start login',
            authLogin:'[auth] Login',
            authStartRegister:'[auth] Start Register',
            authStartStartTokenRenew:'[auth] Start token renew',
            authLogout:'[lauth] Logout',
        
        })

    })
})