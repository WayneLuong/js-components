import axios from 'axios'
import rivets from 'rivets'

class Instagram {
    constructor(theme, elem) {
        this.elem = elem
        this.options = Object.assign({
            token: false,
            dontInit: false,
            limit: 5
        }, JSON.parse(this.elem.dataset.options ? this.elem.dataset.options : '{}'))

        this.elem.removeAttribute('data-options')
        this.template = this.elem.querySelector('[data-template]')

        if (!this.options.dontInit) {
            this.init()
        }
    }

    getInstagramPosts() {
        return axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.options.token}&count=${this.options.limit}`)
    }

    onInit() {
    }

    rivetsBinders() {
        rivets.binders['background'] = (el, value) => {
            el.style.setProperty('background-image', `url('${value}')`)
        }
    }

    async init() {
        this.rivetsBinders()
        let instaResponse = await this.getInstagramPosts()
        console.log(instaResponse.data.data)
        rivets.bind(this.template, { posts: instaResponse.data.data })
    }
}

export default Instagram