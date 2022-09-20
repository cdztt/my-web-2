import { createApp, ref, watch } from "vue"
import Message from '../../components/Message.vue'
import useState from "../../composables/useState.js"

export default function messagePlugin(app, options) {
    const initialOptions = {
        type: options?.type ?? 'info',
        title: options?.title ?? '',
        content: options?.content ?? '',
        duration: options?.duration ?? 1500,
        offset: options?.offset ?? 10
    }

    const [type, setType] = useState(initialOptions.type)
    const [title, setTitle] = useState(initialOptions.title)
    const [content, setContent] = useState(initialOptions.content)
    const [duration, setDuration] = useState(initialOptions.duration)
    const [offset, setOffset] = useState(initialOptions.offset)
    const [state, setState] = useState(false)

    const showed = ref(false)

    /* 监听state的变化 */
    watch(state, (n, o, onCleanup) => {
        showed.value = true

        const timer = setTimeout(() => {
            showed.value = false
        }, duration.value)

        onCleanup(() => {
            clearTimeout(timer)
        })
    })

    const messageShow = ({
        type,
        title,
        content,
        duration,
        offset,
    } = {}) => {
        if (type !== undefined && type !== initialOptions.type) {
            setType(type)
        }
        if (title !== undefined && title !== initialOptions.title) {
            setTitle(title)
        }
        if (content !== undefined && content !== initialOptions.content) {
            setContent(content)
        }
        if (duration !== undefined && duration !== initialOptions.duration) {
            setDuration(duration)
        }
        if (offset !== undefined && offset !== initialOptions.offset) {
            setOffset(offset)
        }

        setState()
    }

    /* message专门的实例 */
    const messageApp = createApp(Message)
    const div = document.createElement('div')
    document.body.appendChild(div)

    /* 主app提供共享的ref */
    app.provide('message-type', {
        type,
        setType
    })
    app.provide('message-title', {
        title,
        setTitle
    })
    app.provide('message-content', {
        content,
        setContent
    })
    app.provide('message-duration', {
        duration,
        setDuration
    })
    app.provide('message-offset', {
        offset,
        setOffset
    })
    app.provide('message-show', {
        showed,
        messageShow
    })

    /* message提供共享的ref */
    messageApp.provide('message-type', {
        type,
        setType
    })
    messageApp.provide('message-title', {
        title,
        setTitle
    })
    messageApp.provide('message-content', {
        content,
        setContent
    })
    messageApp.provide('message-duration', {
        duration,
        setDuration
    })
    messageApp.provide('message-offset', {
        offset,
        setOffset
    })
    messageApp.provide('message-show', {
        showed,
        messageShow
    })
    /* 挂载message */
    messageApp.mount(div)
}