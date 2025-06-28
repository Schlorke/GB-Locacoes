"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ImageCarouselZoomProps {
  images: string[]
  altText: string
  className?: string
}

export function ImageCarouselZoom({ images, altText, className }: ImageCarouselZoomProps) {

  const mainImageSrc =
    images && images.length > 0 ? images[0] : "/placeholder.svg?height=600&width=800&text=Imagem+Indisponível"

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center",
          className,
        )}
      >
        <Image
          src="/placeholder.svg?height=600&width=800&text=Sem+Imagem"
          alt="Imagem indisponível"
          fill
          className="object-contain"
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full">
            <Image src={mainImageSrc || "/placeholder.svg"} alt={altText} fill className="object-cover" priority />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
