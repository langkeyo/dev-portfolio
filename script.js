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

// 技能雷达图
const ctx = document.getElementById('skillsRadarChart').getContext('2d')
const skillsRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['HTML', 'CSS', 'JavaScript', 'Vue3', 'Python', 'React'],
        datasets: [{
            labels: '技能熟练度',
            data: [90, 80, 85, 80, 65, 70],
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            broderColor: 'rgba(46, 204, 113, 1)',
            broderWidth: 1
        }]
    },
    options: {
        scale: {
            ticks: {
                beginAtZero: true
            }
        }
    }
})

// 处理联系方式表单提交
const contactForm = document.getElementById('contactForm')
contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value

    // 这里可以添加发送邮件或者保存数据的逻辑
    console.log(`姓名：${name}, 邮箱：${email}, 留言：${message}`)
    alert('感谢你的留言，我会尽快回复你！')
    contactForm.reset()
})

// 暗色模式切换
const darkModelToggle = document.getElementById('darkModelToggle')
const body = document.body

darkModelToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
    ibody.classList.contains('dark-mode') ? darkModelToggle.textContent = '🌞' : darkModelToggle.textContent = '🌙'
})