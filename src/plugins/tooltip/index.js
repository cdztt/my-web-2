import { createApp } from 'vue'
import Tooltip from '../../components/Tooltip.vue'
import useState from "../../composables/useState.js"

export default function tooltipPlugin(app, options) {
    const initialState = {
        content: '待设置',
        placement: 'top'
    }

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [targetWidth, setTargetWidth] = useState(0)
    const [targetHeight, setTargetHeight] = useState(0)
    const [placement, setPlacement] = useState(initialState.placement)
    const [content, setContent] = useState(initialState.content)
    const [showed,setShowed] = useState(false)

    const tooltipApp = createApp(Tooltip)

    tooltipApp.provide('tooltip-x', {
        x,
        setX
    })
    tooltipApp.provide('tooltip-y', {
        y,
        setY
    })
    tooltipApp.provide('tooltip-targetwidth', {
        targetWidth,
        setTargetWidth
    })
    tooltipApp.provide('tooltip-targetheight', {
        targetHeight,
        setTargetHeight
    })
    tooltipApp.provide('tooltip-placement', {
        placement,
        setPlacement
    })
    tooltipApp.provide('tooltip-content', {
        content,
        setContent
    })
    tooltipApp.provide('tooltip-showed', {
        showed,
        setShowed
    })

    const tooltip = {
        config({ content = initialState.content, placement = initialState.placement } = {}) {
            setContent(content)
            setPlacement(placement)
            return this
        },
        popup(e) {
            const getOffset = (element, type) => {
                let offset = 0
                if (element.offsetParent?.tagName.toLowerCase() !== 'body') {
                    offset += getOffset(element.offsetParent, type)// 递归调用
                }
                if (type === 'top') {
                    offset += element.offsetTop
                }
                else if (type === 'left') {
                    offset += element.offsetLeft
                }
                return offset
            }

            setX(getOffset(e.target, 'left'))
            setY(getOffset(e.target, 'top'))

            setTargetWidth(e.target.offsetWidth)
            setTargetHeight(e.target.offsetHeight)

            setShowed(true)

            e.target.addEventListener('mouseout', function handler(e) {
                setShowed(false)
                e.target.removeEventListener('mouseout', handler)// 防止内存泄漏
            })
        }
    }

    app.provide('tooltip', tooltip)

    const div = document.createElement('div')
    document.body.appendChild(div)
    tooltipApp.mount(div)
}