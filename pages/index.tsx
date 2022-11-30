import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { toast } from 'react-toastify'
import PolygonLogo from '../assets/PolygonLogo'
import AccountManager from '../controller/accountManager'
import claimFaucet from '../controller/faucet'
import PolygonScan from '../components/PolygonScan'
import FormattedDate from '../components/FormattedDate'
import config from '../config'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Button } from '../components/Button'

const accountManager = new AccountManager()

export default function Home() {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState<string>()
  const [faucetBalance, setFaucetBalance] = useState<string>(' ...')
  const [captcha, setCaptcha] = useState('')
  const [recentTxs, setRecentTxs] = useState<any[] | null>(null)
  const [sending, setSending] = useState(false)
  const captchaRef = useRef<any>()

  useEffect(() => {
    document.body.classList.add('dark')
  }, [])

  const getFaucetInfo = async () => {
    try {
      const {
        data: { latest20Transactions, faucetBalance },
      } = await axios.get(`${config.apiUrl}/info`)
      setFaucetBalance(faucetBalance)
      setTimeout(async () => {
        setRecentTxs(latest20Transactions)
      }, 1000)
    } catch {
      toast.error("Couldn't fetch faucet info")
    }
  }

  const claim = async () => {
    if (!account) return toast.error('Please connect your wallet first')
    try {
      setSending(true)
      const { data } = await claimFaucet(account, captcha)
      setRecentTxs([data, ...(recentTxs || [])])
      toast.success('You will see MATIC in your wallet in 1-20 minutes')
    } catch (err: any) {
      toast.error(err.response?.data.message || 'Something went wrong')
      console.log(err)
    } finally {
      setCaptcha('')
      setSending(false)
    }
  }

  useEffect(() => {
    if (!captcha.length) return
    claim()
  }, [captcha])

  const connectWallet = () => {
    if (sending) return
    if (account) {
      if (captchaRef?.current && !captcha) return captchaRef.current.execute()
    }
    accountManager
      .connect()
      .then((account) => {
        if (!account) {
          toast.error(`Make sure you are on the Matic/Polygon network!`)
        } else {
          setAccount(account)
          console.log(account)
          accountManager.getBalance().then((balance) => {
            setBalance(balance)
            toast.success(`Connected to ${account.substring(0, 6)}...`)
          })
        }
      })
      .catch((e) => {
        toast.error(`Something wrong happened: ${e.message}`)
      })
  }

  useEffect(() => {
    getFaucetInfo()
  }, [])

  return (
    <>
      <Head>
        <title>Mover Polygon Faucet</title>
        <meta name="title" content="Mover's Polygon Faucet" />
      </Head>
      <div className="box-wrapper">
      <div className="box-background"></div>
      <div className="py-8 px-8 box light:light-box dark:dark-box box">
        <h1 className="mb-4 flex flex-col items-center justify-center text-center">
          <PolygonLogo className="h-14" />
          <span className="mt-2 mb-8">Polygon faucet</span>
          <code className="text-m">
            Faucet Balance: {faucetBalance}{' '}
            <span className="text-[#fff]">MATIC</span>
          </code>

          <div className="max-w-full truncate">
            <PolygonScan address={config.faucetAddress} />
          </div>
        </h1>
        {account && (
          <div className="text-center">
            Connected as:
            <br />
            <PolygonScan address={account} />
            <div className="mt-1">
              Balance:{' '}
              <code>
                {balance} <span className="text-[#fff]">MATIC</span>
              </code>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-5">
          <Button onClick={() => connectWallet()} text={sending ? 'Sending...' : account ? 'Get Some MATIC!' : 'Connect Wallet'} />
        </div>
        <HCaptcha
          theme="dark"
          sitekey={config.hCaptchaSiteKey}
          onVerify={setCaptcha}
          ref={captchaRef}
          size="invisible"
        />
      </div>
      </div>
    </>
  )
}
