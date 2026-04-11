import { useCallback, useEffect, useState } from 'react'
import { StandardButton } from '../../common/buttons'
import { LabelField } from '../../common/fields'
import { StandardForm } from '../../common/forms'
import { useLayoutTitle } from '../../common/layouts'
import { NumberInput, TextInput } from '../../common/inputs'
import { PageSection } from '../../common/sections'
import { useAppModal } from '../../errors/AppModalContext'
import { useGlobalLoading } from '../../loading/GlobalLoadingContext'
import type { ProductDto } from '../../vite-env'
import './ProductPage.css'

export function ProductPage() {
  const { setPageTitle } = useLayoutTitle()
  const { showError, showValidationWarning, dismissModal } = useAppModal()
  const { runWithLoading, isLoading } = useGlobalLoading()
  const [products, setProducts] = useState<ProductDto[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0')
  const [quantity, setQuantity] = useState('0')

  useEffect(() => {
    setPageTitle('상품')
    return () => setPageTitle('')
  }, [setPageTitle])

  const loadProducts = useCallback(async () => {
    const res = await window.electronAPI.product.list()
    if (!res.ok) {
      showError(res.code)
      return
    }
    setProducts(res.products)
  }, [showError])

  const refresh = useCallback(async () => {
    dismissModal()
    await runWithLoading(loadProducts)
  }, [dismissModal, loadProducts, runWithLoading])

  useEffect(() => {
    void refresh()
  }, [refresh])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    dismissModal()

    const trimmedName = name.trim()
    if (!trimmedName) {
      showValidationWarning('상품 이름을 입력해 주세요.')
      return
    }

    const priceNum = Number(price)
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      showValidationWarning('가격을 0 이상의 숫자로 입력해 주세요.')
      return
    }

    const qtyRaw = Number(quantity)
    if (!Number.isFinite(qtyRaw) || qtyRaw < 0 || !Number.isInteger(qtyRaw)) {
      showValidationWarning('수량을 0 이상의 정수로 입력해 주세요.')
      return
    }

    await runWithLoading(async () => {
      const res = await window.electronAPI.product.create({
        name: trimmedName,
        price: priceNum,
        quantity: qtyRaw,
      })
      if (!res.ok) {
        showError(res.code)
        return
      }
      setName('')
      setPrice('0')
      setQuantity('0')
      await loadProducts()
    })
  }

  return (
    <div className="product-page">
      <main className="product-main">
        <PageSection title="상품 등록">
          <StandardForm layout="grid" noValidate onSubmit={handleCreate}>
            <LabelField labelName="이름" required>
              <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            </LabelField>
            <LabelField labelName="가격" required>
              <NumberInput
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </LabelField>
            <LabelField labelName="수량" required>
              <NumberInput
                min={0}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </LabelField>
            <StandardButton type="submit" disabled={isLoading}>
              등록
            </StandardButton>
          </StandardForm>
        </PageSection>

        <PageSection title="목록">
          <div className="product-table-wrap">
            <table className="product-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>등록일시</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="product-empty">
                      등록된 상품이 없습니다.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.price.toLocaleString()}</td>
                      <td>{p.quantity}</td>
                      <td>{p.registeredAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </PageSection>
      </main>
    </div>
  )
}
