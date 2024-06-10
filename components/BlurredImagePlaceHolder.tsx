import Image from "next/image"

interface Props {
    src: string
    alt: string
    tailwindCss: string
}

const BlurredImagePlaceHolder = ({ src, alt, tailwindCss }: Props) => {

    const imageBlur = async () => {
        const blur = await fetch(src)
            .then(async (res) => {
                return Buffer.from(await res.arrayBuffer()).toString("base64");
            });

        return blur;
    }


    return (
        <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            className={tailwindCss}
            placeholder="blur"
            blurDataURL={`data:image/png;base64,${imageBlur()}`}
            priority={true}
        />
    )
}

export default BlurredImagePlaceHolder