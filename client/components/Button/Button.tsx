import React, { memo } from 'react'

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: any;
}

export const Button: React.FC<IButtonProps> = memo(({ text, ...props }) => {
  return (
    <button className='button button_view_default' {...props}>{text}</button>
  )
})
