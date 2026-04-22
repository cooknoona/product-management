import { useCallback, useEffect, useState } from 'react'
import { ConfirmButton } from '../../common/buttons'
import { LabelField } from '../../common/fields'
import { StandardForm } from '../../common/forms'
import { useLayoutTitle } from '../../common/layouts'
import { NumberInput, TextInput } from '../../common/inputs'
import { PageSection } from '../../common/sections'
import { useAppModal } from '../../errors/AppModalContext'
import { useLocalisation } from '../../localisation'
import { useGlobalLoading } from '../../loading/GlobalLoadingContext'
import type { ProductDto } from '../../vite-env'
import './ProductPage.css'

export function ProductPage() {
  const { setPageTitle } = useLayoutTitle()
  const { t, numberLocale } = useLocalisation()
  const { showError, showValidationWarning, dismissModal } = useAppModal()
  const { runWithLoading, isLoading } = useGlobalLoading()
  const [products, setProducts] = useState<ProductDto[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0')
  const [quantity, setQuantity] = useState('0')

  useEffect(() => {
    setPageTitle(t('product.title'))
    return () => setPageTitle('')
  }, [setPageTitle, t])

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
      showValidationWarning(t('product.validationName'))
      return
    }

    const priceNum = Number(price)
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      showValidationWarning(t('product.validationPrice'))
      return
    }

    const qtyRaw = Number(quantity)
    if (!Number.isFinite(qtyRaw) || qtyRaw < 0 || !Number.isInteger(qtyRaw)) {
      showValidationWarning(t('product.validationQuantity'))
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
        <PageSection title={t('product.sectionCreate')}>
          <StandardForm layout="grid" noValidate onSubmit={handleCreate}>
            <LabelField labelName={t('product.name')} required>
              <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            </LabelField>
            <LabelField labelName={t('product.price')} required>
              <NumberInput
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </LabelField>
            <LabelField labelName={t('product.quantity')} required>
              <NumberInput
                min={0}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </LabelField>
            <ConfirmButton type="submit" disabled={isLoading}>
              {t('product.submit')}
            </ConfirmButton>
          </StandardForm>
        </PageSection>

        <PageSection title={t('product.sectionList')}>
          <div className="product-table-wrap">
            <table className="product-table">
              <thead>
                <tr>
                  <th>{t('product.tableName')}</th>
                  <th>{t('product.tablePrice')}</th>
                  <th>{t('product.tableQuantity')}</th>
                  <th>{t('product.tableRegisteredAt')}</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="product-empty">
                      {t('product.empty')}
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.price.toLocaleString(numberLocale)}</td>
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
