import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ProductDto } from '../../vite-env'
import './ProductPage.css'

export function ProductPage() {
  const [products, setProducts] = useState<ProductDto[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0')
  const [quantity, setQuantity] = useState('0')
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const refresh = useCallback(async () => {
    setLoadError(null)
    const res = await window.electronAPI.product.list()
    if (!res.ok) {
      setLoadError('목록을 불러오지 못했습니다.')
      return
    }
    setProducts(res.products)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setPending(true)
    try {
      const res = await window.electronAPI.product.create({
        name,
        price: Number(price),
        quantity: Number(quantity),
      })
      if (!res.ok) {
        setFormError('등록에 실패했습니다. 입력값을 확인하세요.')
        return
      }
      setName('')
      setPrice('0')
      setQuantity('0')
      await refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="product-page">
      <header className="product-header">
        <Link to="/home" className="product-back">
          ← 홈
        </Link>
        <h1>상품</h1>
      </header>
      <main className="product-main">
        <section className="product-form-section">
          <h2>상품 등록</h2>
          <form className="product-form" onSubmit={handleCreate}>
            <label>
              <span>이름</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <span>가격</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <label>
              <span>수량</span>
              <input
                type="number"
                min={0}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>
            {formError && <p className="product-error">{formError}</p>}
            <button type="submit" disabled={pending}>
              {pending ? '저장 중…' : '등록'}
            </button>
          </form>
        </section>

        <section className="product-list-section">
          <h2>목록</h2>
          {loadError && <p className="product-error">{loadError}</p>}
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
        </section>
      </main>
    </div>
  )
}
