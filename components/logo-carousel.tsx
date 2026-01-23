"use client"

import Image from "next/image"

const logos = [
    { src: "https://vanishsafeguard.com/game_logo/fortnite.svg", alt: "Fortnite" },
    { src: "https://vanishsafeguard.com/game_logo/apex.svg", alt: "Apex Legends" },
    { src: "https://vanishsafeguard.com/game_logo/bf6.svg", alt: "Battlefield 6" },
    { src: "https://vanishsafeguard.com/game_logo/eft.png", alt: "Escape From Tarkov" },
    { src: "https://vanishsafeguard.com/game_logo/minecraft.png", alt: "Minecraft" },
    { src: "https://vanishsafeguard.com/game_logo/r6s.png", alt: "Rainbow Six Siege" },
]

export function LogoCarousel() {
    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll-left">
                {logos.map((logo, index) => (
                    <li key={index}>
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={150}
                            height={50}
                            className="h-12 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            unoptimized
                        />
                    </li>
                ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll-left" aria-hidden="true">
                {logos.map((logo, index) => (
                    <li key={index}>
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={150}
                            height={50}
                            className="h-12 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            unoptimized
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
