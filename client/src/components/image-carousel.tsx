'use client'

import * as React from "react"
import Image from "next/image"
import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageCarouselProps {
    images: string[]
    initialSlide?: number
}

export function ImageCarousel({ images, initialSlide = 0 }: ImageCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (api) {
            api.scrollTo(initialSlide)
        }
    }, [api, initialSlide])

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={image}
                                        alt={`${index + 1}`}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <div className="py-2 text-center text-sm text-muted-foreground">
                Image {current} of {images.length}
            </div>
            <div className="flex justify-center space-x-2 py-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                            index === current - 1 ? "bg-primary" : "bg-muted"
                        }`}
                        onClick={() => api?.scrollTo(index)}
                    />
                ))}
            </div>
        </Carousel>
    )
}