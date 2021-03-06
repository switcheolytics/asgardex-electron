import React from 'react'

import { Story, Meta } from '@storybook/react'
import { assetAmount, AssetBNB, AssetRuneNative, assetToBase } from '@xchainjs/xchain-util'

import { AssetData } from './AssetData'

const amount = assetToBase(assetAmount(2.49274))
const price = assetToBase(assetAmount(217.92))

export const StoryAsset: Story = () => <AssetData asset={AssetBNB} network="testnet" />
StoryAsset.storyName = 'asset'

export const StoryAssetAmount: Story = () => <AssetData asset={AssetBNB} amount={amount} network="testnet" />
StoryAssetAmount.storyName = 'asset + amount'

export const StoryNoTicker: Story = () => <AssetData asset={AssetBNB} amount={amount} noTicker network="testnet" />
StoryNoTicker.storyName = 'amount, but no ticker'

export const StoryPrice: Story = () => (
  <AssetData asset={AssetBNB} amount={amount} price={price} priceAsset={AssetRuneNative} network="testnet" />
)
StoryPrice.storyName = 'price + amount'

export const StoryPriceNoTicker: Story = () => (
  <AssetData asset={AssetBNB} amount={amount} price={price} priceAsset={AssetRuneNative} noTicker network="testnet" />
)
StoryPriceNoTicker.storyName = 'price + amount, but no ticker'

export const StoryPriceOnly: Story = () => (
  <AssetData asset={AssetBNB} price={price} priceAsset={AssetRuneNative} noTicker network="testnet" />
)
StoryPriceOnly.storyName = 'price - only'

export const StoryBig: Story = () => (
  <AssetData asset={AssetBNB} amount={amount} price={price} priceAsset={AssetRuneNative} size="big" network="testnet" />
)
StoryBig.storyName = 'big'

const meta: Meta = {
  component: AssetData,
  title: 'Components/AssetData',
  decorators: [
    (S: Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px'
        }}>
        <S />
      </div>
    )
  ]
}

export default meta
