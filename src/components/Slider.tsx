import { useEffect, useState } from "react"
import logoOne from "../assets/svg1.png"
import logoTwo from "../assets/svg2.png"
import logoThree from "../assets/svg3.png"
import logoFour from "../assets/svg4.png"

const slides = [logoOne, logoTwo, logoThree, logoFour]


const Slider = () => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            if (value > 3) {
                setValue(1)
            } else {
                setValue(value + 1)
            }
        }, 2000)

        return () => {
            clearInterval(timer)
        }
    }, [value])

    return (
        <div className="overflow-hidden relative">
            <div className={`flex translate-x-[-${value}00%] transition-transform`}>
                {slides.map((img, index) => (
                    <img src={img} alt="logo" className="" key={index} />
                ))}
            </div>
        </div>
    )
}

export default Slider