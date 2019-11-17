import log from "salvo-lite/log";

class ZoomImg {
    constructor(theme, elem) {
        this._name = this.constructor.name;
        this._theme = theme;
        this._elem = elem;
    }

    onInit() {
        log.debug(this._name, "Initiated", this);
        const initZoom = () => {
            $(document).ready(function () {
                $('.image-zoom')
                    .wrap('<span style="display:inline-block"></span>')
                    .css('display', 'block')
                    .parent()
                    .zoom({
                        url: $(this).find('img').attr('data-zoom'),
                    });
            });
        }

        if (window.innerWidth > 1050) {
            initZoom();
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1050) {
                initZoom();
            }
        })

    }
}
/*
<!-- Carousal -->
<div class='slider-for' data-ZoomImg >
    {% for image in product.images %}
        <div>
            <img class='image-zoom' data-zoom="{{ image.src | img_url: '1920x', scale: 2 }}" id='main-img' src='{{image.src | img_url:"1920x"}}'>
            <a href='{{image.src | img_url:"1920x"}}'>
                <img class='zoom-icon' src='{{"zoom.png" | asset_img_url }}'>
            </a>
        </div>
    {% endfor %}
</div>
*/

export default ZoomImg
