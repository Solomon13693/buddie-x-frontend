"use client"

import { useEffect, useState } from "react"
import { Button } from "@heroui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { cn } from "../lib"

type DaySpecifier = number | string

type AvailableDate = {
    date: Date
    available: boolean
}

type Frequency = "one-time" | "weekly" | "fortnightly" | "monthly"

interface DateSelectorProps {
    initialDate?: Date | null
    availableDates?: AvailableDate[]
    onDateSelect?: (date: Date, sessionsCount: number) => void
    disablePastDates?: boolean
    disabledDays?: DaySpecifier[]
    frequency?: Frequency
    sessionsCount?: number
    isOutOfOffice?: boolean
}

const dayMap: { [key: string]: number } = {
    sun: 0,
    sunday: 0,
    mon: 1,
    monday: 1,
    tue: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function DateSelector({
    initialDate = null,
    availableDates = [],
    onDateSelect,
    disablePastDates = false,
    disabledDays = [],
    frequency = "one-time",
    sessionsCount = 1,
    isOutOfOffice = false,
}: DateSelectorProps) {
    const [currentDate, setCurrentDate] = useState(new Date()) // Always show current month by default
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    useEffect(() => {
        // Only update currentDate if initialDate is provided and not null
        if (initialDate) {
            setCurrentDate(new Date(initialDate))
        }
        setSelectedDate(initialDate || null)
    }, [initialDate])

    const isDisabled = (date: Date) => {
        // If mentor is out of office, disable all dates
        if (isOutOfOffice) {
            return true
        }

        const isPastDate = disablePastDates && date < today
        const dayNumber = date.getDay()
        const isDisabledDay = disabledDays.some((day) => {
            if (typeof day === "number") {
                return day === dayNumber
            } else {
                const lowercaseDay = day.toLowerCase()
                return dayMap[lowercaseDay] === dayNumber
            }
        })

        if (availableDates && availableDates.length > 0) {
            const availableDate = availableDates.find(
                (available) => new Date(available.date).toDateString() === date.toDateString(),
            )

            if (!availableDate || !availableDate.available) {
                return true
            }
        }

        return isPastDate || isDisabledDay
    }

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()

        const days: (Date | null)[] = []

        for (let i = 0; i < startingDay; i++) {
            days.push(null)
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i))
        }

        return days
    }

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth() - 1)
        setCurrentDate(newDate)
    }

    const handleNextMonth = () => {
        const newDate = new Date(currentDate)
        newDate.setMonth(newDate.getMonth() + 1)
        setCurrentDate(newDate)
    }

    const handleDateClick = (date: Date) => {
        if (date && !isDisabled(date)) {
            setSelectedDate(date)
            const sessionDates = getSessionDates(date)
            onDateSelect?.(date, sessionDates.length)
        }
    }

    const getSessionDates = (date: Date) => {
        if (!date || frequency === "one-time") return [date]

        const dates: Date[] = [new Date(date)]

        for (let i = 1; i < sessionsCount; i++) {
            const nextDate = new Date(dates[dates.length - 1])

            if (frequency === "weekly") {
                nextDate.setDate(nextDate.getDate() + 7)
            } else if (frequency === "fortnightly") {
                nextDate.setDate(nextDate.getDate() + 14)
            } else if (frequency === "monthly") {
                nextDate.setMonth(nextDate.getMonth() + 1)
                // Adjust for same day of week if needed (for monthly)
                const targetDay = date.getDay()
                while (nextDate.getDay() !== targetDay) {
                    nextDate.setDate(nextDate.getDate() + 1)
                }
            }

            dates.push(nextDate)
        }

        return dates
    }

    const days = getDaysInMonth(currentDate)
    const sessionDates = selectedDate ? getSessionDates(selectedDate) : []

    return (
        <div className="w-full">
            <div className="mb-6 grid grid-cols-3 items-center">
                <div className="justify-self-start">
                    <Button
                        variant="light"
                        isIconOnly
                        radius="full"
                        onPress={handlePrevMonth}
                        size="sm"
                        className="text-[#B5BEC6]">
                        <ChevronLeftIcon className="size-3.5" />
                    </Button>
                </div>

                <div className="text-center text-[12px] text-[#4A5660]">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>

                <div className="justify-self-end">
                    <Button
                        variant="light"
                        isIconOnly
                        radius="full"
                        size="sm"
                        onPress={handleNextMonth}
                        className="text-[#B5BEC6]">
                        <ChevronRightIcon className="size-3.5" />
                    </Button>
                </div>
            </div>

            <div className="grid w-full grid-cols-7 gap-y-3">
                {weekDays.map((day) => (
                    <div key={day} className="pb-3 text-center text-[11px] uppercase 
                    tracking-wider text-[#B5BEC6] border-b border-[#EDF1F5]">
                        {day}
                    </div>
                ))}

                {days.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} className="p-2" />
                    }

                    const isToday = date.toDateString() === today.toDateString()
                    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
                    const isRecurringSession = selectedDate && sessionDates.some(
                        (sessionDate) => sessionDate.toDateString() === date.toDateString() && !isSelected,
                    )
                    const disabled = isDisabled(date)

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => handleDateClick(date)}
                            disabled={disabled}
                            className={cn(
                                "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs leading-none text-[#222730]",
                                "transition-colors",
                                {
                                    "bg-[#A5B3BF] text-white": isSelected || isRecurringSession,
                                    "text-[#A5B3BF]": disabled || (isToday && !isSelected && !isRecurringSession && !disabled),
                                    "cursor-not-allowed opacity-50": disabled,
                                    "hover:bg-[#EDF2F7]": !disabled && !isSelected && !isRecurringSession,
                                },
                            )}
                        >
                            {date.getDate()}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}