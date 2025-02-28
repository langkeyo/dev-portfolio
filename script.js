// 滚动动画触发器
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active')
        }
    })
}, { threshold: 0.1 })

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card)
})

// 移动端菜单切换
const navToggle = document.createElement('div')
navToggle.className = 'mobile-menu'
navToggle.innerHTML = '三'
document.querySelector('nav').appendChild(navToggle)

navToggle.addEventListener('click', () => {
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
        <div class='lightbox-content'>
        <img src='${img.src}' alt='${img.alt}' />
        <span class='close'>&times;</span>
        </div>
        `
        document.body.appendChild(lightbox)

        lightbox.querySelector('.close').addEventListener('click', () => {
            lightbox.remove()
        })
    })
})

// 性能优化
// 图片懒加载 这种方式对应旧版本的浏览器可能不适用
// document.querySelectorAll('img').forEach(img => {
//     img.loading = 'lazy'
// })

// 使用IntersectionObserver实现懒加载
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            lazyLoadObserver.unobserve(img)
        }
    })
}, {
    // 配置项作为第二个参数
    rootMargin: '200px',
    threshold: 0.1
})

document.querySelectorAll('img').forEach(img => {
    lazyLoadObserver.observe(img)
})

// 技能雷达图
const ctx = document.getElementById('skillsRadarChart').getContext('2d')
const skillsRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        datasets: [{
            data: [85, 85, 85, 85, 85, 80],
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 1
        }],
        labels: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Vue3', 'React']
    },
    options: {
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false,
                    stepSize: 20 // 添加刻度间隔
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '技能熟练度'
            }
        }
    }
})

// 防止 XSS 攻击
// 对用户输入内容进行转义
const sanitizeInput = (text) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

// 提交表单时使用
// const message = sanitizeInput(document.getElementById('message').value)

// 处理联系方式表单提交
// 添加表单验证与防重复提交
let isSumbitting = false
const contactForm = document.getElementById('contactForm')
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (isSumbitting) { return }

    isSumbitting = true
    const name = sanitizeInput(document.getElementById('name').value)
    const email = sanitizeInput(document.getElementById('email').value)
    const message = sanitizeInput(document.getElementById('message').value)
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    submitBtn.display = true

    try {
        // 模拟异步提交
        await new Promise(resolve => setTimeout(() => {
            resolve(console.log(`姓名：${name}, 邮箱：${email}, 留言：${message}`))
            alert('感谢你的留言，我会尽快回复你！')
            contactForm.reset()
        }, 1000))
    } catch (error) {
        alert('提交失败，请稍后重试！')
    } finally {
        isSumbitting = false
        submitBtn.display = false
    }
})

// 暗色模式切换
// 暗色模式持久化
const darkModeToggle = document.getElementById('darkModeToggle')
const body = document.body

// 保存用户主题偏好
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
    const isDarkMode = body.classList.contains('dark-mode')
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    darkModeToggle.textContent = isDarkMode ? '🌞' : '🌙'
})

// 初始化时读取
const savedTheme = localStorage.getItem('theme') || 'light'
if (savedTheme === 'dark') {
    body.classList.add('dark-mode')
    darkModeToggle.textContent = '🌞'
}



