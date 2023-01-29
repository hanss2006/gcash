import React, { createContext, useState, useEffect } from 'react'

// KEYCLOACK
import Keycloak from 'keycloak-js'

const KeycloackContext = createContext()

const KeycloackContextProvider = (props) => {
    const [ keycloackValue, setKeycloackValue ] = useState(null)
    const [ authenticated, setAuthenticated ] = useState(false)

    const setKeycloack = () => {
        const keycloak = new Keycloak({
            realm: process.env.REACT_APP_KEYCLOAK_REALM,
            url: process.env.REACT_APP_KEYCLOAK_URL,
            clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID,
        })

        keycloak.init({
            onLoad: 'login-required'
        }).then(authenticated => {
            setKeycloackValue(keycloak)
            setAuthenticated(authenticated)
            sessionStorage.setItem('token', keycloak.token)
            sessionStorage.setItem('refresh-token', keycloak.refreshToken)
        })

        keycloak.onTokenExpired = () => {
            //Setting the update (refresh) of our token
            keycloak.updateToken(5).then((refreshed) => {
                if (refreshed) {
                    sessionStorage.setItem('token', keycloak.token);
                    sessionStorage.setItem('refresh-token', keycloak.refreshToken)
                }
            });
        };
    }

    const logout = () => {
        setKeycloack(null)
        setAuthenticated(false)
        sessionStorage.clear()
        keycloackValue.logout()
    }

    useEffect(() => {
        setKeycloack()
    }, [])

    return (
        <KeycloackContext.Provider
            value={{
                keycloackValue,
                authenticated,
                logout
            }}
        >
            {props['children']}
        </KeycloackContext.Provider>
    )
}

export { KeycloackContextProvider, KeycloackContext }