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
        /* Removed 'absolute' and 'top-5' so it doesn't fight with your App.jsx layout */
        
        <div className="flex flex-col">
            {/* Dynamic Time */}
            <p className="font-outfit font-semibold text-xl tracking-wide tabular-nums">
                {time || "00:00:00 AM"} 
            </p>
            
            {/* FIX: Changed text-white/60 to opacity-60. 
               This ensures it stays the same color as the main text (Black or White) 
               but just slightly faded.
            */}
            <p className="font-sn text-[11px] opacity-60 uppercase tracking-widest mt-1">
                {t("time")}
            </p>
        </div>
    )
}

export default Time