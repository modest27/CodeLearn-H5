import React, { InputHTMLAttributes } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  extra?: string
  onExtraClick?: () => void
  type?:'text'|'password'
}
export default function Input({ onExtraClick, extra, className, ...rest }:Props) {
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
