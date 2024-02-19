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
            if (value > 2) {
                setValue(0)
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
            {/* <div className={`flex translate-x-[-${3}00%] transition-transform`}> */}
            <div className={`flex transition-transform`} style={{transform:`translateX(-${value}00%)`}}>
                {slides.map((img, index) => (
                    <img src={img} alt="logo" className="" key={index} />
                ))}
            </div>
        </div>
    )
}

export default Slider