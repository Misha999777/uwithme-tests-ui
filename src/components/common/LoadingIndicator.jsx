import { Fragment } from 'react'

import SyncLoader from 'react-spinners/SyncLoader'

import '../../styles/Loader.css'

export default function LoadingIndicator({ loading = true, children = null }) {

  const loader = (
    <div className="overlay">
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
