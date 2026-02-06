"use client"

import React, { useEffect, useState, useMemo } from "react"
import { Tooltip as ReactTooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import { useLanguage } from "./LanguageContext"

interface ContributionDay {
  date: string
  count: number
  level: number
}

const getLevelFromCount = (count: number) => {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

export const GitHubActivity = () => {
  const { t } = useLanguage();
  const username = "ggoswami777"
  const [data, setData] = useState<{
    total: number
    contributions: ContributionDay[]
  } | null>(null)

  // Dynamically calculate month labels based on current date
  const dynamicMonths = useMemo(() => {
    const months = [];
    const date = new Date();
    // Start 11 months ago
    date.setMonth(date.getMonth() - 11);
    for (let i = 0; i < 13; i++) {
      months.push(date.toLocaleString('default', { month: 'short' }));
      date.setMonth(date.getMonth() + 1);
    }
    return months;
  }, []);

  useEffect(() => {
    fetch(`https://github-contributions-api.deno.dev/${username}.json`)
      .then(res => res.json())
      .then(res => {
        const allDays: ContributionDay[] = res.contributions
          .flat()
          .map((day: any) => {
            const count = day.contributionCount ?? day.count ?? 0
            return {
              date: day.date,
              count,
              level: getLevelFromCount(count),
            }
          })
        // Always take the most recent 371 days (53 weeks)
        const lastYearData = allDays.slice(-371) 
        setData({ total: res.totalContributions, contributions: lastYearData })
      })
      .catch(err => console.error("GitHub fetch error:", err))
  }, [])

  if (!data) return null;

  return (
    <div className="w-full max-w-[850px] mx-auto py-12 px-4 select-none font-outfit">
      <style jsx global>{`
        :root {
          --gh-l0: #ebedf0; --gh-l1: #9be9a8; --gh-l2: #40c463; --gh-l3: #30a14e; --gh-l4: #216e39;
          --gh-text: #666;
        }
        .dark {
          --gh-l0: #161b22; --gh-l1: #30363d; --gh-l2: #6e7681; --gh-l3: #afb8c1; --gh-l4: #ffffff;
          --gh-text: #888;
        }

        @keyframes star-shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .rect-stellar {
          transition: transform 0.2s ease;
          transform-origin: center;
          transform-box: fill-box;
        }

        .rect-stellar:hover {
          transform: scale(1.3);
          stroke: var(--color-text-primary);
          stroke-width: 0.5px;
        }
      `}</style>

      <h2 className="text-2xl font-bold mb-8 tracking-tight text-[var(--color-text-primary)]">
        GitHub {t("activity")}
      </h2>

      <div className="relative">
        <svg width="800" height="110" className="overflow-visible">
          {/* Dynamic Month Labels */}
          <g className="text-[10px] fill-[var(--gh-text)] font-medium">
            {dynamicMonths.map((m, i) => (
              <text key={i} x={15 + i * 62} y="-10">{m}</text>
            ))}
          </g>

          {/* Day Labels */}
          <g className="text-[9px] fill-[var(--gh-text)] font-medium">
            <text x="-25" y="28">Mon</text>
            <text x="-25" y="56">Wed</text>
            <text x="-25" y="84">Fri</text>
          </g>

          <g>
            {Array.from({ length: 53 }).map((_, col) => (
              <g key={col}>
                {data.contributions.slice(col * 7, col * 7 + 7).map((day, row) => (
                  <rect
                    key={day.date}
                    x={col * 14}
                    y={row * 14}
                    width="11"
                    height="11"
                    rx="2"
                    fill={`var(--gh-l${day.level})`}
                    data-tooltip-id="gh-tooltip"
                    data-tooltip-content={`${day.count} contributions`}
                    className="rect-stellar cursor-pointer"
                    style={{
                        animation: day.level > 3 ? `star-shimmer 4s infinite ease-in-out` : 'none'
                    }}
                  />
                ))}
              </g>
            ))}
          </g>
        </svg>

        <div className="mt-6 flex justify-between items-center text-[13px] text-[var(--gh-text)]">
          <div>
            {data.total.toLocaleString()} {t("contribution")}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px]">Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(l => (
                <div 
                   key={l} 
                   className="w-[11px] h-[11px] rounded-[2px]" 
                   style={{ backgroundColor: `var(--gh-l${l})` }} 
                />
              ))}
            </div>
            <span className="text-[11px]">More</span>
          </div>
        </div>
      </div>

      <ReactTooltip
        id="gh-tooltip"
        offset={10}
        className="!bg-black !text-white !text-[12px] !font-medium !px-3 !py-1.5 !rounded-md !opacity-100 !border-none !shadow-none"
      />
    </div>
  )
}