import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import { ProductPreviewType } from "types/global"
import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import Thumbnail from "../thumbnail"
import { getProductPrice } from "@lib/util/get-product-price"
import { retrievePricedProductById } from "@lib/data"
import ButtonProduct from "../button-product"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group bg-transparent"
    >
      <div data-testid="product-wrapper" className="bg-transparent">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="full"
          isFeatured={isFeatured}
          className="bg-transparent"
        />
        <div className="flex flex-col text-def-60 items-center mt-6">
          <div className="mb-3 text-4xl">{productPreview.title}</div>
          <div className="text-black text-2xl text-def-50">{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</div>
          <div>
          <ButtonProduct></ButtonProduct>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
