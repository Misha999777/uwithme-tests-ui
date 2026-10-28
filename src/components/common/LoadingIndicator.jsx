import { Fragment } from 'react'

import { SyncLoader } from 'react-spinners'

import styles from '../../styles/Loader.module.css'

export default function LoadingIndicator({ loading = true, children = null }) {

  const loader = (
    <div className={styles.overlay}>
      <SyncLoader color="#FFFFFF" />
    </div>
  )

  return (
    <Fragment>
      {children}
      {loading && loader}
    </Fragment>
  )
}
