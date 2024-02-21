import React, { useEffect } from "react"

// Components
import Navigator from "navigation/Navigator"
import { PersistGate } from "redux-persist/integration/react"

// Hooks & Redux

// Helpers & Types

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import { useTypedSelector, persistor } from "store"

const BootstrapScreen = (): JSX.Element => {
  // Props
  // State
  // Global Store
  const { isAuth, isRegistrationFlowComleted } = useTypedSelector(
    (store) => store.auth
  )

  // Variables
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Navigator
        isAuth={!!isAuth}
        isRegistrationFlowComleted={!!isRegistrationFlowComleted}
      />
    </PersistGate>
  )
}

export default BootstrapScreen
