import React, { RefObject, useCallback, useMemo, useRef } from 'react'

import {
  formatBN,
  BaseAmount,
  Asset,
  baseToAsset,
  formatAssetAmountCurrency,
  baseAmount,
  formatBaseAsAssetAmount
} from '@xchainjs/xchain-util'
import { Col } from 'antd'
import BigNumber from 'bignumber.js'
import { useIntl } from 'react-intl'

import * as Styled from './PoolShare.style'
import { PoolShareCard } from './PoolShareCard'

type Props = {
  sourceAsset: Asset
  targetAsset: Asset
  runeDepositShare: BaseAmount
  runeDepositPrice: BaseAmount
  loading?: boolean
  priceAsset?: Asset
  assetDepositShare: BaseAmount
  assetDepositPrice: BaseAmount
  poolShare: BigNumber
  depositUnits: BaseAmount
  smallWidth?: boolean
}

export const PoolShare: React.FC<Props> = (props): JSX.Element => {
  const {
    sourceAsset,
    runeDepositShare,
    runeDepositPrice,
    loading,
    priceAsset,
    targetAsset,
    assetDepositShare,
    assetDepositPrice,
    poolShare,
    depositUnits,
    smallWidth
  } = props

  const intl = useIntl()

  const totalDepositPrice = useMemo(() => baseAmount(runeDepositPrice.amount().plus(assetDepositPrice.amount())), [
    assetDepositPrice,
    runeDepositPrice
  ])

  const ref: RefObject<HTMLDivElement> = useRef(null)

  const renderRedemptionCol = useCallback(
    (amount: BaseAmount, price: BaseAmount, asset: Asset) => (
      <Col span={smallWidth ? 24 : 12}>
        <Styled.LabelPrimary loading={loading}>
          {formatAssetAmountCurrency({ amount: baseToAsset(amount), asset, decimal: 2 })}
        </Styled.LabelPrimary>
        <Styled.LabelSecondary loading={loading}>
          {formatAssetAmountCurrency({ amount: baseToAsset(price), asset: priceAsset, decimal: 2 })}
        </Styled.LabelSecondary>
      </Col>
    ),
    [loading, priceAsset, smallWidth]
  )

  const renderRedemptionLarge = useMemo(
    () => (
      <>
        <Styled.RedemptionHeader>
          <Styled.CardRow>
            <Col span={12}>
              <Styled.RedemptionAsset>{sourceAsset.ticker}</Styled.RedemptionAsset>
            </Col>
            <Col span={12}>
              <Styled.RedemptionAsset>{targetAsset.ticker}</Styled.RedemptionAsset>
            </Col>
          </Styled.CardRow>
        </Styled.RedemptionHeader>
        <Styled.CardRow>
          {renderRedemptionCol(runeDepositShare, runeDepositPrice, sourceAsset)}
          {renderRedemptionCol(assetDepositShare, assetDepositPrice, targetAsset)}
        </Styled.CardRow>
      </>
    ),
    [
      assetDepositPrice,
      assetDepositShare,
      renderRedemptionCol,
      runeDepositPrice,
      runeDepositShare,
      sourceAsset,
      targetAsset
    ]
  )

  const renderRedemptionSmall = useMemo(
    () => (
      <>
        <Styled.RedemptionHeader>
          <Styled.CardRow>
            <Col span={24}>
              <Styled.RedemptionAsset>{sourceAsset.ticker}</Styled.RedemptionAsset>
            </Col>
          </Styled.CardRow>
        </Styled.RedemptionHeader>
        <Styled.CardRow>{renderRedemptionCol(runeDepositShare, runeDepositPrice, sourceAsset)}</Styled.CardRow>
        <Styled.RedemptionHeader>
          <Styled.CardRow>
            <Col span={24}>
              <Styled.RedemptionAsset>{targetAsset.ticker}</Styled.RedemptionAsset>
            </Col>
          </Styled.CardRow>
        </Styled.RedemptionHeader>
        <Styled.CardRow>{renderRedemptionCol(assetDepositShare, assetDepositPrice, targetAsset)}</Styled.CardRow>
      </>
    ),
    [
      assetDepositPrice,
      assetDepositShare,
      renderRedemptionCol,
      runeDepositPrice,
      runeDepositShare,
      sourceAsset,
      targetAsset
    ]
  )
  const renderRedemption = useMemo(() => (smallWidth ? renderRedemptionSmall : renderRedemptionLarge), [
    renderRedemptionLarge,
    renderRedemptionSmall,
    smallWidth
  ])

  return (
    <Styled.PoolShareWrapper ref={ref}>
      <PoolShareCard title={intl.formatMessage({ id: 'deposit.share.title' })}>
        <Styled.CardRow>
          <Col span={smallWidth ? 24 : 12} style={{ paddingBottom: smallWidth ? '20px' : '0' }}>
            <Styled.LabelSecondary textTransform="uppercase">
              {intl.formatMessage({ id: 'deposit.share.units' })}
            </Styled.LabelSecondary>
            <Styled.LabelPrimary loading={loading}>{`${formatBaseAsAssetAmount({
              amount: depositUnits,
              decimal: 2
            })}`}</Styled.LabelPrimary>
          </Col>
          <Col span={smallWidth ? 24 : 12}>
            <Styled.LabelSecondary textTransform="uppercase">
              {intl.formatMessage({ id: 'deposit.share.poolshare' })}
            </Styled.LabelSecondary>
            <Styled.LabelPrimary loading={loading}>{`${formatBN(poolShare)}%`}</Styled.LabelPrimary>
          </Col>
        </Styled.CardRow>
      </PoolShareCard>
      <PoolShareCard title={intl.formatMessage({ id: 'deposit.redemption.title' })}>
        {renderRedemption}
        <Styled.CardRow>
          <Col span={24}>
            <Styled.LabelSecondary textTransform="uppercase">
              {intl.formatMessage({ id: 'deposit.share.total' })}
            </Styled.LabelSecondary>
            <Styled.LabelPrimary loading={loading}>
              {formatAssetAmountCurrency({ amount: baseToAsset(totalDepositPrice), asset: priceAsset, decimal: 2 })}
            </Styled.LabelPrimary>
          </Col>
        </Styled.CardRow>
      </PoolShareCard>
    </Styled.PoolShareWrapper>
  )
}
