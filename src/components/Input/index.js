import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default function Input({ onExtraClick, extra, className, ...rest }) {
  return (
    <div className={styles.root}>
      <input {...rest} className={classNames('input', className)} />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  )
}
