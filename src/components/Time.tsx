import React, { useEffect, useState } from 'react'
import { useLanguage } from './LanguageContext'

function Time() {
    const [time, setTime] = useState("")
    const { t } = useLanguage();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            })
            setTime(formatter.format(now))
        }

        updateTime()
        const timer = setInterval(updateTime, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex flex-col items-start text-left">
            <p className="font-outfit font-semibold text-base sm:text-xl tracking-wide tabular-nums text-[color:var(--color-text-primary)] leading-tight">
                {time || "00:00:00 AM"} 
            </p>

            <p className="font-sn text-[8px] sm:text-[11px] opacity-60 uppercase tracking-tight sm:tracking-widest mt-0.5 whitespace-nowrap">
                GMT + 5:30 • Mumbai, India
            </p>
        </div>
    )
}

export default Time