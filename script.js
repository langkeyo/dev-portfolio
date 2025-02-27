// 滚动动画触发器
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active')
        }
    })
},{threshold: 0.1})

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card)
})

// 移动端菜单切换
const navToggle = document.createElement('div')
navToggle.className = 'mobile-menu'
navToggle.innerHTML = '三'
document.querySelector('nav').appendChild(navToggle)

navToggle.addEventListener('click',() => {
    document.querySelector('.nav-links').classList.toggle('show')
})

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })
})

// 核心功能扩展
// Lightbox图片查看
document.querySelectorAll('.project-card img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div')
        lightbox.className = 'lightbox'
        lightbox.innerHTML = `
        <div class="lightbox-content">
        <img src="${img.src}" alt="${img.alt}" />
        <span class="close">&times;</span>
        </div>
        `
        document.body.appendChild(lightbox)

        lightbox.querySelector('.close').addEventListener('click', () => {
            lightbox.remove()
        })
    })
})

// 性能优化
// 图片懒加载
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy'
})