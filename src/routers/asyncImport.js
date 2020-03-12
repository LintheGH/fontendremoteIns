import React from 'react'
import SuspenseLoading from '@components/SuspenseLoading'

// Route 组件必须接受React组件，故此处返回一个组件
export default function asyncImport (Component) {
  return (props) => (
    <React.Suspense fallback={<div></div>}>
      <Component {...props}/>
    </React.Suspense>
  )
}