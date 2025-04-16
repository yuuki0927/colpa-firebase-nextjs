'use client'

import CheckoutButton from './CheckoutButton'

const plans = [
  {
    id: 'price_1RDNwPGgbvYp6VwfFMfaf2so',
    name: 'Lite',
    price: '¥9,000 / 月',
    features: ['1件の案件登録', '新規案件自動作成', '編集自動更新', '案件の事前構築テンプレート', '無制限のメッセージ'],
    description: 'まずはお試しで始めたい方向け',
  },
  {
    id: 'price_1RDNwkGgbvYp6VwfxzmHGQrL',
    name: 'Premium',
    price: '¥15,000 / 月',
    features: ['2件の案件登録', '新規案件自動作成', '編集自動更新', '案件の事前構築テンプレート', '無制限のメッセージ', '運営サイドとメッセージ'],
    description: 'しっかり運用したい中小企業向け',
  },
  {
    id: 'price_1RDNx2GgbvYp6VwfhN71TqPr',
    name: 'Business',
    price: '¥30,000 / 月 ～',
    features: ['5件以上の案件登録', '新規案件自動作成', '編集自動更新', '案件の事前構築テンプレート', '無制限のメッセージ', '運営サイドとメッセージ'],
    description: '本格的に代理店を集めたい企業様向け',
  },
]

export default function PricingPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="border rounded-lg shadow-sm p-6 bg-white text-black flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <p className="text-gray-600 mb-2">{plan.description}</p>
            <p className="text-lg font-semibold mb-4">{plan.price}</p>
            <ul className="text-sm text-gray-700 mb-4 space-y-1">
              {plan.features.map((feature, i) => (
                <li key={i}>・{feature}</li>
              ))}
            </ul>
          </div>
          <CheckoutButton planId={plan.id} />
        </div>
      ))}
    </div>
  )
}
