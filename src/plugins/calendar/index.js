import useState from "../../composables/useState"

export default function calendarPlugin(app, options) {
    const [dayVisible, setDayVisible] = useState(false)
    const [timeVisible, setTimeVisible] = useState(false)

    app.provide('calendar-day-visible', {
        dayVisible,
        setDayVisible
    })
    app.provide('calendar-time-visible', {
        timeVisible,
        setTimeVisible
    })

    const handleClick = () => {
        if (timeVisible.value) {
            setTimeVisible(false)
        }
        else if (dayVisible.value) {
            setDayVisible(false)
        }
    }
    /* 点击其他地方，取消显示 */
    document.body.addEventListener('click', handleClick)
}