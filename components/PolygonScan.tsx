import React from 'react'

const PolygonScan = ({
  address,
  tx,
  short,
}: {
  address?: string
  tx?: string
  short?: boolean
}) => {
  return (
    <a
      href={`https://polygonscan.com/${tx ? 'tx' : 'address'}/${tx ? tx : address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#2fd9f1] w-16 md:w-auto truncate link-address"
    >
      {tx
        ? short
          ? tx.substring(0, 15) + '...'
          : tx
        : short && address
        ? address.substring(0, 10) + '...'
        : address}
    </a>
  )
}
export default PolygonScan
