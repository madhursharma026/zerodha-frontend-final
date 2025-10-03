import HoldingsSection from '@/components/Homepage/HoldingsSection'
import styles from '@/components/Homepage/Home.module.css'
import MarginCard from '@/components/Homepage/MarginCard'
import MarketOverview from '@/components/Homepage/MarketOverview'
import Head from 'next/head'
import { Col } from 'react-bootstrap'
import { CiDroplet } from 'react-icons/ci'
import { IoPieChartOutline } from 'react-icons/io5'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | Exolane</title>
      </Head>
      <Col
        className={`px-4 py-3 h-100 rightSidebarScrollContainer ${styles.rightSidebarContainer}`}
      >
        <div className={styles.rightColumn}>
          {/* Greeting */}
          <p className="fs-4">Account Overview</p>
          <hr style={{ color: '#dad0d0' }} />

          {/* Equity & Commodity Section */}
          <div className="row">
            <MarginCard icon={IoPieChartOutline} title="Equity" />
            <MarginCard icon={CiDroplet} title="Commodity" />
          </div>

          <hr className="my-4" style={{ color: '#dad0d0' }} />

          {/* Holdings */}
          <HoldingsSection />

          <hr className="my-4" style={{ color: '#dad0d0' }} />

          {/* Market Overview */}
          <MarketOverview />

          <hr className="my-4" style={{ color: '#dad0d0' }} />
        </div>
      </Col>
    </>
  )
}
