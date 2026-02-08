import React, { useEffect, useState } from 'react'
import { useLanguage } from './LanguageContext'

function Time() {
    const [time, setTime] = useState("")

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

    const { t } = useLanguage();

    return (
    
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="font-outfit font-semibold text-lg md:text-xl tracking-wide tabular-nums text-[color:var(--color-text-primary)]">
                {time || "00:00:00 AM"} 
            </p>

            <p className="font-sn text-[9px] md:text-[11px] opacity-60 uppercase tracking-widest mt-1">
                {t("time")}
            </p>
        </div>
    )
}

export default Time