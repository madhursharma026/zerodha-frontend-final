import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { BsPencil } from 'react-icons/bs'
import { CiShare2, CiStar } from 'react-icons/ci'
import { FaGithub, FaReddit, FaRegCopy } from 'react-icons/fa'
import { IoRocketOutline, IoShieldHalfSharp, IoStar, IoStarHalf } from 'react-icons/io5'
import { MdLockOpen } from 'react-icons/md'
import { RiGlobalLine } from 'react-icons/ri'
import styles from './GraphArea.module.css'

export default function TokenInfo({ symbol, latestPrice, tokenInfo }) {
  const mktData = tokenInfo?.market_data || {}

  // ✅ Format numbers into $2.23T, $45.6B etc.
  const formatNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    if (num >= 1e12) return `$ ${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$ ${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$ ${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$ ${(num / 1e3).toFixed(2)}K`
    return `$ ${num.toLocaleString()}`
  }

  // ✅ Format % with 2 decimals
  const formatPercent = (val) => {
    if (val === null || val === undefined || isNaN(val)) return 'N/A'
    return `${val.toFixed(2)}%`
  }

  const safeDate = (d) => {
    if (!d) return 'N/A'
    try {
      return new Date(d).toLocaleDateString()
    } catch {
      return 'N/A'
    }
  }

  return (
    <div className={`${styles.tradeContainer} pt-4`}>
      {/* Header */}
      <div className={`${styles.tradeWrapper} mb-2`}>
        <h5>
          {tokenInfo?.image?.small ? (
            <>
              <img src={tokenInfo.image.small} alt={tokenInfo?.name} width={25} height={25} />
            </>
          ) : (
            <>
              <img
                src="https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                alt={tokenInfo?.name}
                width={25}
                height={25}
              />
            </>
          )}
          <span className="ms-2">{tokenInfo?.name || 'N/A'} </span>
          <span className="mediumFontSize">({tokenInfo?.symbol?.toUpperCase() || 'N/A'})</span>
        </h5>
        <div>
          <span className={`${styles.leverageBox2} rounded-1`}>
            <CiStar /> 6M
          </span>
          <span className={`${styles.leverageBox2} rounded-1 ms-2`}>
            <CiShare2 />
          </span>
        </div>
      </div>

      {/* Current Price */}
      <p className="fs-2 fw-semibold">
        {formatNumber(mktData.current_price?.usd)}{' '}
        <span
          className={`mediumFontSize ${
            (mktData.price_change_percentage_7d_in_currency?.usd || 0) >= 0
              ? 'brandGreenColor'
              : 'brandRedColor'
          }`}
        >
          {mktData.price_change_percentage_7d_in_currency?.usd >= 0 ? '▲' : '▼'}{' '}
          {formatPercent(mktData.price_change_percentage_7d_in_currency?.usd)} (7d)
        </span>
      </p>

      {/* Market Cap */}
      <Card className={styles.tokenDetailCard}>
        <Card.Body className="text-center">
          <p style={{ fontSize: '10px' }}>Market Cap</p>
          <p
            className="fw-bold"
            style={{ marginTop: '-14px', fontSize: '14px', marginBottom: '-2px' }}
          >
            {formatNumber(mktData.market_cap?.usd)}{' '}
            <span
              className={
                (mktData.market_cap_change_percentage_24h || 0) >= 0
                  ? 'brandGreenColor'
                  : 'brandRedColor'
              }
            >
              {mktData.market_cap_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
              {formatPercent(mktData.market_cap_change_percentage_24h)} (24h)
            </span>
          </p>
        </Card.Body>
      </Card>

      {/* Volume / Supply */}
      <div className="row g-2 mt-1">
        <div className="col-6">
          <Card className={styles.tokenDetailCard}>
            <Card.Body className="text-center py-2 px-0">
              <div style={{ fontSize: '10px' }}>Volume (24h)</div>
              <div className="fw-bold" style={{ fontSize: '14px' }}>
                {formatNumber(mktData.total_volume?.usd)}
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-6">
          <Card className={styles.tokenDetailCard}>
            <Card.Body className="text-center py-2 px-0">
              <div style={{ fontSize: '10px' }}>Market Cap Rank</div>
              <div className="fw-bold" style={{ fontSize: '14px' }}>
                #Rank {mktData.market_cap_rank || 'N/A'}
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-6">
          <Card className={styles.tokenDetailCard}>
            <Card.Body className="text-center py-2 px-0">
              <div style={{ fontSize: '10px' }}>Vol/Mkt Cap (24h)</div>
              <div className="fw-bold" style={{ fontSize: '14px' }}>
                {mktData.market_cap?.usd && mktData.total_volume?.usd
                  ? ((mktData.total_volume.usd / mktData.market_cap.usd) * 100).toFixed(2)
                  : 'N/A'}
                %
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-6">
          <Card className={styles.tokenDetailCard}>
            <Card.Body className="text-center py-2 px-0">
              <div style={{ fontSize: '10px' }}>Total Supply</div>
              <div className="fw-bold" style={{ fontSize: '14px' }}>
                {formatNumber(mktData.total_supply)}
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-6">
          <Card className={styles.tokenDetailCard}>
            <Card.Body className="text-center py-2 px-0">
              <div style={{ fontSize: '10px' }}>Max. Supply</div>
              <div className="fw-bold" style={{ fontSize: '14px' }}>
                {formatNumber(mktData.max_supply)}
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-6">
          <Card className={styles.tokenDetailCard}>
            <Card.Body className="text-center py-2 px-0">
              <div style={{ fontSize: '10px' }}>Circulating Supply</div>
              <div className="fw-bold" style={{ fontSize: '14px' }}>
                {formatNumber(mktData.circulating_supply)} {tokenInfo?.symbol?.toUpperCase()}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Static Section (unchanged) */}
      <Card className={`${styles.tokenDetailCard} mt-2`}>
        <Card.Body className="px-2 py-1 mediumFontSize">
          <div className="row">
            <div className="col-6">Profile score</div>
            <div className="col-6 text-end">------- 100%</div>
          </div>
        </Card.Body>
      </Card>

      <Button variant="outline-danger" className="mt-2 w-100" style={{ fontSize: '12px' }}>
        <IoRocketOutline /> Boost
      </Button>

      <div className={`${styles.tradeWrapper} mt-4`}>
        <h6 className={`mediumFontSize mt-2`}>Website</h6>
        <div>
          <span className={`${styles.leverageBox2} rounded-1`}>
            <RiGlobalLine /> Website
          </span>
          <span className={`${styles.leverageBox2} rounded-1 ms-1`}>
            <FaRegCopy /> Whitepaper
          </span>
        </div>
      </div>

      <div className={`${styles.tradeWrapper} mt-2`}>
        <h6 className={`mediumFontSize`}>Social</h6>
        <div>
          <span className={`${styles.leverageBox2} rounded-1`}>
            <FaReddit />
          </span>
          <span className={`${styles.leverageBox2} rounded-1 ms-1`}>
            <FaGithub />
          </span>
        </div>
      </div>

      <div className={`${styles.tradeWrapper} mt-2`}>
        <h6 className={`mediumFontSize`}>Rating</h6>
        <span className={`${styles.leverageBox2} rounded-1 ms-1`}>
          4.4 <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStarHalf />
        </span>
      </div>

      <div className={`${styles.tradeWrapper} mt-2`}>
        <h6 className={`mediumFontSize`}>Explorers</h6>
        <span className={`${styles.leverageBox2} rounded-1`}>blockchain.info</span>
      </div>

      <div className={`${styles.tradeWrapper} mt-2`}>
        <h6 className={`mediumFontSize`}>Wallet</h6>
        <div>
          <span className={`${styles.leverageBox2} rounded-1`}>
            <IoShieldHalfSharp />
          </span>
          <span className={`${styles.leverageBox2} rounded-1 ms-1`}>
            <IoShieldHalfSharp />
          </span>
          <span className={`${styles.leverageBox2} rounded-1 ms-1`}>
            <IoShieldHalfSharp />
          </span>
          <span className={`${styles.leverageBox2} rounded-1 ms-1`}>
            <IoShieldHalfSharp />
          </span>
        </div>
      </div>

      <div className={`${styles.tradeWrapper} mt-2`}>
        <h6 className={`mediumFontSize`}>UCID</h6>
        <span className={`${styles.leverageBox2} rounded-1`}>
          1 <FaRegCopy />{' '}
        </span>
      </div>

      <p className="mediumFontSize mt-3">BTC to USD converter</p>

      <InputGroup size="sm">
        <InputGroup.Text
          id="inputGroup-sizing-sm"
          className={`${styles.customFormControl} ${styles.borderRightZero} rounded-0`}
        >
          BTC
        </InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          defaultValue={1}
          className={`${styles.customFormControl} ${styles.borderLeftZero} text-end rounded-0`}
        />
      </InputGroup>

      <InputGroup size="sm">
        <InputGroup.Text
          id="inputGroup-sizing-sm"
          className={`${styles.customFormControl} ${styles.borderRightZero} rounded-0`}
        >
          USD
        </InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          defaultValue={mktData.current_price?.usd}
          className={`${styles.customFormControl} ${styles.borderLeftZero} text-end rounded-0`}
        />
      </InputGroup>

      <div className={`${styles.tradeWrapper} mt-3`}>
        <h6 className={`mediumFontSize mt-2`}>Price performance</h6>
        <span className={`${styles.leverageBox2} rounded-1`}>24H</span>
      </div>

      <div className={`${styles.tradeWrapper} mt-3`}>
        <h6 className={`mediumFontSize`}>Low</h6>
        <h6 className={`mediumFontSize`}>Right</h6>
      </div>

      <div className={`${styles.tradeWrapper}`}>
        <h6 className={`mediumFontSize`}>${mktData.atl?.usd}</h6>
        <h6 className={`mediumFontSize`}>${mktData.ath?.usd}</h6>
      </div>

      <hr />

      {/* ATH */}
      <div className={`${styles.tradeWrapper} mt-3`}>
        <h6 className={`mediumFontSize`}>All-time high</h6>
        <h6 className={`mediumFontSize`}>{formatNumber(mktData.ath?.usd)}</h6>
      </div>
      <div className={`${styles.tradeWrapper}`}>
        <h6 className={`mediumFontSize`}>{safeDate(mktData.ath_date?.usd)}</h6>
        <h6
          className={`mediumFontSize ${
            (mktData.ath_change_percentage?.usd || 0) >= 0 ? 'brandGreenColor' : 'brandRedColor'
          }`}
        >
          {formatPercent(mktData.ath_change_percentage?.usd)}
        </h6>
      </div>

      {/* ATL */}
      <div className={`${styles.tradeWrapper} mt-3`}>
        <h6 className={`mediumFontSize`}>All-time low</h6>
        <h6 className={`mediumFontSize`}>{formatNumber(mktData.atl?.usd)}</h6>
      </div>
      <div className={`${styles.tradeWrapper}`}>
        <h6 className={`mediumFontSize`}>{safeDate(mktData.atl_date?.usd)}</h6>
        <h6
          className={`mediumFontSize ${
            (mktData.atl_change_percentage?.usd || 0) >= 0 ? 'brandGreenColor' : 'brandRedColor'
          }`}
        >
          {formatPercent(mktData.atl_change_percentage?.usd)}
        </h6>
      </div>

      <h6 className="mediumFontSize mt-3 text-primary">See historical data</h6>

      <h6 className="mediumFontSize mt-3">Tag</h6>

      <div className={styles.tagsContainer}>
        <div className={`${styles.tagText} me-2`}>YZi Labs Portfolio</div>
        <div className={`${styles.tagText} me-2`}>Bitcoin Ecosystem</div>
        <div className={`${styles.tagText} me-2`}>Layer 1</div>
        <div className={`${styles.tagText} me-2`}>Show All</div>
      </div>

      <div className={`mt-3`}>Do you own this project?</div>
      <div className={`mt-2`}>
        <BsPencil />
        &nbsp; Update Token Info
      </div>
      <div className={`mt-2`}>
        <MdLockOpen />
        &nbsp; Submitted Token Unlock
      </div>
    </div>
  )
}
